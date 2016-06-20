
Template.UnplayedGameList.rendered = function () {
    Session.setDefault('games', {});

}

Template.UnplayedGameList.helpers({
    games: function () {
        //return ReactiveMethod.call("getUnattendedGames");
        Meteor.call('getUnattendedGames', function (e, r) {
            console.log(r);
            Session.set('games', r);
        });
        return Session.get('games');
    },
    profileImage: (imageId) => {
        return '/cfs/files/images/' + imageId + '/images?store=thumbs';
    }
});

Template.UnplayedGameList.events({
    'click #backBtn': function (event) {
        Router.go('dashboard');
    },
    'click #playBtn': function (events) {
        var index = $(event.target).attr('data-index');
        var games = Session.get('games');
        if (games.length > 0) {
            console.log(games[index]);
            Router.go('/GameLoading/' +
                games[index].Email + "/" +
                games[index].HostFirstName + "/" +
                games[index].HostLastName + "/" +
                games[index]._id + "_" + games[index].GameMode + "_" + games[index].HostId);
        }
    }
});