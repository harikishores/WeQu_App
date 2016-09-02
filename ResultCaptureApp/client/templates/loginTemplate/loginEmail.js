var throwLoginError = (user) => {
    var service = user.services;
    if (service.facebook) {
        alert('You are already registerd with facebook. Please log in from facebook');
        return;
    }
    if (service.google) {
        alert('You are already registerd with google. Please log in from google');
        return;
    }
    if (service.linkedin) {
        alert('You are already registerd with linkedin. Please log in from linkedin');
        return;
    }
    if (service.facebook) {
        alert('You are already registerd with facebook. Please log in from facebook');
        return;
    }
}

Template.loginEmail.events({
    'click #backBtn': function (event) {
        Router.go('/logindefault');
    },
    'click #forgotPasswordBtn': (event) => {
        Router.go('/forgotPassword');
    },
    'submit form': function (event) {
        event.preventDefault();
        try {
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
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
            Meteor.call('getUserStatus', email, password, (e, r) => {
                if (!e) {
                    if (r === undefined) {
                        $.unblockUI();
                        sweetAlert("Oops...", 'User nor found', "error");
                    } else {
                        Meteor.loginWithPassword(email, password, (e) => {
                            if (e) {
                                $.unblockUI();
                                sweetAlert("Oops...", e.reason, "error");
                            } else {
                                $.unblockUI();
                                if (!r.user.emails[0].verified) {
                                    Router.go('/verifyEmail/' + email);
                                }
                                else if (!r.user.profile || !r.user.profile.profileComplete) Router.go('/signupAdditional')
                                else Router.go('/dashboard');
                            }
                        });
                    }
                }
            })


            // Meteor.call('getUserStatus', email, password, (e, r) => {
            //     if (!e) {
            //         if (r === undefined) {
            //             Accounts.createUser({ email: email, password: password }, (e) => {
            //                 if (e) {
            //                     sweetAlert("Oops...", e.reason, "error");
            //                 } else {
            //                     Router.go('/verifyEmail/' + email);
            //                 }
            //             })
            //         } else {
            //             if (r.service === 'password') {
            //                 Meteor.loginWithPassword(email, password, (e) => {
            //                     if (e) {
            //                         sweetAlert("Oops...", e.reason, "error");
            //                     } else {
            //                         if (!r.user.emails[0].verified) {
            //                             Router.go('/verifyEmail/' + email);
            //                         }
            //                         else if(!r.user.profile || !r.user.profile.profileComplete) Router.go('/signupAdditional')
            //                         else Router.go('/dashboard');
            //                     }
            //                 });
            //             } else throwLoginError(r.user);
            //         }
            //     }
            //     else console.log(e);
            // })
        }
        catch (e) {
            sweetAlert("Oops...", "Something snapped. Please try again later\n Reason : " + e, "error");
        }
    }
});

var createNewUser = (user) => {
    try {
        event.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        Accounts.createUser({
            email: email,
            password: password
        }, function (error) {
            if (error) {
                switch (error.error) {
                    case 403: //User email already exists

                        break;
                    default:
                        sweetAlert("Oops...", 'Failed to login. Please try again later.', 'error');
                }
            }
            else {
                Meteor.call('sendVerificationLink', (e, r) => {
                    if (!e) {
                        console.log(r);
                    } else console.log(e);

                });
                Router.go('signupAdditional');
            }
        });
    }
    catch (e) {
        sweetAlert("Oops...", e, "error");
    }
}