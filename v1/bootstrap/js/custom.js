/**
 * @author Mazeyar Rezaei Ghavamabadi
 * @date 12-02-2018
 * @description This was an assignment to examine my web and coding knowledge, by building an elevator application
 */
$(document).ready(function (doc) {
    /**
     * These varibles are to initialize the elevator.
     *
     * @type {number}
     * @type {Object}
     */
    var elevatorLevel = 1,
        elevator = {
        moving: false,
        speed: 5000,
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
        /**
         * if the elevator is already on the destination floor there is no need to move the elevator.
         */
        if(callLevel === elevatorLevel) {
            swal('Whoops', 'The elevator is already on this floor','warning');
            return;
        }

        /**
         * This simulates the doors closing of the elevator
         * so that you can't press on the buttons inside the elevator, from outside the elevator
         *
         * @type {*|jQuery|HTMLElement}
         */
        var elavatorButtons = $('.elevatorButtons-' + callLevel);
        elavatorButtons.removeClass('btn-info');
        elavatorButtons.addClass('btn-success');

        /**
         * If the elevator is already moving there's no need to start the elevator again,
         * because its already moving to another destination.
         *
         * if the elevator is not moving the floor that's calling the elevator will be added to the destinations array,
         * and start moving the elevator by calling the function moveElevator(int)
         */
        if (elevator.moving) {
            /**
             * If floor that's calling the elevator is already in the list of destinations to go to.
             * it returns an error, else we add the floor to the destinations array
             */
            if(elevator.destanations.indexOf(callLevel) === -1) {
                elevator.destanations.push(callLevel);

                /**
                 * This function sorts the array so that, example: call floor: 3, call floor: 5, call floor: 4
                 * this function make sure the elevator will first go to floor: 3 then floor: 4 and finally floor: 5
                 * @type {Array}
                 */
                elevator.destanations = elevator.destanations.sort(function (a, b) {  return a - b;  });
            }else {
                swal('Be patient...', 'We will get there in a moment...','info');
            }
        }else{
            elevator.destanations.push(callLevel);

            /**
             * This function sorts the array so that, example: call floor: 3, call floor: 5, call floor: 4
             * this function make sure the elevator will first go to floor: 3 then floor: 4 and finally floor: 5
             * @type {Array}
             */
            elevator.destanations = elevator.destanations.sort(function (a, b) {  return a - b;  });
            moveElevator(callLevel);
        }
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

    /**
     * This function will move the elevator to all destinations
     * @param to This is a the number of the floor it needs to go.
     */
    function moveElevator(to) {

        /**
         * We remove the active class from the floor the elevator is at right now.
         * @type {*|jQuery|HTMLElement}
         */
        var fromLevel = $('#level-' + elevatorLevel);
        fromLevel.removeClass('level-active');

        /**
         * We simulate the elevator doors closing, using the 'elevatorState' method
         */
        setTimeout(function(){
            $('.elevator-buttons-' + elevatorLevel).hide('slow');
            elevatorState('doors-close');
        }, 500);

        /**
         * we set the elevator property 'moving' on TRUE
         * @type {boolean}
         */
        elevator.moving = true;

        elevatorState('moving');

        /**
         * We simulate the elevator moving by setting a timer to the speed of the elevator
         */
        setTimeout(function(){
            /**
             * When arrived the elevator state changes
             */
            elevatorState('arrived');
            elevatorState('doors-open');

            /**
             * the elevator floor buttons are now visible again on the corresponding floor.
             * The destination floor, so the floor that the elevator moved to will be removed from the array by using the .splice methd
             * this method will auto rearrange the array so that there are no null holes in the array.
             */
            $('.elevator-buttons-' + to).show('slow');
            elevator.destanations.splice(elevator.destanations.indexOf(to), 1);

            /**
             * We also visually update the floor buttons inside the elevator by giving them a colour.
             * @type {*|jQuery|HTMLElement}
             */
            var elevatorButtons = $('.elevatorButtons-' + to);
            elevatorButtons.addClass('btn-info');
            elevatorButtons.removeClass('btn-success');

            /**
             * We update the floor where the elevator is right now and give the floor a green colour.
             */
            elevatorLevel = to;
            $('#level-' + elevatorLevel).addClass('level-active');

            /**
             * We set a new timer to simulate people leaving the elevator and/or coming in.
             * When the timer hits 0 the function will check if there are other destinations to go to and executes this method again.
             * else the elevator will place it self in a state of 'offline'
             */
            setTimeout(function(){
                if(elevator.destanations[0] !== undefined) {
                    elevatorState('moving');
                    elevatorState('doors-close');

                    moveElevator(elevator.destanations[0]);
                }else{
                    elevator.moving = false;
                    elevatorState('offline');
                    elevatorState('doors-close');
                }
            }, 5000);
        }, elevator.speed);
    }
});