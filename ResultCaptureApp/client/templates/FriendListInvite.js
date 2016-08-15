Template.FriendListInvite.rendered = function () {

}

Template.FriendListInvite.helpers({
	connections: function () {
		var cons = Connections.find().fetch();
		console.log(cons);
		for (var k in cons) {
			if (cons[k].UserId !== Meteor.userId()) {
				var hostId = cons[k].UserId;
				var u = Meteor.users.findOne({
					"_id": hostId
				});
				if (u) {
					cons[k].ConnectionFirstName = u.profile.firstname;
					cons[k].ConnectionLastName = u.profile.lastname;
					cons[k].ConnectionEmail = u.emails[0].address;
				}
			}
		}
		Session.set('connections', cons);
		return cons;
	},
	profilePicture: (connectionId) => {
		var u = Meteor.users.findOne({ '_id': connectionId });
		if (u && u.profile) {
			if(u.profile.imageId) return '/cfs/files/images/' + u.profile.imageId + '/images?store=thumbs';
		}
	},
	currentUserId:(connectionId)=>{
		if(connectionId !== Meteor.userId()) return true;
		return false;
	}
});

Template.FriendListInvite.events({
	'click #gamesBtn': function (event) {
		//Router.go('/GameList/' + $(event.target).attr('data-connectionId'));
	},
	'click #FBFriendBtn': function (event) {
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
		}, function () {
			console.log(arguments);
		});
	},
    'click #noInviteBtn': (event) => {
        var selfPlayedEmail = 'selfplayedguest@wequ.com';
        var url = '/GameVersion/' +
            selfPlayedEmail + "/" +
            'SELF+' + "/" +
            'PLAYED' + "/host/" + undefined;
        Router.go(url);
    },
	'click #selectBtn': function (event) {
		var cons = Session.get('connections');
		var index = $(event.target).attr('data-index');
		console.log(cons);
		Router.go('/GameVersion/' +
			cons[index].ConnectionEmail + "/" +
			cons[index].ConnectionFirstName + "/" +
			cons[index].ConnectionLastName + "/host/" + cons[index].ConnectionId);
	},
	'click #backBtn': function (event) {
		Router.go('dashboard');
	},
	'click #inviteEmailBtn': function (event) {
		Router.go('EmailInvite');
	}
});