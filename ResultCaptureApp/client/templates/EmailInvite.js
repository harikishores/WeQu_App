Template.EmailInvite.events({
    'click #sendEmailBtn': function (event) {
        try {
            //Meteor.call('sendEmail', $('#email').val(), 'This is a test of Email.send.');
            // var b  = Meteor.call('userExists', 'soham@t.t',function (e,r) { 
            //     debugger;
            //     if(!e && r){
            //         console.log(r);
            //     }
            //  });
            Router.go('/GameLoading/' +
                $('#email').val() + "/" +
                $('#firstname').val() + "/" +
                $('#lastname').val() + "/host");

        } catch (e) {
            sweetAlert('Oops...', e, 'error');
        } finally {

        }
    }
});