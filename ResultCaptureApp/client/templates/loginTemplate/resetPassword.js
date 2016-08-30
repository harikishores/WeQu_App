
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
                Accounts.resetPassword(Session.get('resetPassword'), password, function (err) {
                    if (err) {
                        alert(err.reason);
                    } else {
                        alert('Your password has been changed. Kindly relogin again. Welcome back!');
                        Router.go('/');
                    }
                });
            } else {
                alert('Please provide a password with at least 5 characters!');
            }
        }else{
             alert('Passwords do not match. Please try again!!');
        }
        return false;
    }
});