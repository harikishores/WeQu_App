
Template.signupEmail.rendered =function(){
	console.log('signupEmail rendered');
	if (Meteor.userId()) {
		console.log('going to dashboard');
		Router.go('dashboard');
	}
};

Template.signupEmail.events({
	'submit form' : function (event) {
		event.preventDefault();
		var email = $('[name=email]').val();
		var password = $('[name=password]').val();
		
		Accounts.createUser({
			email:email,
			password:password
		},function(error){
			debugger;
			if (error) {
				switch(error.error)
				{
					case 403: 
						UserLogin(email,password);
						break;
					default:
						alert('Failed to login. Please try again later.');
				}
			}
			else
			{
				console.log('going to signupAdditional');
				Router.go('signupAdditional');
			}
		});
	}
});

//User Login Check
var UserLogin = function (email,password)
{
	Meteor.loginWithPassword(email,password,function(error){
		if (error) {
			alert(error.reason);
		}else{
			//check if email is verified and login.
			//userLoggedInAndVerified();
		}
	});
}
