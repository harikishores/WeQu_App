var userboard = {
    totalScore: 0,
    totalGames: 0,
    CardScores: [],
    CategoryScore: [],
    Questions: []
};
var SetupCategoryAndCardScore = function () {
    //setup the initial data
    userboard.CategoryScore.length = 0;
    userboard.CategoryScore = [];
    userboard.CardScores.length = 0;
    userboard.CardScores = [];
    for (var m in CardData) {
        var found = false;
        for (var k in userboard.CategoryScore) {
            if (userboard.CategoryScore[k].CategoryId === CardData[m].CateogryId) {
                found = true;
                break;
            } else { found = false; }
        }
        if (found === false) {
            userboard.CategoryScore.push({
                "CategoryId": CardData[m].CateogryId,
                "Score": 0
            })
        }

        for (var n in CardData[m].Cards) {
            userboard.CardScores.push({
                'CardId': CardData[m].Cards[n].CardId,
                'Score': 0
            });
        }
    }
}
var updateCardScore = function (cardScore) {
    for (var k in userboard.CardScores) {
        if (userboard.CardScores[k].CardId === cardScore.CardId) {
            userboard.CardScores[k].Score += cardScore.Point;
            break;
        }
    }
}
var udpateCategoryScore = function (scoreData) {
    var index = -1;
    for (var k in userboard.CategoryScore) {
        if (userboard.CategoryScore[k].CategoryId === scoreData.CategoryId) {
            index = k;
            break;
        } else { index = -1; }
    }

    if (index !== -1) {
        userboard.CategoryScore[index].Score += scoreData.Score;
    }
}
Meteor.methods({
    'getDashboardData': function () {
        userboard.totalScore = 0;
        var userHostGames = Games.find({
            'HostId': this.userId
        }).fetch();

        var userInvitedGames = Games.find({
            'InvitedId': this.userId
        }).fetch();
        
        
        SetupCategoryAndCardScore();

        //adding data where current user was the host
        if (userHostGames.length > 0) {
            userboard.totalGames = userHostGames.length;
            for (var k in userHostGames) {
                var scores = userHostGames[k].Host.GameScores;
                var data = userHostGames[k].Host.GameData;
                for (var m in scores) {
                    userboard.totalScore += scores[m].Score;
                    udpateCategoryScore(scores[m]);
                }

                for (var n in data) {
                    var point = 0;
                    //fetch the point
                    for (var o in GameData) {
                        if (GameData[o].Id === data[n].CategoryId) {
                            point = GameData[o].Points;
                            for (var a in data[n].SelectedCards) {
                                updateCardScore({
                                    Point: point,
                                    CardId: data[n].SelectedCards[a]
                                });
                            }
                            break;
                        }
                    }
                }
                //add the questions and comments
                userboard.Questions.push(userHostGames[k].Host.Questions);
            }
        }
        
        
        
                //adding data where current user was the host
        if (userInvitedGames.length > 0) {
            userboard.totalGames = userInvitedGames.length;
            for (var k in userInvitedGames) {
                var scores = userInvitedGames[k].Invited.GameScores;
                var data = userInvitedGames[k].Invited.GameData;
                for (var m in scores) {
                    userboard.totalScore += scores[m].Score;
                    udpateCategoryScore(scores[m]);
                }

                for (var n in data) {
                    var point = 0;
                    //fetch the point
                    for (var o in GameData) {
                        if (GameData[o].Id === data[n].CategoryId) {
                            point = GameData[o].Points;
                            for (var a in data[n].SelectedCards) {
                                updateCardScore({
                                    Point: point,
                                    CardId: data[n].SelectedCards[a]
                                });
                            }
                            break;
                        }
                    }
                }
                //add the questions and comments
                userboard.Questions.push(userInvitedGames[k].Invited.Questions);
            }
        }
        return userboard;
    }
});
