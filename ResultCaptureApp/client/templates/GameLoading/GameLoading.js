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
    if (Router.current().params._playedBy.includes('host')) {
        var mode = Router.current().params._playedBy.split('_')[1];
        var b = Meteor.call('setGame', {
            email: Router.current().params._email,
            firstName: Router.current().params._firstName,
            lastName: Router.current().params._lastName,
            mode: mode
        }, function (e, r) {
            if (!e && r) {
                NewGame.PlayedBy = "host";
                NewGame.GameId = r;
                NewGame.InvitedUserName = Router.current().params._firstName;
                NewGame, GameMode = mode;
                if (mode === 'full')
                    Router.go('/resultCapture/full');
                else
                    Router.go('/resultCapture/mini');
            }
            else {
                alert('Oops, something snapped. Please try again');
                Router.go('/dashboard');
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

            if (mode === 'full')
                Router.go('/resultCapture/full');
            else
                Router.go('/resultCapture/mini');
        } else {
            alert('The other user has not yet played the game, Please try again later');
            Router.go('/dashboard');
        }
    }
}

Template.GameLoading.helpers({
    players: function () {
        return {
            host: Meteor.user().profile.firstname,
            invited: Router.current().params._firstName
        }
    },
    getDate: () => {
        return moment(this.date).format("MMM DD YYYY");
    },
    profileImage: (type) => {
        if (type == 'host') {
            // return '/cfs/files/images/' + Meteor.user().profile.imageId + '/images?store=thumbs';
            var images = Images.find({ '_id': Meteor.user().profile.imageId });
            return images;
        }

        if (type == 'guest') {
            var id = undefined;
            id = Router.current().params._guestId;

            if (id) {
                var u = Meteor.users.findOne({ '_id': id });
                if (u) {
                    // return '/cfs/files/images/' + u.profile.imageId + '/images?store=thumbs';
                    var images = Images.find({ '_id': u.profile.imageId });
                    return images;
                }
            }
        }
    }
});