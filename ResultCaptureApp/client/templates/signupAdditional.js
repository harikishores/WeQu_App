var updateUserData = (newUser, profileImageId) => {
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
            "profile.dob": newUser.dob,
            "profile.imageId": profileImageId
        }
    });
    Router.go('/dashboard');
}

Template.signupAdditional.events({
    'submit form': function (event, tmpl) {
        try {
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
                var profileImageId = undefined;
                var files = tmpl.find('input[type=file]').files;
                if (files.length > 0) {
                    var fsFile = new FS.File(files[0]);
                    fsFile.metadata = { ownerId: Meteor.userId() }
                    Images.insert(fsFile, function (err, file) {
                        if (!err && file) {
                            console.log(file);
                            profileImageId = file._id;
                            updateUserData(newUser, profileImageId);
                        }
                    });
                } else {
                    updateUserData(newUser, undefined);
                }
            } else {
                alert('User not logged in');
            }
        }
        catch (e) {
            console.log(e);
        }

    },

    'change #uploadBtn': (e, tmpl) => {
        var input = tmpl.find('input[type=file]');
        var files = input.files;
        if (files.length > 0) {
            var file = files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#myImg').attr('src', e.target.result);
                $('#myImg').attr('height', '100%');
                $('#myImg').attr('width', '100%');
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
}); 
