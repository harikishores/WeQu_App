Template.EmailInvite.events({
    'submit form': function (event) {
        event.preventDefault();
        try {
            var url = '/GameLoading/' +
                $('#email').val() + "/" +
                $('#firstname').val() + "/" +
                $('#lastname').val() + "/host/" + undefined;
            Router.go(url);
        } catch (e) {
            sweetAlert('Oops...', e, 'error');
        } finally {

        }
    },
    'click #backBtn': (event) => {
        history.back();
    },
    'click #noInviteBtn': (event) => {
        var selfPlayedEmail = 'selfplayedguest@wequ.com';
        var url = '/GameLoading/' +
            selfPlayedEmail + "/" +
            'SELF+' + "/" +
            'PLAYED' + "/host/" + undefined;
        Router.go(url);
    }
});