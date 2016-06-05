Meteor.startup(function () {
  // process.env.MAIL_URL = 'smtp://guptasohaam:fnlitmqvujffzbwv@smtp.gmail.com:587/'
  if (smtpSettings.find().count() == 0) {
    smtpSettings.insert({
      username: 'guptasohaam',
      password: 'fnlitmqvujffzbwv',
      server: 'smtp.gmail.com',
      from: 'guptasohaam@gmail.com',
      port: 587,
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

Meteor.methods({
  'sendVerificationLink': function () {
    let userId = Meteor.userId();
    if (userId) {
      return Accounts.sendVerificationEmail(userId);
    }
  },
  'sendEmail': function (to) {
    try {
      if (settings) {
        Email.send({
          to: to,
          from: settings.from,
          subject: settings.Mails[0].Subject,
          text: settings.Mails[0].Body
        });
      }
    } catch (e) {
      console.log(e);
    }
    // check([text], [String]);
    // this.unblock();
  }
});