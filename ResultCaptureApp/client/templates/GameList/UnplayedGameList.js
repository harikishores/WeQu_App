
Template.UnplayedGameList.rendered = function () {
    Session.setDefault('games', {});
    Meteor.call('getUnattendedGames', function (e, r) {
        Session.set('games', r);
    });
}

Template.UnplayedGameList.helpers({
    games: function () {
        return Session.get('games');
    },

});

Template.UnplayedGameList.events({
    'click #playBtn': function (events) {
        var index = $(event.target).attr('data-index');
        var games = Session.get('games');
        if (games.length > 0) {
            Router.go('/GameLoading/' +
                games[index].Email + "/" +
                games[index].HostFirstName + "/" +
                games[index].HostLastName + "/" +
                games[index]._id + "_" + games[index].GameMode);
        }
    }
});