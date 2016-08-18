
Template.gameResult.rendered = function () {
    debugger;
    Session.setDefault('gameScore', 0);
    var game = Games.findOne({ 'GameId': NewGame._id });
    if (game) {
        debugger;
        setChartData(NewGame.GameScores);
    }
}

Template.gameResult.helpers({
    rendered: function () {

    },
    gameScore: () => {
        return Session.get('gameScore');
    },
    playerName: () => {
        return Meteor.user().profile.firstname;
    },
    guestName: () => {
        return NewGame.InvitedUserName;
    },
    profilePicture: () => {
        return '/cfs/files/images/' + Meteor.user().profile.imageId+ '/images?store=thumbs';
    },
    gameQuestions: () => {
        var data = [];
        for (var k in NewGame.Questions) {
            var d = $.grep(Questions, (e) => {
                return e.QuestionId == NewGame.Questions[k].QuestionId
            });
            if (d) {
                debugger;
                var tag = d[0].Tag;
                var selCards = [];
                var comment = NewGame.Questions[k].Comment;
                for (var m in NewGame.Questions[k].SelectedCards) {
                    var cardId = NewGame.Questions[k].SelectedCards[m];
                    for (var n in CardData) {
                        for (var o in CardData[n].Cards) {
                            if (CardData[n].Cards[o].CardId === cardId) {
                                selCards.push(CardData[n].Cards[o]);
                                break;
                            }
                        }
                    }
                }
                data.push({
                    'Tag': tag,
                    "Cards": selCards,
                    "Comment": comment
                });

            }
        }
        debugger;
        return data;
    }

});

Template.gameResult.events({
    'click #updateBtn': (event) => {
        Router.go('/dashboard');
    }
});

var setChartData = function (CategoryScore) {
    var chartValues = [];
    var scores = [];
    var GametotalScore = 0;
    var check = 0;

    for (var k in CardData) {
        var d = $.grep(CategoryScore, function (e) {
            return e.CategoryId == CardData[k].CateogryId;
        });
        var totalScore = 0;
        for (var m in CategoryScore) {
            totalScore += CategoryScore[m].Score;
        }
        if (d.length !== 0) {
            if (d[0].Score < 0)
                d[0].Score = 0;
            var obj = {
                "axis": checkLegend(CardData[k].CategoryName),
                "value": Math.ceil((d[0].Score / totalScore) * 100)
            };
            chartValues.push(obj);
            GametotalScore += d[0].Score;
            check = 1;
        }
    }
    Session.set('gameScore', GametotalScore);
    if(check == 1){
        var scoreObj = {
            "key": CardData[k].CateogryId,
            "values": chartValues
        };
        scores.push(scoreObj);
    }

    var chartResize = function () {
        var width = document.getElementById('radarChart').offsetWidth;
        if (width > 520) { width = 520; }
        else if (width < 300) { width = 300; }
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

    if(scores.length > 0){
        radarChart.data(scores).update();
    }
    else{
        radarChart.data(defaultData).update();
    }
}