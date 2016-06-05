Meteor.publish('connections', function () {
    var cons = Connections.find({
        $or: [
            { 'UserId': this.userId },
            { 'ConnectionId': this.userId }
        ]
    });
    return cons;
});

Meteor.methods({
    'addConnection': function (connection) {
        if (connection) {
            var cons = Connections.find({
                'UserId': this.userId,
                'ConnectionEmail': connection.Email
            }).fetch();

            var consver = Connections.find({
                'ConnectionId': this.userId,
                'UserId': connection.Id
            }).fetch()

            if (cons.length === 0 && consver.length === 0) {
                return Connections.insert({
                    'UserId': this.userId,
                    'DateAdded': new Date(),
                    'ConnectionId': connection.Id,
                    'ConnectionEmail': connection.Email,
                    'ConnectionFirstName': connection.FirstName,
                    'ConnectionLastName': connection.LastName,
                    'GamesPlayed': 0
                });
            } else {
                if (cons[0] === undefined)
                    return consver[0];

                return cons[0];
            }
        }
        return undefined;
    },

    'addConnectionGame': function (data) {
        var cons = Connections.update({
            'UserId': data.HostId,
            'ConnectionId': data.ConnectionId
        }, {
                $inc: {
                    'GamesPlayed': 1
                }
            });
    },
    'removeConnectionGame': function (data) {
        var cons = Connections.update({
            'UserId': data.HostId,
            'ConnectionId': data.ConnectionId
        }, {
                $inc: {
                    'GamesPlayed': -1
                }
            });
    }
});