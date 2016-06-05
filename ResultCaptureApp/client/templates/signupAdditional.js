Template.signupAdditional.helpers({
    create: function () {

    },
    rendered: function () {

    },
    destroyed: function () {

    },
});

Template.signupAdditional.events({
    'submit form': function (event) {
        try {
            debugger;
            event.preventDefault();
            var newUser = {
                firstName: $('[name=fname]').val(),
                lastName: $('[name=lname]').val(),
                gender: $('[name=gender]').val(),
                education: $('[name=education]').val(),
                profession: $('[name=profession]').val(),
                ethnicity: $('[name=ethnicity]').val(),
                dob: $('[name=dob]').val()
            };
            var fullName = newUser.firstName + " " + newUser.lastName;
            if (Meteor.userId()) {
                Meteor.users.update({ _id: Meteor.userId() }, {
                    $set:
                    {
                        "profile.profileComplete": true,
                        "profile.firstname": newUser.firstName,
                        "profile.lastname": newUser.lastName,
                        "profile.gender": newUser.gender,
                        "profile.education": newUser.education,
                        "profile.profession": newUser.profession,
                        "profile.ethnicity": newUser.ethnicity,
                        "profile.dob":newUser.dob
                    }
                });
            } else {
                alert('User not logged in');
            }
            Router.go('/dashboard');

        }
        catch (e) {
            console.log(e);
        }

    }
}); 
