Meteor.startup(function () {
  // process.env.MAIL_URL = 'smtp://guptasohaam:fnlitmqvujffzbwv@smtp.gmail.com:587/'
  if (smtpSettings.find().count() == 0) {
    smtpSettings.insert({
      username: 'contact@wequ.co',
      password: 'Feedback12',
      server: 'smtp.gmail.com',
      from: 'contact@wequ.co',
      port: 465,
      Mails: [
        {
          Name: 'App Request',
          Subject: 'Wequ Capture. Invitation From {{name}}',
          Body: 'This is Request to install the wequ Capture app from either appstore or playstore'
        },
        {
          Name: 'Game Request',
          Subject: 'Wequ Capture. Invitation to play with {{name}}',
          Body: 'This is Request to play the wequ Capture app from either appstore or playstore'
        },
      ]
    });
  }

  settings = smtpSettings.findOne();
  if (settings) {
    smtp = {
      username: settings.username,
      password: settings.password,
      server: settings.server,
      port: settings.port
    };
    process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
  }
});
Accounts.emailTemplates.verifyEmail.subject = function () {
  return "Wequ";
}
Meteor.methods({
  'sendVerificationLink': function () {
    let userId = Meteor.userId();
    console.log(userId);
    if (userId) {
      return Accounts.sendVerificationEmail(userId);
    }
  },
  'sendEmail': function (to, sentFrom, isNewUser, pass) {
    try {
      if (settings) {
        if (isNewUser === false) {
          Email.send({
            to: to,
            from: settings.from,
            subject: "WEQU Game invitations from " + sentFrom.Name,
            text: "You have been invited to play a game by " + sentFrom.Email + ". Kindly login to the app to submit your results"
          });
        } else {
          Email.send({
            to: to,
            from: settings.from,
            subject: "WEQU Game invitations from " + sentFrom.Name,
            text: "You have been invited to play a game by " + sentFrom.Email + ". Kindly install the app to submit your results. \nYour account is created where the username is your current email and the password is " + pass + ". You can change the password after you login from the profile section"
          });
        }

      }
    } catch (e) {
      console.log(e);
    }
    // check([text], [String]);
    // this.unblock();
  }
});