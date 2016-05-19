Meteor.publish('games', function () {
    
    return Games.find({
        $or: [
            { 'HostId': this.userId },
            { 'InvitedId': this.userId }
        ]
    });
});

Meteor.methods({
    'getGamesWithConnection' : function(connectionId){
        var returnArr = [];
        var hostGames = Games.find({
            'HostId':this.userId,
            'InvitedId' : connectionId
        }).fetch();
        var invitedGames = Games.find({
            'HostId':connectionId,
            'InvitedId' : this.userId
        }).fetch();
        if(hostGames.length > 0) returnArr.push(hostGames);
        if(invitedGames.length > 0) returnArr.push(invitedGames);
        return returnArr;
    },
    'getUnattendedGames':function(){
        var g = Games.find({
           'InvitedId' : this.userId,
           'InvitedGameComplete' : false
        },{sort: {'Date': -1}}).fetch();

        for(var k in g){
            var hostId = g[k].HostId;
            if(hostId){
                var u = Meteor.users.findOne({'_id':hostId});
                if(u){
                    g[k].HostFirstName = u.profile.firstname;
                    g[k].HostLastName = u.profile.lastname;
                    g[k].Email = u.emails[0].address;
                }
            }
        }
        return g;
    },
    'setGame': function (guest) {
        try {
            var user = Accounts.findUserByEmail(guest.email);
            if (user === undefined) {
                user = Accounts.createUser({
                    email: guest.email,
                    firstName: guest.firstName,
                    lastName: guest.lastName
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
                    'GameMode': '',
                    'Host': {},
                    'Invited': {}
                });
                Meteor.call('addConnectionGame', {
                    'HostId': this.userId,
                    'ConnectionId': user
                });
                //send email
                Meteor.call('sendEmail', guest.email);
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
    'finishGuestGame':function(gameData){
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