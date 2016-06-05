Template.forgotPassword.rendered = () => {
}

Template.forgotPassword.helpers({

});

Template.forgotPassword.events({
    'click #backBtn': (event) => {
        history.back();
    },

    'submit form': (event) => {
        var email = $('[name=email]').val();
        Accounts.forgotPassword({ email: email }, function (e) {
            if (!e) {
                alert('Email has been sent to ' + email + ". Please follow the link in the email to verify your email.");
                Router.go('/loginEmail');
            } else {
                alert(e.reason);
            }
        });
    }
}); 
