
Template.GameVersion.rendered = function () {
    $.blockUI({
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    });

    Meteor.call('userExists', Router.current().params._email, (e, r) => {
        if(!e){
            if(r !== undefined){
                Router.current().params._guestId = r._id;
            }
        }
        $.unblockUI();
    });
}


Template.GameVersion.events({
    'click #miniBtn': function (event) {
        swal({
            title: "Are you sure?",
            text: "You have selected to play mini mode, Do you want to start the game?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Proceed!",
            closeOnConfirm: false
        }, function () {
            swal.close();
            NewGame.GameMode = "Mini";
            var url = '/GameLoading/' +
                Router.current().params._email + "/" +
                Router.current().params._firstName + "/" +
                Router.current().params._lastName + "/host_mini/" + Router.current().params._guestId;
            Router.go(url)
        });

        // swal({ title: "Are you sure?", text: "You will not be able to recover this imaginary file!", type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!", cancelButtonText: "No, cancel plx!", closeOnConfirm: false, closeOnCancel: false }, function(isConfirm) { if (isConfirm) { swal("Deleted!", "Your imaginary file has been deleted.", "success"); } else { swal("Cancelled", "Your imaginary file is safe :)", "error"); } });
        // var userSelectedOption = confirm('You have selected to play mini mode, Do you want to start the game?');
        // if (userSelectedOption) Router.go('resultCapture', { 'mode': 'mini' });
    },
    'click #backBtn': (event) => {
        history.back();
    },
    'click #fullBtn': function (event) {
        swal({
            title: "Are you sure?",
            text: "You have selected to play full mode, Do you want to start the game?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Proceed!",
            closeOnConfirm: false
        }, function () {
            swal.close();
            NewGame.GameMode = "Full";
            var url = '/GameLoading/' +
                Router.current().params._email + "/" +
                Router.current().params._firstName + "/" +
                Router.current().params._lastName + "/host_full/" + Router.current().params._guestId;
            Router.go(url)
        });
    },

    'click #cancelGameBtn': (event) => {
        swal({
            title: "Are you sure?",
            text: "You have selected to play full mode, Do you want to start the game?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Proceed!",
            closeOnConfirm: false
        }, function () {
            swal.close();
            Meteor.call('cancelGame');
            Router.go('/dashboard');
        });
    }
});