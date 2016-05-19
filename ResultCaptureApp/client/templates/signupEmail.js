
// Template.signupEmail.rendered =function(){
// 	if (Meteor.userId()) {
// 		Router.go('dashboard');
// 	}
// };

Template.signupEmail.events({
    'submit form': function(event) {
        try {
            event.preventDefault();
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            Accounts.createUser({
                email: email,
                password: password
            }, function(error) {
                debugger;
                if (error) {
                    switch (error.error) {
                        case 403: //User email already exists
                            sweetAlert("Oops...",'Email already exists', "error");
                            break;
                        default:
                            sweetAlert("Oops...",'Failed to login. Please try again later.','error');
                    }
                }
                else {
                    Router.go('signupAdditional');
                }
            });
        }
        catch (e) {
            sweetAlert("Oops...",e, "error");
        }
    }
});

//User Login Check
// var UserLogin = function(email, password) {
//     Meteor.loginWithPassword(email, password, function(error) {
//         if (error) {
//             alert(error.reason);
//         } else {
//             //check if email is verified and login.
//             userLoggedInAndVerified();
//         }
//     });
// }
