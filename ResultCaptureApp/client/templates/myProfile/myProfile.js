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
    },
    profilePic: function () {
        var images = Images.find({ '_id': Meteor.user().profile.imageId });
        console.log(images.fetch());
        return images;
    }
});
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
Template.myProfile.events({
    'change #uploadBtn': (e, tmpl) => {
        var input = tmpl.find('input[type=file]');
        var files = input.files;
        if (files.length > 0) {
            var file = files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#myImg').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    },
    'click #backBtn': (event) => {
        history.back();
    },
    'click #submitBtn': (event, tmpl) => {

        var profileImageId = undefined;
        var newUser = {
            firstName: $('[name=fname]').val(),
            lastName: $('[name=lname]').val(),
            gender: $('[name=gender]').val(),
            education: $('[name=education]').val(),
            profession: $('[name=profession]').val(),
            ethnicity: $('[name=ethnicity]').val(),
            dob: $('[name=dob]').val()
        }
        var files = tmpl.find('input[type=file]').files;
        if (files.length > 0) {
            Images.find({ 'metadata.ownerId': Meteor.userId() })
            var fsFile = new FS.File(files[0]);
            fsFile.metadata = { ownerId: Meteor.userId() };
            Images.insert(fsFile, function (err, file) {
                if (!err && file) {
                    console.log(file);
                    profileImageId = file._id;
                    updateUserData(newUser, profileImageId);
                }
            });
        }else{
            updateUserData(newUser, profileImageId);
        }
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
