//updateScore on the go
updateScore = function (categoryIndex, gameIndex) {
    // debugger;
    var groupName = CardData[categoryIndex].Cards[0].GroupName;
    if (groupName) {
        $("input[name='" + groupName + "']:checked").each(function (index, elem) {
            //pushing selected cards to the app data namely GameData
            // debugger;
            if ($(elem).is(':checked')) {
                if ($.inArray($(elem).val(), GameData[gameIndex].SelectedCards) == -1)
                    GameData[gameIndex].SelectedCards.push($(elem).val());
            }

            console.log(GameData[gameIndex].SelectedCards);
            // else{
            //     GameData[gameIndex].SelectedCards = jQuery.grep(GameData[gameIndex].SelectedCards, function(value){
            //        return value != $(elem).val(); 
            //     });
            // }
        });
        return true;
    }
    return false;
}

postFullScore = function () {
    // debugger;
    for (var k in CardData) {
        NewGame.GameScores.push({
            'CategoryId': CardData[k].CateogryId,
            'Score': CardData[k].Score
        });
    }
    if (NewGame.PlayedBy === 'host') {
        Meteor.call('finishHostGame', NewGame, function (e, r) {
            if (!e && r) {
                Router.go('GameResult');
            } else {
                alert('Game Session Expired, Please try again');
                Router.go('/Dashboard');
            }
        })
    } else {
        Meteor.call('finishGuestGame', NewGame, function (e, r) {
            if (!e && r) {
                Router.go('/GameResult');
            } else {
                alert('Game Session Expired, Please try again');
                Router.go('/Dashboard');
            }
        })
    }
}

nextQuestionAvailable = function (presentQuestionId) {
    var currentQuestionId = presentQuestionId;
    ++currentQuestionId;
    var data = $.grep(Questions, function (e) {
        return e.QuestionId == currentQuestionId;
    });
    if (data.length === 0)
        return undefined;
    else return data[0];
}

setSession = {
    updateSelectedCards: function (cardId, isAdd) {
        debugger;
        var selCards = Session.get('sessionSelectedCards');
        if (selCards) {
            if (isAdd) {
                selCards.push({
                    cardId: cardId,
                    gameId: Session.get('currentGame').Id
                });
            } else {
                var index = $.grep(selCards, function (e) { return e.cardId !== cardId; });
                if (index.length !== 0) {
                    selCards = index;
                }
            }

            Session.set('sessionSelectedCards', selCards);
            console.log(selCards);
        }
    }
};
