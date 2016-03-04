Template.home.events({
	'click #startBtn':function(event){
		if(Meteor.userId())
		{
			if(Meteor.user().emails[0].verified)
				Router.go('dashboard');
			else {
				Router.go('/signupAdditional');
			}
		}
		else Router.go('/signupDefault');
	}
});