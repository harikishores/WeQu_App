
Template.loginDefault.events({
    'click #facebook-login': function (event) {
        console.log('facebook login called');
        //needs changes to the current implementation
        // Meteor.loginWithFacebook({}, function (err, r) {
        //     if (err) {
        //         alert("Facebook login failed");
        //     }
        //     else {
        //         Router.go('/signupAdditional');
        //     }
        // });

        Meteor.loginWithFacebook({ requestPermissions: ['user_friends', 'public_profile', 'email'] }, (err) => {
            if (err) {
                alert("Facebook login failed");
            } else {
                Router.go('/verifyEmail/' + Meteor.user().emails[0]);
            }
        });
    },
    'click #google-login': function () {
        Meteor.loginWithGoogle({}, (err) => {
            if (err) {
                alert("Google login failed");
            } else {
                Router.go('/verifyEmail/' + Meteor.user().emails[0]);
            }
        });
    },
    'click #linkedIn-login': function () {
        Meteor.loginWithLinkedin({}, (err) => {
            if (err) {
                alert("LinkedIn login failed");
            } else {
                Router.go('/verifyEmail/' + Meteor.user().emails[0]);
            }
        });
    },
    'click #logout': function (event) {
        Meteor.logout(function (err) {
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});
