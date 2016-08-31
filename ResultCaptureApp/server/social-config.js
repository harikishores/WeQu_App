Meteor.startup(function () {
    ServiceConfiguration.configurations.remove({
        service: 'facebook'
    });

    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: '686427678196672',
        secret: '3654d5d288f7aa1c0bcf9ae7372ffc95'
    });

    Accounts.loginServiceConfiguration.remove({
        service: "google"
    });
    Accounts.loginServiceConfiguration.insert({
        service: "google",
        clientId: "616860015684-eafp65np9pip0t82smn1uu57m82bblpg.apps.googleusercontent.com",
        secret: "RfiSRo4WXW5gSu04hpo9naxn"
    });

    Accounts.loginServiceConfiguration.remove({
        service: "linkedin"
    });
    Accounts.loginServiceConfiguration.insert({
        service: "linkedin",
        clientId: "758ew0beoeqe01",
        secret: "qwAMdc8wlJ3KxgY1",
        loginStyle:'popup'
    });
    Images.allow({
        'insert': () => {
            return true;
        },
        'download': () => {
            return true;
        },
        'remove': () => {
            return true;
        }
    });

    Accounts.emailTemplates.resetPassword.text = function (user, url) {
        var token = url.substring(url.lastIndexOf('/') + 1, url.length);
        var newUrl = Meteor.absoluteUrl('reset-password/' + token);
        var str = 'Hello, \n';
        str += 'Click on the following link to reset your password \n';
        str += newUrl;
        return str;
    };
});