Meteor.publish('connections', function () {
    return Connections.find({
        'UserId': this.userId
    });
});

Meteor.methods({
    'addConnection': function (connection) {
        if (connection) {
            var cons = Connections.find({
                'UserId': this.userId,
                'ConnectionEmail': connection.Email
            }).fetch();

            if (cons.length === 0) {
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
    }
});