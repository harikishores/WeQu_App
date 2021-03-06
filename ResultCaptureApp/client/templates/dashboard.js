var gamebusCheck = () => {
	var d = {
		"gameDescriptorId": 98304,
		"properties": [
			{
				"id": 76,
				"value": "6",
				"type": "INT"
			},
			{
				"id": 81,
				"value": "6",
				"type": "INT"
			},
			{
				"id": 86,
				"value": "4",
				"type": "INT"
			},
			{
				"id": 91,
				"value": "-2",
				"type": "INT"
			},
			{
				"id": 96,
				"value": "0",
				"type": "INT"
			},
			{
				"id": 101,
				"value": "-2",
				"type": "INT"
			}
		]
	};
}

Template.dashboard.rendered = function () {
	// alert(navigator.userAgent.toLowerCase().indexOf("android") > -1);
	// alert('isCordova : ' + Meteor.isCordova);
	gamebusCheck();
	Session.setDefault('totalScore', 0);
	Session.setDefault('userboard', {});
	Session.setDefault('myPostiveEssences', {});
	Session.setDefault('sample', '');
	$.blockUI({
		css: {
			border: 'none',
			padding: '14px',
			backgroundColor: '#000',
			'-webkit-border-radius': '9px',
			'-moz-border-radius': '9px',
			opacity: 0.5,
			color: '#fff'
		}
	});

	Meteor.call('getDashboardData', function (e, r) {
		$.unblockUI();
		if (!e && r) {
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
	var index = $.grep(arr, (e) => {
		return e.CardId == CardId;
	});
	if (index.length > 0) {
		return true;
	}

	return false;
}
var listToMatrix = (list, elementsPerSubArray) => {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
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
	checkZero: (g) => {
		if (g.fetch().length > 0) return false;
		else return true;
	},
	games: () => {
		var g = Games.find({
            'InvitedId': Meteor.userId(),
            'InvitedGameComplete': false
        });

		Session.set('games', g);
		return g;
	},
	getsample: () => {
		return Session.get('sample');
	},
	checkCardIndexLayout: (index) => {
		var positive_essences = Session.get('myPostiveEssences');
		if (positive_essences.length > 0) {
			var totalRows = Math.ceil(positive_essences.length / 3);

		}
	},
	userTotalScore: function () {
		return Session.get('totalScore');
	},
	myPositiveEssences: () => {
		return Session.get('myPostiveEssences');
	},
	postive_essences: {
		get: () => {
			return Session.get('myPostiveEssences');
		},
		totalRows: () => {
			return Math.ceil(Session.get('myPostiveEssences').length / 3);
		},
		cardsInRow: (row) => {
			var rows = this.totalRows();
			var cards = this.get();

		}
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

			if (score < 0) score = 0;
			var res = ((score / d.totalScore) * 100);
			if (isNaN(res))
				res = 0;
			return Math.round(res);
		}
	},
	GetPositiveEssence: function () {
		var d = Session.get('userboard');
		if (d.Questions.length > 0) {

		}
	}
});
var setChartData = function (CategoryScore) {
	var chartValues = [];
	var scores = [];
	for (var k in CardData) {
		var d = $.grep(CategoryScore, function (e) {
			return e.CategoryId == CardData[k].CateogryId;
		});
		if (d.length !== 0) {
			if (d[0].Score < 0)
				d[0].Score = 0;
			var obj = {
				"axis": CardData[k].CategoryName,
				"value": d[0].Score
			};
			chartValues.push(obj);
		}
	}
    var scoreObj = {
        "key": CardData[k].CateogryId,
        "values": chartValues
    };
    scores.push(scoreObj);

	var chartResize = function () {
		var width = document.getElementById('radarChart').offsetWidth;
		if (width > 520) { width = 520; }
		else if (width < 340) { width = 340; }
		var labelFactor = labelFactorVal(width);

		var color = d3.scale.ordinal().range(["#FFFFFF", "#CC333F", "#00A0B0"]);

		var radarChartOptions = {
            width: width,
            height: width,
            color: color
		};
		radarChart.options(radarChartOptions).update();
		radarChart.options({ circles: { labelFactor: labelFactor } });
    }
	window.addEventListener('resize', chartResize);

	radarChart = RadarChart();
	d3.select('#radarChart').call(radarChart);

	radarChart.options({ circles: { fill: 'none', color: '#929090' } });
	radarChart.options({ margins: { top: 100, right: 100, bottom: 100, left: 100 } });
	radarChart.options({ axes: { lineColor: '#929090' }, filter: false });
	radarChart.options({ circles: { maxValue: 10, levels: 7, labelFactor: 1.5 } });
	chartResize();
	radarChart.data(scores).update();
}


Template.dashboard.events({
	'click #invitationBtn': function (event) {
		Router.go('/UnplayedGameList');
	},

	'change .slide-toggle': (event) => {
		event.preventDefault();
		var pane = $(event.target).attr('data-pane');
		if (pane) {
			if (pane === 'dashboard') {
				$(".overviewTab").show();
				$(".skillsTab").hide();
				$(".ProgressTab").hide();
				$(".bottomButtonBackground").show();
				$(".profileOverview").removeClass("noPaddingBottom");
				return;
			}

			if (pane === 'skills') {
				$(".overviewTab").hide();
				$(".skillsTab").show();
				$(".ProgressTab").hide();
				$(".bottomButtonBackground").hide();
				$(".profileOverview").addClass("noPaddingBottom");
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