Router.onBeforeAction(function () {
    if (!Meteor.userId()) {
        Router.go('/');
        this.layout("home");
    } else {
        this.next();
    }
}, {
        except: ['home', , 'login', 'signupDefault', 'signupEmail', 'loginDefault', 'loginEmail', 'signupAdditional']
    });


Router.route('/', {
    template: 'home',
    fastRender: true,
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
    template: 'loginDefault'
});

Router.route('/loginEmail', {
    template: 'loginEmail'
});

Router.route('/signupAdditional', {
    template: 'signupAdditional'
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
    template: 'FriendListInvite'
});

Router.route('/EmailInvite', {
    template: 'EmailInvite'
});

Router.route('/GameVersion', {
    template: 'GameVersion'
});

Router.route('/UnplayedGameList', {
    template: 'UnplayedGameList'
});


Router.route('/GameLoading/:_email/:_firstName/:_lastName/:_playedBy', {
    template: 'GameLoading'
});
// Router.onBeforeAction(function(){
// 	if (Meteor.loggingIn()){
// 		this.render('loading');
// 	} else if (Meteor.user() && !Meteor.user().emails[0].verified){
// 		this.render('verification');
// 	} else {
// 		this.next();
// 	}
// })