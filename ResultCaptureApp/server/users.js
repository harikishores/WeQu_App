var extractEmail = (user) => {
    if (user.emails) return user.emails[0].address;
    if (user.services.facebook) return user.services.facebook.email;
    if (user.services.google) return user.services.google.email;
    if (user.services.linkedin) return user.services.linkedin.email;

    return undefined;
}


Accounts.onCreateUser(function (options, user) {
    if (!options || !user)
        return;
    else {
        console.log(user);
        user.emails = [{
            'address': extractEmail(user),
            'verified': false
        }];
        return user;
    }
});

Meteor.publish('myUsers', function () {
    return Meteor.users.find();
});

Meteor.methods({
    'uploadImage': (file) => {
        file.save('/profilePictures/' + this.userId + ".jpg");
    },
    // 'userExists': (query, type) => {
    //     if (type === 'id') {
    //         return Accounts.user.findOne({ '_id': query });
    //     } else if (type === 'email') {
    //         return Accounts.findUserByEmail(query);
    //     }
    //     return undefined;
    // },
    'UserhasPassword': function (email, password) {
        var user = Accounts.findUserByEmail(email);
        if (user) {
            if (user.services.password) {
                Accounts.setPassword(user._id, password);
                return false;
            }
        }
        return true;
    },
    'updateUserProfile': (newUser) => {
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
        return true;
    },
    'getUserStatus': (email, password) => {
        var user = Meteor.users.findOne({
            $or: [
                { 'services.facebook.email': email },
                { 'services.google.email': email },
                { 'services.linkedin.email': email },
                { 'emails.address': email },
            ]
        });
        if (user) {
            var service = getServiceType(user);
            return {
                user: user,
                service: service
            };
        }
        else return undefined;
    },
    'getUserPositiveEssences': () => {
    }
});

var getServiceType = (user) => {
    if (user.services.password) return 'password';
    if (user.services.facebook) return 'facebook';
    if (user.services.google) return 'google';
    if (user.services.linkedin) return 'linkedin';
    if (user.services === {} && user.emails) return 'guest';
}
Meteor.users.allow({
    update: function (userId, user) {
        return true;

        /**
         * Don't use `return true` in production!
         * You probably need something like this:
         * return Meteor.users.findOne(userId).profile.isAdmin;
         */
    }
});
Meteor.startup(function () {
    var user = Accounts.findUserByEmail('selfplayedguest@wequ.com');
    if (user === undefined) {
        Accounts.createUser({
            email: 'selfplayedguest@wequ.com',
            firstName: 'SELF',
            lastName: 'PLAYED',
            password: 'wequ@76426'
        });
        var u = Accounts.findUserByEmail('selfplayedguest@wequ.com');
        if (u !== undefined) {
            Meteor.users.update(u._id, { $set: { "emails.0.verified": true } });
        }
    }
});