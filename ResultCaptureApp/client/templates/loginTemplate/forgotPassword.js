Template.forgotPassword.rendered = () => {
}

Template.forgotPassword.helpers({

});

Template.forgotPassword.events({
    'click #backBtn': (event) => {
        event.preventDefault();
        Router.go('/loginEmail');
    },

    'submit form': (event, tmpl) => {
        event.preventDefault();
        $.blockUI({
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }
        });
        var email = $('[name=email]').val();
        Accounts.forgotPassword({ email: email }, function (e, r) {
            if (!e) {
                $.unblockUI();
                alert('Email has been sent to ' + email + ". Please follow the link in the email to retrieve the account password.");
                Router.go('/loginEmail');
            } else {
                $.unblockUI();
                alert(e.reason);
            }
        });

        return;
    }
}); 
