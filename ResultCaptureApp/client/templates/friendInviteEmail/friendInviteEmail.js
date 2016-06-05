Template.friendInviteEmail.helpers({
    create: function () {

    },
    rendered: function () {

    },
    destroyed: function () {

    },
});

Template.friendInviteEmail.events({
    'submit form': function (event, template) {
        event.preventDefault();
        alert('done');
    }
}); 
