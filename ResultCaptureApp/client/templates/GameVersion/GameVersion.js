
Template.GameVersion.rendered = function () {
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
                Router.current().params._lastName + "/host_mini/" + undefined;
            Router.go(url)
        });

        // swal({ title: "Are you sure?", text: "You will not be able to recover this imaginary file!", type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!", cancelButtonText: "No, cancel plx!", closeOnConfirm: false, closeOnCancel: false }, function(isConfirm) { if (isConfirm) { swal("Deleted!", "Your imaginary file has been deleted.", "success"); } else { swal("Cancelled", "Your imaginary file is safe :)", "error"); } });
        // var userSelectedOption = confirm('You have selected to play mini mode, Do you want to start the game?');
        // if (userSelectedOption) Router.go('resultCapture', { 'mode': 'mini' });
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
                Router.current().params._firstName  + "/" +
                Router.current().params._lastName + "/host_full/" + undefined;
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