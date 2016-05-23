Template.verifyEmail.rendered = () => {
    if (Router.current().params._email)
        Meteor.call('sendVerificationLink', (e, r) => {
            if (!e) {

            }
        });
}
Template.verifyEmail.helpers({
    emailToVerify: () => {
        return Router.current().params._email;
    }
});

Template.verifyEmail.events({
    'click #nextBtn': (event) => {
        if (Meteor.user().emails[0].verified) {
            Router.go('signupadditional');
        } else {
            sweetAlert("Oops...", 'Email still not verified. Please verify your email.', "warning");
        }
    },

    'click #resendBtn': (event) => {
        Meteor.call('sendVerificationLink', (e, r) => {
            if (!e) {
                sweetAlert("Link Sent...", 'Email verification link successfully sent', "success");
            }
        });
    },
    'click #cancelBtn': (event) => {
        Meteor.logout();
    }
}); 
