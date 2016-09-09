
Template.loginDefault.events({
    'click #facebook-login': function (event) {
        Meteor.loginWithFacebook({ requestPermissions: ['user_friends', 'public_profile', 'email'],loginStyle: 'redirect' }, (err) => {
            if (err) {
                alert("Facebook login failed");
            } else {
                if (Meteor.user().emails[0].verified !== true) {
                    Router.go('/verifyEmail/' + Meteor.user().emails[0]);
                } else {
                    Router.go('/dashboard');
                }
            }
        });
    },
    'click #google-login': function () {
        Meteor.loginWithGoogle({loginStyle: 'redirect'}, (err) => {
            debugger;
            if (err) {
                alert("Google login failed");
            } else {
                if (Meteor.user().emails[0].verified !== true) {
                    Router.go('/verifyEmail/' + Meteor.user().emails[0]);
                } else {
                    Router.go('/dashboard');
                }

            }
        });
    },
    'click #linkedIn-login': function () {
        Meteor.loginWithLinkedin({}, (err) => {
            debugger;
            if (err) {
                alert(err.message);
            } else {
                var u = Meteor.user();
                if (u !== undefined) {
                    if (u.emails[0].verified !== true) {
                        Meteor.users.update({ _id: u._id }, {
                            $set:
                            {
                                'emails.0.address': u.services.linkedin.emailAddress
                            }
                        });
                        Router.go('/verifyEmail/' + u.services.linkedin.emailAddress);
                    } else {
                        Router.go('/dashboard');
                    }
                }
            }
        });
    },
    'click #logout': function (event) {
        Meteor.logout(function (err) {
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    },

    'click #forgotPasswordBtn': (event) => {
        Router.go('/forgotPassword');
    },

    'click #signInBtn': (event) => {
        Router.go('/loginEmail');
    },

    'click #signUpBtn': (event) => {
        Router.go('/signupemail');
    }
});
