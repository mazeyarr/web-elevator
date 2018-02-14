/**
 * @author Mazeyar Rezaei Ghavamabadi
 * @date 14-02-2018
 * @description This was an assignment to examine my web and coding knowledge, by building an elevator application
 */
$(document).ready(function (doc) {
    /**
     * These varibles are to initialize the elevator.
     *
     * @type {number}
     * @type {Object}
     */
    var elevator = {
        level:  1,
        moving: false,
        speed: 5000,
        delay: 3000,
        destanations: []
    };
    /**
     * Because there's a loop on in the view that makes elements,
     * the DOM wil not register the buttons and events, so I use the body
     * to see if an button has been pressed that was generated from a loop.
     *
     * @type {*|jQuery|HTMLElement}
     */
    var body = $('body');
    body.on('click', '.btn-call', function (btn) {
        handleCall(parseInt(btn.target.getAttribute('data-level')));
    });

    /**
     * This function will handle all button calls from each floor.
     * Because the the method is always the same.
     *
     * @param callLevel this is the number of the floor that has been called
     */
    function handleCall(callLevel) {
        if (callLevel !== elevator.level){

            /**
             * Updating the called floors by highlighting them
             *
             * @type {*|jQuery|HTMLElement}
             */
            var elavatorButtons = $('.elevatorButtons-' + callLevel);
            elavatorButtons.removeClass('btn-info');
            elavatorButtons.addClass('btn-success');

            if(elevator.destanations.indexOf(callLevel) === -1) {
                elevator.destanations.push(callLevel);

                /**
                 * If the elevator is going up the elevator will arrange the called floors in a ascending order
                 *
                 * If the elevator is coming from above the elevator will rearrange the array in a descending order, so that it
                 * honours the floors that are in between.
                 */
                if(elevator.level > callLevel){
                    elevator.destanations = elevator.destanations.sort(function (a, b) {  return b - a;  });
                }else{
                    elevator.destanations = elevator.destanations.sort(function (a, b) {  return a - b;  });
                }

                /**
                 * if the elevator is not moving then we initiate it.
                 */
                if (!elevator.moving){
                    elevator.moving = true;
                    setTimeout(function () {
                        moveElevator();
                    }, elevator.delay);
                }
            }else{
                swal('Be patient...', 'We will get there in a moment...','info');
            }
        }else{
            swal('Whoops', 'The elevator is already on this floor','warning');
        }
    }

    function moveElevator() {
        /**
         * Update the GUI
         */
        elevatorState('doors-close');
        elevatorState('moving');
        $('#level-' + elevator.level).removeClass('level-active');
        $('.elevator-buttons-' + elevator.level).hide('slow');

        /**
         * Simulate the elevator moving by using a timer
         */
        setTimeout(function () {
            /**
             * Update GUI
             */
            elevatorState('arrived');
            elevatorState('doors-open');

            elevator.level = elevator.destanations[0]; // Set the elevator level to the destination

            /**
             * Updating the called floors by highlighting them
             *
             * @type {*|jQuery|HTMLElement}
             */
            var elevatorButtons = $('.elevatorButtons-' + elevator.level);
            elevatorButtons.addClass('btn-info');
            elevatorButtons.removeClass('btn-success');

            /**
             * Update GUI
             */
            $('.elevator-buttons-' + elevator.level).show('slow');

            /**
             * Remove the destination floor from the array on arrival
             */
            elevator.destanations.splice(elevator.destanations.indexOf(elevator.level), 1);
            $('#level-' + elevator.level).addClass('level-active');

            /**
             * If there are other destinations the elevator needs to go to this function is called again.
             * else the elevator will put it self in an 'offline' state by calling the elevatorState methods
             */
            setTimeout(function () {
                if (typeof elevator.destanations[0] !== 'undefined') {
                    moveElevator();
                }else {
                    elevator.moving = false;
                    elevator.timerRunning = null;
                    elevatorState('offline');
                    elevatorState('doors-close');
                }
            }, elevator.delay);
        }, elevator.speed);
    }

    /**
     * This GUI function visually shows the state of the elevator.
     *
     * @param state This is String that will be checked by a switch case
     */
    function elevatorState(state) {
        /**
         * Because these selectors are going to be used often we initialize them once.
         * @type {*|jQuery|HTMLElement}
         */
        var m_offline = $('#lblNotActive'),
            m_moving = $('#lblMoving'),
            m_arrived = $('#lblArrived'),
            m_doorsOpen = $('#lblDoorsOpen'),
            m_doorsClose = $('#lblDoorsClose'),
            animationSpeed = 'slow'; // can also be an Integer
        switch (state){
            case 'offline':
                m_moving.hide(animationSpeed);
                m_arrived.hide(animationSpeed);
                m_offline.show(animationSpeed);
                break;
            case 'moving':
                m_offline.hide(animationSpeed);
                m_arrived.hide(animationSpeed);
                m_moving.show(animationSpeed);
                break;
            case 'arrived':
                m_offline.hide(animationSpeed);
                m_moving.hide(animationSpeed);
                m_arrived.show(animationSpeed);
                break;
            case 'doors-open':
                m_doorsClose.hide(animationSpeed);
                m_doorsOpen.show(animationSpeed);
                break;
            case 'doors-close':
                m_doorsOpen.hide(animationSpeed);
                m_doorsClose.show(animationSpeed);
                break;
        }
    }

});