Meteor.startup(function(){
	//userLoggedInAndVerified();
});

// userLoggedInAndVerified = function ()
// {
// 	console.log('inside userLoggedInAndVerified');
// 	if(Meteor.userId())
// 	{
// 		if(Meteor.user().emails[0].verified)
// 			Router.go('dashboard');
// 		else {
// 			Router.go('/signupAdditional');
// 		}
// 	}
// }

Tracker.autorun(function(){

});