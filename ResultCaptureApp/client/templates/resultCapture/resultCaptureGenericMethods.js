//updateScore on the go
updateScore = function (categoryIndex, gameIndex) {
    var groupName = CardData[categoryIndex].Cards[0].GroupName;
    if (groupName) {
        $("input[name='" + groupName + "']:checked").each(function (index, elem) {
            //pushing selected cards to the app data namely GameData
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
    NewGame.GameScores = [];//clear scores if required
    for (var k in CardData) {
        NewGame.GameScores.push({
            'CategoryId': CardData[k].CateogryId,
            'Score': CardData[k].Score
        });
    }
    if (NewGame.PlayedBy === 'host') {
        Meteor.call('finishHostGame', NewGame, function (e, r) {
            $.blockUI({
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff'
                }
            });
            if (!e && r) {
                $.unblockUI();
                Router.go('GameResult');
            } else {
                $.unblockUI();
                alert('Game Session Expired, Please try again');
                Router.go('/Dashboard');
            }
        })
    } else {
        Meteor.call('finishGuestGame', NewGame, function (e, r) {
            $.blockUI({
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff'
                }
            });
            if (!e && r) {
                $.unblockUI();
                Router.go('/GameResult');
            } else {
                $.unblockUI();
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
