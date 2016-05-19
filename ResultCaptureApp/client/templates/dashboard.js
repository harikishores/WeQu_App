Session.setDefault('userboard',{});

Template.dashboard.rendered = function () {
	Session.setDefault('totalScore',0);
	Meteor.call('getDashboardData',function(e,r){
		if(!e && r){
			console.log(r);
			Session.set('userboard',r);
			setChartData(r.CategoryScore);
			Session.set('totalScore',r.totalScore);
		}
	});
}
Template.dashboard.helpers({
	userTotalScore : function(){
		return Session.get('totalScore');
	},
	CardData : function(){
		return CardData;
	},
	CardScore : function(CardId){
		var d = Session.get('userboard');
		var score = 0;
		if(d){
			for(var k in d.CardScores){
				if(d.CardScores[k].CardId === CardId){
					score = d.CardScores[k].Score;
					break;
				}
			}
		}
		debugger;
		if(score < 0) score = 0;
		return ((score/(d.totalGames*2))*100);
	},
	GetPositiveEssence : function(){
		var d = Session.get('userboard');
		if(d.Questions.length > 0){
			
		}
	}
});
var setChartData = function (CategoryScore) {
	var chartLabels = [];
	var scores = [];
	for (var k in CardData){
		chartLabels.push(CardData[k].CategoryName);
		var d = $.grep(CategoryScore,function(e){
			return e.CategoryId == CardData[k].CateogryId;
		});
		
		if(d.length !== 0){    
			if(d[0].Score <= 0)
				d[0].Score = 1;
			scores.push(d[0].Score);
		}
	}
		

	var radarChartData = {
		labels: chartLabels,
		datasets: [
			{
				label: "My First dataset",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: scores
			}]
	};
	window.myRadar = new Chart(document.getElementById("canvas").getContext("2d")).Radar(radarChartData, {
		responsive: true
	});
}


Template.dashboard.events({
	'click span.skillMenuItem': function (event) {
		event.preventDefault();
		$(".overviewTab").hide();
		$(".skillsTab").show();
		$(".ProgressTab").hide();
	},

	'click span.progessMenuIem': function (event) {
		event.preventDefault();
		$(".overviewTab").hide();
		$(".skillsTab").hide();
		$(".ProgressTab").show();
	},

	'click span.overviewMenuItem': function (event) {
		event.preventDefault();
		$(".overviewTab").show();
		$(".skillsTab").hide();
		$(".ProgressTab").hide();
	},

	'click #captureBtn': function (event) {
		Router.go('FriendGameList');
	}
});	