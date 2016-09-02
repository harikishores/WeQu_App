
Template.ResetPassword.onCreated(function () {
    if (Accounts._resetPasswordToken) {
        Session.set('resetPassword', Accounts._resetPasswordToken);
    }
});


Template.ResetPassword.helpers({
    resetPassword: function () {
        return Session.get('resetPassword');
    }
});

Template.ResetPassword.events({
    'submit #resetPasswordForm': function (e, t) {
        e.preventDefault();
        var resetPasswordForm = $(e.currentTarget),
            password = resetPasswordForm.find('#resetPasswordPassword').val(),
            passwordConfirm = resetPasswordForm.find('#resetPasswordPasswordConfirm').val();

        if (password === passwordConfirm) {
            if (password.length > 4) {
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
                Accounts.resetPassword(Session.get('resetPassword'), password, function (err) {
                    if (err) {
                        $.unblockUI();
                        alert(err.reason);
                    } else {
                        $.unblockUI();
                        alert('Your password has been changed. Kindly relogin again. Welcome back!');
                        Router.go('/');
                    }
                });
            } else {
                alert('Please provide a password with at least 5 characters!');
            }
        } else {
            alert('Passwords do not match. Please try again!!');
        }
        return false;
    }
});