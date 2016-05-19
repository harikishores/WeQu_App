Template.loginEmail.events({
    'submit form': function (event) {
        event.preventDefault();
        try {

            var email = $('[name=email]').val();
            var password = $('[name=password]').val();

            Meteor.loginWithPassword(email, password, function (error) {
                if (error) {
                    sweetAlert("Oops...", error.reason, "error");
                }
                else {
                    debugger;
                    if (Meteor.userId()) {
                        if (Meteor.user().profile.verified)
                            Router.go('/dashboard');
                        else {
                            Router.go('/signupAdditional');
                        }
                    }
                }
            });
        }
        catch (e) {
            sweetAlert("Oops...", "Something snapped. Please try again later\n Reason : " + e, "error");
        }
    }
}); 