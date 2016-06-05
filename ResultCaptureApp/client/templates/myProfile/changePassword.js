Template.changePassword.rendered = ()=>{
    
}

Template.changePassword.events({
   'click #backBtn':(event)=>{
       history.back();
   },
   
   'click #submitBtn':(event)=>{
       var oldPassword = $('[name=oldPassword]').val();
       var newPassword = $('[name=newPassword]').val();
       
       Accounts.changePassword(oldPassword, newPassword, function(e) { 
            if(!e){
                $('[name=newPassword]').val('');
                $('[name=oldPassword]').val('');
                alert('Password Successfully Changed');
                Router.go('/dashboard');
            }else{
                alert(e);
            }
       });
   }
});