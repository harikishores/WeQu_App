Meteor.startup(function(){
	Meteor.subscribe('games');
	Meteor.subscribe('connections');
});
	