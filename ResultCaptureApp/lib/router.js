Router.route('/', {
	template: 'home',
	fastRender: true,
	// waitOn:function(){
	// 	return Meteor.user();
	// },
	// onBeforeAction:function(){
	// 	if(Meteor.userId())
	// 	{
	// 		if(Meteor.user().emails[0].verified)
	// 			Router.go('dashboard');
	// 		else {
	// 			Router.go('/signupAdditional');
	// 		}
	// 	}
	// 	else Router.go('/signupDefault');

	// 	// if(!Meteor.loggingIn() && !Meteor.user()) {
	// 	// 	console.log('User not logged in yet');
	// 	// }
	// 	// else{
	// 	// 	console.log('user logged in');
	// 	// }
	// }
});
Router.configure({
  loadingTemplate: 'loading'
});
Router.route('/login', {
	template: 'login',
	fastRender: true
});


Router.route('/signupDefault', {
	template: 'signupDefault'
});

Router.route('/signupEmail', {
	template: 'signupEmail'
});

Router.route('/signupAdditional', {
	template: 'signupAdditional'
});

Router.route('/dashboard', {
	template: 'dashboard'
});

Router.route('/resultCapture', {
	template: 'resultCapture'
});

Router.route('/FriendGameList', {
	template: 'FriendListInvite'
});

Router.route('/EmailInvite', {
	template: 'EmailInvite'
});

Router.route('/GameVersion', {
	template: 'GameVersion'
});
// Router.onBeforeAction(function(){
// 	if (Meteor.loggingIn()){
// 		this.render('loading');
// 	} else if (Meteor.user() && !Meteor.user().emails[0].verified){
// 		this.render('verification');
// 	} else {
// 		this.next();
// 	}
// })