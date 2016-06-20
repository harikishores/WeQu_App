
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
    var chartLabels = [];
    var scores = [];
    var GametotalScore = 0;

    for (var k in CardData) {
        chartLabels.push(CardData[k].CategoryName);
        var d = $.grep(CategoryScore, function (e) {
            return e.CategoryId == CardData[k].CateogryId;
        });
        var totalScore = 0;
        debugger;
        for (var m in CategoryScore) {
            totalScore += CategoryScore[m].Score;
        }
        if (d.length !== 0) {
            if (d[0].Score < 0)
                d[0].Score = 0;
            scores.push(Math.ceil((d[0].Score / totalScore) * 100));
            GametotalScore += d[0].Score;
        }
    }

    Session.set('gameScore', GametotalScore);
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