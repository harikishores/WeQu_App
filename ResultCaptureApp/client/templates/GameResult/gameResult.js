
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
        // chartLabels.push(CardData[k].CategoryName);
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
            // scores.push(Math.ceil((d[0].Score / totalScore) * 100));
            var obj = {
                "axis": CardData[k].CategoryName,
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

      var  chartResize = function(){
          var width = document.getElementById('radarChart').offsetWidth;
          if(width > 520){width = 520;}
          else if(width < 300){width = 300;}
          var color = d3.scale.ordinal().range(["#EDC951","#CC333F","#00A0B0"]);
            
          var radarChartOptions = {
                width: width,
                height: width,
                color: color
          };
          radarChart.options(radarChartOptions).update();
        }
      window.addEventListener('resize', chartResize);
    
      radarChart = RadarChart();
      d3.select('#radarChart').call(radarChart);

      radarChart.options({circles: {fill: 'none', color: '#CDCDCD'}});
      radarChart.options({margins: {top: 50, right: 60, bottom: 50, left: 60}});
      radarChart.options({axes: {lineColor: 'white'}, filter: false});
      radarChart.options({circles: {maxValue: 0, levels: 4}});
      chartResize();
      radarChart.data(scores).update();
    // var radarChartData = {
    //     labels: chartLabels,
    //     datasets: [
    //         {
    //             label: "My First dataset",
    //             fillColor: "rgba(220,220,220,0.2)",
    //             strokeColor: "rgba(220,220,220,1)",
    //             pointColor: "rgba(220,220,220,1)",
    //             pointStrokeColor: "#fff",
    //             pointHighlightFill: "#fff",
    //             pointHighlightStroke: "rgba(220,220,220,1)",
    //             data: scores
    //         }]
    // };
    // window.myRadar = new Chart(document.getElementById("canvas").getContext("2d")).Radar(radarChartData, {
    //     responsive: true
    // });
}