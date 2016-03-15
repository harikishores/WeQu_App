Template.Invite.events({
	'click #FBFriendBtn' : function(event){
		// FB.api( 
		// 	"/me/friends",
		// 	function (response) {
		// 		if (response && !response.error) {
		// 			console.log('GOT them !!!' + JSON.stringify(response, null, 4));
		// 			return response;
		// 		} else {
		// 			console.log('No can do' + JSON.stringify(response, null, 4));
		// 		}
		// 	});

		FB.ui({
			method: 'appinvite',
			message: 'You should learn more about the Platform.'
		}, function(){
			console.log(arguments);
		});
	},

	'click #inviteEmailBtn':function (event) {
		Router.go('EmailInvite');
	}
});