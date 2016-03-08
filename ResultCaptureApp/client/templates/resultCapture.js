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
		if(categoryIndex<(CardData.length-1))
		{
			Session.set('currentCategory', CardData[++categoryIndex]);
			Session.set('progress', getProgress(++cardIndex));
		}
		else{
			//getting the game index to default 0;
			categoryIndex=0;
			Session.set('currentCategory', CardData[categoryIndex]);
			Session.set('progress', getProgress(++cardIndex));
			if(gameIndex<(GameData.length-1))
			{
				Session.set('currentGame', GameData[++gameIndex]);
			}
			else
				alert('Thanks for playing the game');
		}
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