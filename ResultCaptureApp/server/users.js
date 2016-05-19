
// Accounts.onCreateUser(function(options, user) 
// {

// });

Meteor.publish("collection", function () {
    //returns undefined if not logged in so check if logged in first
    if (this.userId) {
        var user = Meteor.users.findOne(this.userId);
        //var user is the same info as would be given in Meteor.user();
    }
});

Meteor.methods({
    'getUserDetails': function (userId) {
        
    }
});
