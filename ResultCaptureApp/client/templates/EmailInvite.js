Template.EmailInvite.events({
	'click #sendEmailBtn':function (event) {
		try	{
			Meteor.call('sendEmail','soham.gupta@geotechinfo.net', 'This is a test of Email.send.');
		}catch(e){
			alert('Failed');
		}finally{

		}
	}
});