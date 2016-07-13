Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
        Router.go('/');
        this.layout("home");
    } else {
        if (!Meteor.user().emails[0].verified) {
            this.layout("verifyEmail");
            Router.go('/verifyEmail/' + Meteor.user().emails[0].address);
        }
        else if (!Meteor.user().profile) {
            this.layout("signupAdditional");
            Router.go('/signupAdditional');
        }
        else if (!Meteor.user().profile.profileComplete) {
            this.layout("signupAdditional");
            Router.go('/signupAdditional');
        }
        else
            this.next();
    }
}, {
        except: ['home', 'verifyEmail', 'login', 'signupDefault', 'signupEmail', 'loginDefault', 'loginEmail', 'signupAdditional', 'forgotPassword']
    });


Router.route('/', {
    template: 'home'
});
Router.configure({
    loadingTemplate: 'loading'
});

Router.route('/login', {
    template: 'login',
    fastRender: true
});


Router.route('/signupDefault', {
    template: 'signupDefault'
});

Router.route('/signupEmail', {
    template: 'signupEmail'
});

Router.route('/loginDefault', {
    template: 'loginDefault',
    waitOn: function () {
        return Meteor.subscribe('myUsers')
    }
});

Router.route('/loginEmail', {
    template: 'loginEmail',
    waitOn: function () {
        return Meteor.subscribe('myUsers')
    }
});

Router.route('/signupAdditional', {
    template: 'signupAdditional',
    waitOn: function () {
        return Meteor.subscribe('myUsers')
    }
});

Router.route('/dashboard', {
    template: 'dashboard'
});

Router.route('/questionCategory/:_id', {
    template: 'questionCategory'
});

Router.route('/questionComment/:_id', {
    template: 'questionComment'
});
//result capture for Full mode
Router.route('/resultCapture/full', {
    template: 'resultCaptureFull',
    data: function () {
        var questions = [];
        questions = GameData;
        return questions;
    }
});

//result capture for Mini mode
Router.route('/resultCapture/mini', {
    template: 'resultCaptureMini',
    data: function () {
        var questions = [];
        for (var key in GameData) {
            for (var hey in GameData[key].Modes) {
                if (GameData[key].Modes[hey] == "Mini") {
                    questions.push(GameData[key]);
                    break;
                }
            }
        }
        return questions;
    }
});

Router.route('/FriendGameList', {
    waitOn: function () {
        return [Meteor.subscribe('connections'), Meteor.subscribe('myUsers')];
    },
    action: function () {
        this.render('FriendListInvite');
    }
});

Router.route('/EmailInvite', {
    template: 'EmailInvite'
});

Router.route('/GameVersion/:_email/:_firstName/:_lastName/:_playedBy/:_guestId', {
    template: 'GameVersion'
});

Router.route('/friendInviteEmail', {
    template: 'friendInviteEmail'
});

Router.route('/UnplayedGameList', {
    template: 'UnplayedGameList',
    waitOn: () => {
        return [Meteor.subscribe('images')];
    }
});
Router.route('/GameResult', {
    template: 'gameResult',
    waitOn: function () {
        return [Meteor.subscribe('games'), Meteor.subscribe('myUsers')];
    }
});
Router.route('/verifyEmail/:_email', {
    template: 'verifyEmail'
});

Router.route('/forgotPassword', {
    template: 'forgotPassword'
});

Router.route('/myProfile', {
    template: 'myProfile',
    waitOn: () => {
        return [Meteor.subscribe('myUsers'), Meteor.subscribe('images')];
    }
});

Router.route('/changePassword', {
    template: 'changePassword'
});

Router.route('/GameLoading/:_email/:_firstName/:_lastName/:_playedBy/:_guestId', {
    template: 'GameLoading',
    waitOn: () => {
        return [Meteor.subscribe('myUsers'),Meteor.subscribe('images')];
    }
});