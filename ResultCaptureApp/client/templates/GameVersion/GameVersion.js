Template.GameVersion.events({
    'click #miniBtn': function(event) {
        swal({
            title: "Are you sure?",
            text: "You have selected to play mini mode, Do you want to start the game?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Proceed!",
            closeOnConfirm: false
        }, function() {
            swal.close();
            NewGame.GameMode = "Mini";
            Router.go('/resultCapture/mini')
        });

        // swal({ title: "Are you sure?", text: "You will not be able to recover this imaginary file!", type: "warning", showCancelButton: true, confirmButtonColor: "#DD6B55", confirmButtonText: "Yes, delete it!", cancelButtonText: "No, cancel plx!", closeOnConfirm: false, closeOnCancel: false }, function(isConfirm) { if (isConfirm) { swal("Deleted!", "Your imaginary file has been deleted.", "success"); } else { swal("Cancelled", "Your imaginary file is safe :)", "error"); } });
        // var userSelectedOption = confirm('You have selected to play mini mode, Do you want to start the game?');
        // if (userSelectedOption) Router.go('resultCapture', { 'mode': 'mini' });
    },
    'click #fullBtn': function(event) {
        swal({
            title: "Are you sure?",
            text: "You have selected to play full mode, Do you want to start the game?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Proceed!",
            closeOnConfirm: false
        }, function() {
            swal.close();
            NewGame.GameMode = "Full";
            Router.go('/resultCapture/full')
        });


        // var userSelectedOption = confirm('You have selected to play full mode, Do you want to start the game?');
        // if (userSelectedOption) Router.go('resultCapture', { 'mode': 'full' });
    }
});