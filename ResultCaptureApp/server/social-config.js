Meteor.startup(function () {
    ServiceConfiguration.configurations.remove({
        service: 'facebook'
    });

    ServiceConfiguration.configurations.insert({
        service: 'facebook',
        appId: '1527224754240515',
        secret: '6dfa89c1ec4c1fe64fdbb92d9f8109b1'
    });

    Accounts.loginServiceConfiguration.remove({
        service: "google"
    });
    Accounts.loginServiceConfiguration.insert({
        service: "google",
        clientId: "989623098286-5paj1mnrbtgcequcbjctcopkdfgolfka.apps.googleusercontent.com",
        secret: "tOIAfjMgUF3z5DvJfijpjZ8m"
    });

    Accounts.loginServiceConfiguration.remove({
        service: "linkedin"
    });
    Accounts.loginServiceConfiguration.insert({
        service: "linkedin",
        clientId: "758ew0beoeqe01",
        secret: "qwAMdc8wlJ3KxgY1"
    });


});