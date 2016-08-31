
Template.UnplayedGameList.rendered = function () {
    Session.setDefault('allgames', {});
    //this.rendered = true;
}

Template.UnplayedGameList.helpers({
    newgames: function () {
        Meteor.call('getUnattendedGames', function (e, r) {
			console.log(r);
            Session.set('allgames', r);
        });
        return Session.get('allgames');
    },
    profileImage: (imageId) => {
        if (imageId) {
            // return '/cfs/files/images/' + imageId + '/images?store=thumbs';
            var images = Images.find({ '_id': imageId });
            return images;
        }
        // else{return '';}
    }
});

Template.UnplayedGameList.events({
    'click #backBtn': function (event) {
        Router.go('/dashboard');
    },
    'click #playBtn': function (events) {
        var index = $(event.target).attr('data-index');
        var games = Session.get('allgames');
        if (games.length > 0) {
            console.log(games[index]);
            Router.go('/GameLoading/' +
                games[index].Email + "/" +
                games[index].HostFirstName + "/" +
                games[index].HostLastName + "/" +
                games[index]._id + "_" + games[index].GameMode + "/" + games[index].HostId);
        }
    }
});