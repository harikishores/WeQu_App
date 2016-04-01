Template.GameVersion.events({
   'click #miniBtn':function (event) {
        var userSelectedOption = confirm('You have selected to play mini mode, Do you want to start the game?');
        if(userSelectedOption) Router.go('resultCapture');
     },
   'click #fullBtn':function (event) {
       var userSelectedOption = confirm('You have selected to play full mode, Do you want to start the game?');
        if(userSelectedOption) Router.go('resultCapture');
     }   
});