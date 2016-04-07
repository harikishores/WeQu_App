var gameIndex=0;
var categoryIndex=0;
var cardIndex=1; //used to track progress and show in progressbar
var score = [];
CardData.sort(predicateBy('CategoryId'));
GameData.sort(predicateBy('Id'));

//Track progress
Session.setDefault('progress', getProgress(cardIndex));
//Track card category
Session.setDefault('currentCategory',CardData[categoryIndex]);
//Track Game
Session.setDefault('currentGame', GameData[gameIndex]);


Template.resultCapture.rendered=function () {
	if (!this.rendered){
		this.rendered = true;
	}
}

Template.resultCapture.events({
	'click #nextBtn':function(event){
	    // debugger;
		// if(categoryIndex<(CardData.length-1))
		// {
		// 	if(updateScore(categoryIndex,gameIndex)){
		// 		Session.set('currentCategory', CardData[++categoryIndex]);
		// 		Session.set('progress', getProgress(++cardIndex));
		// 	}
		// }
		// else{
		// 	//getting the game index to default 0;
		// 	updateScore(categoryIndex,gameIndex);
		// 	//reset cards and category
		// 	categoryIndex=0;
		// 	Session.set('currentCategory', CardData[categoryIndex]);
		// 	Session.set('progress', getProgress(++cardIndex));
		// 	if(gameIndex<(GameData.length-1))
		// 	{
		// 		Session.set('currentGame', GameData[++gameIndex]);
		// 	}
		// 	else
		// 	{
		// 		categoryIndex = CardData.length;
		// 		console.log(Session.get('currentGame'));
		// 	}
		// }
	},
    'click #catNextBtn':function(event){
        event.preventDefault();
        if(categoryIndex<(CardData.length-1)){
            $('input:checkbox').removeAttr('checked');
            Session.set('currentCategory', CardData[++categoryIndex]);
            console.log(GameData);
        }
    },
    'click #catBackBtn':function(event){
        event.preventDefault();
        if(categoryIndex>0){
            $('input:checkbox').removeAttr('checked');
            Session.set('currentCategory', CardData[--categoryIndex]);
            console.log(GameData);
        }
    },
	'change .cardRadio':function(event){
        event.preventDefault();
        //check if the selection has been unselected and so remove from the list
        if(!$(event.target).is(':checked')){
            GameData[gameIndex].SelectedCards = $.grep(GameData[gameIndex].SelectedCards, function(value){
                return value != $(event.target).val(); 
            });
        }
        //update the score to the list
        updateScore(categoryIndex,gameIndex);
	}
});

Template.resultCapture.helpers({
	CardData:function () {
		var data = Session.get('currentCategory');
		if (data) {
			data.CategoryName = data.CategoryName.toUpperCase();
		}
		return data;
	},

	GameData:function () {
		var data = Session.get('currentGame');
		if (data) {
			data.Name = data.Name.toUpperCase();
		}
		return data;
	},

	ProgressPercentage:function	(){
		return Session.get('progress');
	}
});

// Template.cardHtml.rendered=function(){
//     debugger;
//     $('input:checkbox').removeAttr('checked');  
// };

Template.cardHtml.helpers({
	IsCardSelected : function(cardId)
	{
	    // debugger;
        if($.inArray(cardId, GameData[gameIndex].SelectedCards)  == -1)
            return '';
        else
            return 'checked';
	}
});

Template.cardHtml.events({
'click .selectMyCard':function(event){
	// $(event.target).find("input[type=checkbox]").prop( "checked", true );
}
});