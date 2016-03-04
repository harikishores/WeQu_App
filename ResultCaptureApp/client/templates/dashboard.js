Template.dashboard.rendered =function(){
	if(!Meteor.userId())
		Router.go('/');
}
Template.dashboard.isActive = function () {
    return Meteor.user() && Meteor.user().profile.isActive;
}
Template.dashboard.events({
	'click #logoutBtn':function(event){
		event.preventDefault();
		Meteor.logout();
		//Router.go('/');
	}
});	