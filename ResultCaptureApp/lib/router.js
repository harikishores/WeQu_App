Router.route('/', {
	template: 'home'
});

Router.route('/login', {
	template: 'login'
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
// Router.onBeforeAction(function(){
// 	if (Meteor.loggingIn()){
// 		this.render('loading');
// 	} else if (Meteor.user() && !Meteor.user().emails[0].verified){
// 		this.render('verification');
// 	} else {
// 		this.next();
// 	}
// })