Meteor.publish('games', function () {

    return Games.find({
        $or: [
            { 'HostId': this.userId },
            { 'InvitedId': this.userId }
        ]
    });
});

var generatePassword = (passLength) => {
    var length = passLength,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

Meteor.methods({
    'cancelGame': (GameId) => {
        Games.remove({ 'GameId': GameId });
        Meteor.call('removeConnectionGame')
    },
    'getGamesWithConnection': function (connectionId) {
        var returnArr = [];
        var hostGames = Games.find({
            'HostId': this.userId,
            'InvitedId': connectionId
        }).fetch();
        var invitedGames = Games.find({
            'HostId': connectionId,
            'InvitedId': this.userId
        }).fetch();
        if (hostGames.length > 0) returnArr.push(hostGames);
        if (invitedGames.length > 0) returnArr.push(invitedGames);
        return returnArr;
    },
    'getUnattendedGames': function () {
        var g = Games.find({
            'InvitedId': this.userId,
            'InvitedGameComplete': false
        }, { sort: { 'Date': -1 } }).fetch();

        for (var k in g) {
            var hostId = g[k].HostId;
            if (hostId) {
                var u = Meteor.users.findOne({ '_id': hostId });
                if (u) {
                    g[k].HostFirstName = u.profile.firstname;
                    g[k].HostLastName = u.profile.lastname;
                    g[k].Email = u.emails[0].address;
                    g[k].HostImageId = u.profile.imageId;
                }
            }
        }
        return g;
    },
    'setGame': function (guest) {
        try {
            var user = Accounts.findUserByEmail(guest.email);
            var pass = undefined;
            if (user === undefined) {
                pass = generatePassword(9);
                user = Accounts.createUser({
                    email: guest.email,
                    firstName: guest.firstName,
                    lastName: guest.lastName,
                    password: pass
                });
            } else { user = user._id; }

            Meteor.call('addConnection', {
                Id: user,
                Email: guest.email,
                FirstName: guest.firstName,
                LastName: guest.lastName
            });
            //set the game on the server
            if (user !== undefined && Meteor.userId() !== undefined) {
                var game = Games.insert({
                    'HostId': Meteor.userId(),
                    'InvitedId': user,
                    'Date': new Date(),
                    'UpdatedDate': new Date(),
                    'HostGameComplete': false,
                    'InvitedGameComplete': false,
                    'GameMode': guest.mode,
                    'Host': {},
                    'Invited': {}
                });
                Meteor.call('addConnectionGame', {
                    'HostId': this.userId,
                    'ConnectionId': user
                });
                //send email
                var currentUser = Meteor.users.findOne({ '_id': this.userId });
                if (currentUser) {
                    if (guest.email !== 'selfplayedguest@wequ.com') {
                        Meteor.call('sendEmail', guest.email, {
                            Name: currentUser.profile.firstname + " " + currentUser.profile.lastname,
                            Email: currentUser.emails[0].address
                        }, pass == undefined ? false : true, pass);
                    }
                }


                return game;
            }
            return undefined;
        } catch (e) {
            console.log(e);
            return undefined;
        }
    },
    'finishHostGame': function (gameData) {
        if (gameData !== undefined) {
            var game = Games.update({
                '_id': gameData.GameId
            }, {
                    $set: {
                        'UpdatedDate': new Date(),
                        'HostGameComplete': true,
                        'GameMode': gameData.GameMode,
                        'Host': {
                            'GameData': gameData.CategoryCards,
                            'GameScores': gameData.GameScores,
                            'Questions': gameData.Questions
                        }
                    }
                });
            return game;
        }
        return undefined;
    },
    'finishGuestGame': function (gameData) {
        if (gameData !== undefined) {
            var game = Games.update({
                '_id': gameData.GameId
            }, {
                    $set: {
                        'UpdatedDate': new Date(),
                        'InvitedGameComplete': true,
                        'GameMode': gameData.GameMode,
                        'Invited': {
                            'GameData': gameData.CategoryCards,
                            'GameScores': gameData.GameScores,
                            'Questions': gameData.Questions
                        }
                    }
                });
            return game;
        }
        return undefined;
    }
});