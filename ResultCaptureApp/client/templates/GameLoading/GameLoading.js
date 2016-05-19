var resetData = function () {
    //reset game data
    for (var k in GameData) {
        GameData[k].SelectedCards.length = 0;
        GameData[k].SelectedCards = [];
    }

    //reset game object
    NewGame.PlayedBy = "";
    NewGame.GameId = "";
    NewGame.GameMode = "";
    NewGame.CategoryCards.length = 0;
    NewGame.CategoryCards = [];
    NewGame.HostUserId = "";
    NewGame.InvitedUserId = "";
    NewGame.Questions.length = 0;
    NewGame.Questions = [];

    //reset Card Scores
    for (var k in CardData) {
        CardData[k].Score = 0;
    }

};

Template.GameLoading.rendered = function () {
    // reset the data for the game
    resetData();
    if (Router.current().params._playedBy === 'host') {
        var b = Meteor.call('setGame', {
            email: Router.current().params._email,
            firstName: Router.current().params._firstName,
            lastName: Router.current().params._lastName
        }, function (e, r) {
            if (!e && r) {
                NewGame.PlayedBy = "host";
                NewGame.GameId = r;
                NewGame.InvitedUserName = Router.current().params._firstName;
                Router.go('/GameVersion');
            }
            else {
                alert('Oops, something snapped. Please try again');
                ROuter.go('/dashboard');
            }
        });
    } else {
        var playerIdGame = Router.current().params._playedBy;
        var d = playerIdGame.split('_');
        var gameId = d[0];
        var mode = d[1];
        if (mode != '') {
            NewGame.PlayedBy = "guest";
            NewGame.GameId = gameId;
            NewGame.GameMode = mode;
            
            if(mode === 'Full')
                Router.go('/resultCapture/full');
            else
                Router.go('/resultCapture/mini');    
        }
    }
}

Template.GameLoading.helpers({
    players: function () {
        return {
            host: Meteor.user().profile.firstname,
            invited: Router.current().params._firstName
        }
    }
});

Template.GameLoading.events({
    // 'click #foo': function(event, template) { 

    // } 
}); 
