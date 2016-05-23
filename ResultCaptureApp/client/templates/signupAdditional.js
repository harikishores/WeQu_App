Template.signupAdditional.helpers({
    create: function () {

    },
    rendered: function () {

    },
    destroyed: function () {

    },
});

Template.signupAdditional.events({
    'click #submitBtn': function (event) {
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
                // Meteor.users.update({ _id: Meteor.userId() }, { $set: { "emails[0].verified": true } });
                Meteor.users.update({ _id: Meteor.userId() }, {
                    $set:
                    {
                        "profile.profileComplete": true,
                        "profile.firstname": newUser.firstName,
                        "profile.lastname": newUser.lastName,
                        "profile.gender": newUser.gender,
                        "profile.education": newUser.education,
                        "profile.profession": newUser.profession,
                        "profile.ethnicity": newUser.ethnicity
                    }
                });
                // Meteor.call('updateUserProfile',newUser,(e,r)=>{
                //    if(!e){
                //        debugger;
                //        Router.go('dashboard');
                //    } else{
                //        console.log(e);
                //    }
                // });
            } else {
                alert('User not logged in');
            }

            // Meteor.users.update(Meteor.userId(),{$set: {
            //     "profile.name": fullName,
            //     "emails.0.verified" :true
            //     }
            // });
            // Meteor.users.update({_id:Meteor.userId()}, {$set:{
            //     "profile.name":fullName,
            //     "emails.0.verified" :true
            // }});
            Router.go('/dashboard');

        }
        catch (e) {
            console.log(e);
        }

    }
}); 
