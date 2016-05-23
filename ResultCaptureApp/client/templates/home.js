Template.home.events({
	'click #startBtn':function(event){
        event.preventDefault();
        // Meteor.logout();
        if(Meteor.userId())
        {
            Router.go('dashboard');
        }
        else
	        Router.go('loginDefault');
	}
});