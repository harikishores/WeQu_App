
Template.signupDefault.events({
    'click #facebook-login': function(event) {
        console.log('facebook login called');
        //needs changes to the current implementation
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                alert("Facebook login failed");
            }
            else{
                //login logic goes here
                alert('Facebook login successful');
            }
        });
    },

    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});
