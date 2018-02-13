$(document).ready(function (doc) {
    var levels = $('.level').length;
    var elevatorLevel = 1;
    var elevator = {
        moving: false,
        speed: 5000,
        destanations: []
    };

    var body = $('body');
    body.on('click', '.btnLevel', function (btn) {
        handleCall(parseInt(btn.target.getAttribute('data-level')));
    });

    body.on('click', '.btn-call-up', function (btn) {
        handleCall(parseInt(btn.target.getAttribute('data-level')));
    });

    body.on('click', '.btn-call-down', function (btn) {
        handleCall(parseInt(btn.target.getAttribute('data-level')));
    });

    function handleCall(callLevel) {
        if(callLevel === elevatorLevel) {
            swal('Whoops', 'The elevator is already on this floor','warning');
            return;
        }

        var elavatorButtons = $('.elevatorButtons-' + callLevel);
        elavatorButtons.removeClass('btn-info');
        elavatorButtons.addClass('btn-success');


        if (elevator.moving) {
            if(elevator.destanations.indexOf(callLevel) === -1) {
                elevator.destanations.push(callLevel);
            }else {
                swal('Be patient...', 'We will get there in a moment...','info');
            }
        }else{
            elevator.destanations.push(callLevel);
            moveElavator(callLevel);
        }
    }

    function elevatorState(state) {
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

    function moveElavator(to) {
        var fromLevel = $('#level-' + elevatorLevel);
        fromLevel.removeClass('level-active');

        setTimeout(function(){
            $('.elevator-buttons-' + elevatorLevel).hide('slow');
            elevatorState('doors-close');
        }, 500);

        elevator.moving = true;

        elevatorState('moving');

        setTimeout(function(){
            elevatorState('arrived');
            elevatorState('doors-open');
            $('.elevator-buttons-' + to).show('slow');
            elevator.destanations.splice(elevator.destanations.indexOf(to), 1);

            var elavatorButtons = $('.elevatorButtons-' + to);
            elavatorButtons.addClass('btn-info');
            elavatorButtons.removeClass('btn-success');

            elevatorLevel = to;
            $('#level-' + elevatorLevel).addClass('level-active');
            console.log(elevatorLevel);

            setTimeout(function(){
                if(elevator.destanations[0] !== undefined) {
                    elevatorState('moving');
                    elevatorState('doors-close');

                    moveElavator(elevator.destanations[0]);
                }else{
                    elevator.moving = false;
                    elevatorState('offline');
                    elevatorState('doors-close');
                }
            }, 5000);
        }, elevator.speed);
    }
});