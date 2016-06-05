Template.myProfile.rendered = () => {
    Session.setDefault('isEdit', false);
    var user = Meteor.user();
    console.log(user);
    if (user) {
        $('[name=fname]').val(user.profile.firstname);
        $('[name=lname]').val(user.profile.lastname);
        $('[name=gender]').val(user.profile.gender);
        $('[name=education]').val(user.profile.education);
        $('[name=profession]').val(user.profile.profession);
        $('[name=ethnicity]').val(user.profile.ethnicity);
        $('[name=dob]').val(user.profile.dob);
    } else {
        // history.back();
        Meteor.logout();
    }
}


Template.myProfile.helpers({
    isEdit: () => {
        if (!Session.get('isEdit')) return 'disabled';
        else return '';
    }
});

Template.myProfile.events({

    'click #backBtn': (event) => {
        history.back();
    },
    'click #submitBtn': (event) => {
        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile.firstname': $('[name=fname]').val(),
                'profile.lastname': $('[name=lname]').val(),
                'profile.gender': $('[name=gender]').val(),
                'profile.education': $('[name=education]').val(),
                'profile.profession': $('[name=profession]').val(),
                'profile.ethnicity': $('[name=ethnicity]').val(),
                'profile.dob': $('[name=dob]').val()
            }
        });

        Router.go('/dashboard');
    },
    'click #logoutBtn': (event) => {
        Meteor.logout()
    },

    'click #changePasswordBtn': (event) => {
        if (Meteor.user().services.password) Router.go('/changePassword');
        else {
            alert('Sorry, You are not logged in with password');
        }
    }
}); 
