Template.forgotPassword.rendered = () => {
}

Template.forgotPassword.helpers({

});

Template.forgotPassword.events({
    'click #backBtn': (event) => {
        Router.go('/loginEmail');
    },

    'submit form': (event, tmpl) => {
        event.preventDefault();
        var email = $('[name=email]').val();
        Accounts.forgotPassword({ email: email }, function (e,r) {
            if (!e) {
                alert('Email has been sent to ' + email + ". Please follow the link in the email to retrieve the account password.");
                Router.go('/loginEmail');
            } else {
                alert(e.reason);
            }
        });
        
        return;
    }
}); 
