
Template.signupEmail.events({
    'click #backBtn': function (event) {
        history.back();
    },
    'submit form': function (event) {
        try {
            event.preventDefault();
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Accounts.createUser({ email: email, password: password }, (e) => {
                if (e) {
                    sweetAlert("Oops...", e.reason, "error");
                } else {
                    Router.go('/verifyEmail/' + email);
                }
            })
        }
        catch (e) {
            sweetAlert("Oops...", e, "error");
        }
    }
});