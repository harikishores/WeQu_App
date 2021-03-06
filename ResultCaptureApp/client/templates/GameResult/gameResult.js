
Template.gameResult.rendered = function () {
    if (NewGame.GameId === "")
        Router.go('/dashboard');
    Session.setDefault('gameScore', 0);
    var game = Games.findOne({ '_id': NewGame.GameId });
    if (game) {
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
        // return '/cfs/files/images/' + Meteor.user().profile.imageId+ '/images?store=thumbs';
        var images = Images.find({ '_id': Meteor.user().profile.imageId });
        return images;
    },
    gameQuestions: () => {
        var data = [];
        for (var k in NewGame.Questions) {
            var d = $.grep(Questions, (e) => {
                return e.QuestionId == NewGame.Questions[k].QuestionId
            });
            if (d) {
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
        return data;
    }

});

Template.gameResult.events({
    'click #updateBtn': (event) => {
        try {
            if (navigator.userAgent.toLowerCase().indexOf("android") > -1 && Meteor.isCordova) {
                var tokenDC = fetchTokenFromDevice();//fetch token from android device
                var key = "FX4DqkZCb4KI6BWF"; //key for decrypting
                if (tokenDC !== "") {
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
                    //setting json for gamebus 
                    var d = {
                        "gameDescriptorId": 98304,
                        "properties": []
                    };
                    NewGame.GameScores.forEach(function (element) {
                        var e = $.grep(CardData, (k) => {
                            return k.CateogryId == element.CategoryId;
                        });
                        if (e.length > 0) {
                            d.properties.push({
                                'id': e[0].GameBusId,
                                'value': element.Score,
                                'type': 'INT'
                            });
                        }
                    }, this);
                    Meteor.call('decryptToken', tokenDC, key, (e, token) => {
                        if (!e && token !== "") {
                            HTTP.call("POST", "https://gamebus.synersec.eu/activity/new", {
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': 'Bearer ' + token
                                },
                                data: d
                            }, (error, result) => {
                                $.unblockUI();
                                Router.go('/dashboard');
                            });
                        } else {
                            $.unblockUI();
                            Router.go('/dashboard');
                        }
                    });
                }
            }
            Router.go('/dashboard');
        } catch (e) {
            $.unblockUI();
            Router.go('/dashboard');
        }
    }
});

//this is where we fetch the data from the mobile device
var fetchTokenFromDevice = () => {
    try {
        var token = '5vCGQXtdj7GZtwwhwVOquSyR/qvs95ojBsmOf9DX6T31Y2yTIvjXYHf6gd8icDaY';
        return token;
    } catch (e) {
        return "";
    }
};
var setChartData = function (CategoryScore) {
    var chartValues = [];
    var scores = [];
    var totalScore = 0;
    for (var m in CategoryScore) {
        totalScore += CategoryScore[m].Score;
    }
    Session.set('gameScore', totalScore);
    for (var k in CardData) {
        var d = $.grep(CategoryScore, function (e) {
            return e.CategoryId == CardData[k].CateogryId;
        });
        if (d.length !== 0) {
            if (d[0].Score < 0)
                d[0].Score = 0;
            var obj = {
                "axis": CardData[k].CategoryName,
                "value": Math.ceil((d[0].Score / totalScore) * 100)
            };
            chartValues.push(obj);
        }
    }
    // if(check == 1){
    var scoreObj = {
        "key": CardData[k].CateogryId,
        "values": chartValues
    };
    scores.push(scoreObj);
    // }

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