Template.login.events({
	'submit form': function(event){
		event.preventDefault();
		var email = $('[name=email]').val();
		var password = $('[name=password]').val();
		Meteor.loginWithPassword(email,password,function (error) {
			if (error) {
				alert(error.reason);
			}
			else
				alert("Success :D \m/");
		})
	}
});