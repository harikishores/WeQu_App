
Template.dashboard.rendered = function () {
	Session.setDefault('totalScore', 0);
	Session.setDefault('userboard', {});
	Session.setDefault('myPostiveEssences', {});
	
	Meteor.call('getDashboardData', function (e, r) {
		if (!e && r) {
			console.log(r);
			Session.set('userboard', r);
			setChartData(r.CategoryScore);
			Session.set('totalScore', r.totalScore);

			var posEsId = -1;
			var positiveEssenceQuestionIdIndex = $.grep(Questions, (e) => {
				return e.IsPositiveEssence == true;
			});

			if (positiveEssenceQuestionIdIndex.length > 0) {
				posEsId = positiveEssenceQuestionIdIndex[0].QuestionId;
			}

			if (posEsId !== -1) {
				var d = Session.get('userboard');
				var q = [];
				var pos_es = [];
				for (var k in d.Questions) {
					if (d.Questions[k] !== null) {
						var questions = $.grep(d.Questions[k], function (e) {
							return e.QuestionId == posEsId;
						})
						if (questions.length > 0) {
							q.push(questions[0]);
						}
					}

				}

				for (var k in q) {
					for (var l in q[k].SelectedCards) {
						if (containsCard(q[k].SelectedCards[l], pos_es) === false)
							pos_es.push(getParticularCard(q[k].SelectedCards[l]));
					}
				}
				Session.set('myPostiveEssences', pos_es);
			}
		}
	});
}

var containsCard = (CardId, arr) => {
	debugger;
	var index = $.grep(arr, (e) => {
		return e.CardId == CardId;
	});
	if (index.length > 0) {
		return true;
	}

	return false;
}

var getParticularCard = (cardId) => {
	for (var k in CardData) {
		for (var l in CardData[k].Cards) {
			if (CardData[k].Cards[l].CardId === cardId) {
				return CardData[k].Cards[l];
			}
		}
	}

	return undefined;
}
Template.dashboard.helpers({
	userTotalScore: function () {
		return Session.get('totalScore');
	},
	myPositiveEssences: () => {
		return Session.get('myPostiveEssences');
	},
	CardData: function () {
		return CardData;
	},
	CardScore: function (CardId) {
		var d = Session.get('userboard');
		var score = 0;
		if (d) {
			for (var k in d.CardScores) {
				if (d.CardScores[k].CardId === CardId) {
					score = d.CardScores[k].Score;
					break;
				}
			}
		}
		if (score < 0) score = 0;
		var res = ((score / (d.totalGames * 2)) * 100);
		if (isNaN(res))
			res = 0;
		return Math.round(res);
	},
	GetPositiveEssence: function () {
		var d = Session.get('userboard');
		if (d.Questions.length > 0) {

		}
	}
});
var setChartData = function (CategoryScore) {
	var chartLabels = [];
	var scores = [];
	for (var k in CardData) {
		chartLabels.push(CardData[k].CategoryName);
		var d = $.grep(CategoryScore, function (e) {
			return e.CategoryId == CardData[k].CateogryId;
		});

		if (d.length !== 0) {
			if (d[0].Score < 0)
				d[0].Score = 0;
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
	'click #invitationBtn': function (event) {
		Router.go('UnplayedGameList');
	},

	'change .slide-toggle': (event) => {
		event.preventDefault();
		var pane = $(event.target).attr('data-pane');
		if (pane) {
			if (pane === 'dashboard') {
				$(".overviewTab").show();
				$(".skillsTab").hide();
				$(".ProgressTab").hide();
				return;
			}

			if (pane === 'skills') {
				$(".overviewTab").hide();
				$(".skillsTab").show();
				$(".ProgressTab").hide();
				return;
			}

			if (pane === 'profile') {
				Router.go('/myProfile');
			}
		}
	},

	'click #captureBtn': function (event) {
		Router.go('FriendGameList');
	}
});	