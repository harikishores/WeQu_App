Meteor.methods({
   'userExists' : function (email) {
       console.log(email);
        var data = Accounts.findUserByEmail(email);
        if(data !== undefined){
            return data;
        }
        return undefined;
     } 
});