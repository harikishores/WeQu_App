//Facebook Init
window.fbAsyncInit = function() {
	FB._https = (window.location.protocol == "https:");
	FB.init({
		appId      : '1527224754240515',
		secret	   : '6dfa89c1ec4c1fe64fdbb92d9f8109b1',
		status     : true,
		xfbml      : true
	})
};

Meteor.startup(function(){
	//userLoggedInAndVerified();
	// console.log(GameData);
	//Router.go('FriendGameList');
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


//This is a test change ongoing 
//thanks a lot from Macintosh