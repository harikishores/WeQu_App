//new logic and concepts for the game app.

var gameIndex = 0;
var categoryIndex = 0;
var cardIndex = 1; //used to track progress and show in progressbar
var score = [];
var cardSelectionComplete = false;

predicateBy = function (prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}
CardData.sort(predicateBy('CategoryId'));


Template.resultCaptureMini.rendered = function () {
    GameData = this.data;
    categoryIndex = 0;
    cardIndex = 0;
    score = [];
    cardSelectionComplete = false;
    gameIndex = 0;

    Session.setDefault('sessionSelectedCards', []);
    Session.set('sessionSelectedCards', []);
    //Sected Card Count
    Session.setDefault('currentCategory', CardData);
    //Track Game

    Session.setDefault('currentGame', GameData[gameIndex]);
    if (!this.rendered) {
        this.rendered = true;
    }
}
Template.registerHelper('equals', function (a, b) {
    return a === b;
});
Template.resultCaptureMini.events({
    'click #submitBtn': function (event) {
        swal({
            title: "Are you sure?",
            text: "Are you sure, you would like to move forward?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, Proceed!",
            closeOnConfirm: false
        }, function () {
            swal.close();
            //udpate rest of the cards
            ++gameIndex;
            var selCards = Session.get('sessionSelectedCards');
            for (var k in CardData) {
                for (var m in CardData[k].Cards) {
                    var c = $.grep(selCards, function (e) {
                        return e.cardId == CardData[k].Cards[m].CardId;
                    });

                    if (c.length === 0) {
                        GameData[gameIndex].SelectedCards.push(CardData[k].Cards[m].CardId);
                        CardData[k].Score += GameData[gameIndex].Points;
                    }
                }
            }
            //update rest of the cards finish

            for (var k in GameData) {
                NewGame.CategoryCards.push({
                    "CategoryId": GameData[k].Id,
                    "SelectedCards": GameData[k].SelectedCards
                });
            }
            if (GameData.length === 2)
                NewGame.GameMode = "Mini";
            else
                NewGame.GameMode = "Full";
            NewGame.HostUserId = Meteor.userId();
            // debugger;
            Router.go('/questionCategory/1');
        });
    },

    'click #nextBtn': function (event) {
        if (GameData[gameIndex].SelectedCards.length === 12) {
            if (gameIndex < (GameData.length - 1)) {
                Session.set('currentGame', GameData[++gameIndex]);
            }
        } else {
            alert('Please select 12 cards from this category to move forward');
        }
    },
    //back button click
    'click #backBtn': function (event) {
        if (gameIndex > 0) {
            Session.set('currentGame', GameData[--gameIndex]);
        }
    },

    'change .cardRadio': function (event) {
        event.preventDefault();
        if (!$(event.target).is(".myActiveCard")) {
            //check is 6 cards selected from the category
            if ($(event.target).is(':checked') && GameData[gameIndex].SelectedCards.length >= 12) {
                alert('Only 12 cards can be selected under a single category, Press next to continue.');
                $(event.target).prop('checked', false);
                return;
            }
            //check 6 cards ends
            var valueUdpate = $(event.target).val();//value to be updated
            var valueChecked = false; //is the element checked
            var valueExists = false; // does the eleement value exists in the array of selected cards of the current game index?
            var valueIndex = GameData[gameIndex].SelectedCards.indexOf(valueUdpate); //-1 indicates not in any index.
            if ($(event.target).is(':checked')) { valueChecked = true; }

            if (valueIndex !== -1) {
                valueExists = true;
            }

            if (valueChecked && !valueExists && Session.get('sessionSelectedCards').length < 24) { //if value is checked and does not exists in the array of selected Cards.
                GameData[gameIndex].SelectedCards.push(valueUdpate);
                var catId = $(event.target).attr('data-Cateogry')
                for (var k in CardData) {
                    if (CardData[k].CateogryId === catId) {
                        CardData[k].Score += GameData[gameIndex].Points;
                    }
                }
                setSession.updateSelectedCards(valueUdpate, true);
                var cid = $(event.target).prop('id');
                $('#' + cid + '_div').addClass('selectedCard');
                return;
            }

            if (!valueChecked && valueExists) { //if the value is not checked but exists in the array of selected cards.
                GameData[gameIndex].SelectedCards.splice(valueIndex, 1);
                var catId = $(event.target).attr('data-Cateogry')
                for (var k in CardData) {
                    if (CardData[k].CateogryId === catId) {
                        CardData[k].Score -= GameData[gameIndex].Points;
                    }
                }
                setSession.updateSelectedCards(valueUdpate, false);
                var cid = $(event.target).prop('id');
                $('#' + cid + '_div').removeClass('selectedCard');
                return;
            }
            //update the score to the list
            //updateScore(categoryIndex, gameIndex);
        }
    }
});

Template.resultCaptureMini.helpers({
    CardData: function () {
        return CardData;
    },
    selectedCards: function () {
        return Session.get('sessionSelectedCards');
    },

    // this is not working
    checkModeAndCardSelection: function () {
        try {
            // if (GameData.length === 2 && Session.get('sessionSelectedCards').length === 12) {
            //     cardSelectionComplete = true;
            //     return true;
            // }

            if (Session.get('sessionSelectedCards').length === 12) {
                cardSelectionComplete = true;
                return true;
            }
            cardSelectionComplete = false;
            return false;

        } catch (e) {
            cardSelectionComplete = false;
            return false;
        }
    },

    IsCardSelectedInCategory: function (cardId) {
        try {
            var selCards = Session.get('sessionSelectedCards');
            var currentGame = Session.get('currentGame');
            if (selCards.length > 0) {
                var index = $.grep(selCards, function (e) { return e.cardId === cardId; });
                if (index.length !== 0) {
                    //is the card selected in the same category?
                    if (index[0].gameId !== currentGame.Id) {
                        return 'myActiveCard';
                    }
                }
            }
            return '';
        } catch (e) {

        }
    },
    IsCardSelected: function (cardId) {
        try {
            // var control = $(this.CardId);
            // var selCards = Session.get('sessionSelectedCards');
            // var index = $.grep(selCards, function (e) { return e.cardId === cardId; });
            // if (index.length === 0)
            //     $('#' + cardId).prop('checked', false);
            // else
            //     $('#' + cardId).prop('checked', true);
            // return '';
        } catch (e) {

        }
    },

    GameData: function () {
        var data = Session.get('currentGame');
        if (data) {
            data.Name = data.Name.toUpperCase();
        }
        return data;
    },

    //Track progress
    ProgressPercentage: function () {
        try {
            return ((Session.get('sessionSelectedCards').length / 12) * 100);
        } catch (e) {
            console.clear();
            // console.log(e);
            return 0;
        }
    }
});