
Template.UnplayedGameList.rendered = function () {
    Session.setDefault('games', {});

}

Template.UnplayedGameList.helpers({
    games: function () {
        //return ReactiveMethod.call("getUnattendedGames");
        Meteor.call('getUnattendedGames', function (e, r) {
            Session.set('games',r);
        });
        return Session.get('games');
    },

});

Template.UnplayedGameList.events({
    'click #backBtn':function(event){
      Router.go('dashboard');  
    },
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