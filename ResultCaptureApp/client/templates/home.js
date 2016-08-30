// Template.home.created = function() {
//     if (Accounts._resetPasswordToken){
//         Router.go('/#/reset-password/'+Accounts._resetPasswordToken);
//     }
// }
Template.home.events({
    'click #startBtn': function (event) {
        event.preventDefault();
        // Meteor.logout();
        if (Meteor.userId()) {
            Router.go('dashboard');
        }
        else
            Router.go('loginDefault');
    }
});