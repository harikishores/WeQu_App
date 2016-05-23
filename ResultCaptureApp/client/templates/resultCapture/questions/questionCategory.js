var currentQuestion = undefined;
var selectedCards = [];
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
Questions.sort(predicateBy('QuestionId'));

Template.questionCategory.rendered = function () {
    //Session.setDefault('currentQuestion',Questions[Router.current().params._id])
    selectedCards = [];
    if (!this.rendered) {
        this.rendered = true;
    }
}

Template.questionCategory.helpers({
    CardData: function () {
        return CardData;
    },
    Question: function () {
        var questionId = Router.current().params._id;
        if (questionId && Questions) {
            var data = $.grep(Questions, function (e) {
                return e.QuestionId == questionId;
            });
            if (data.length > 0) {
                if (data[0].Head.indexOf('{{playername}}') !== -1) {
                    data[0].Head = data[0].Head.replace('{{playername}}', 'Soham Gupta');
                }
                currentQuestion = data[0];
                return data[0];
            }
        }
        return;
    }
});

Template.questionCategory.events({
    'click #nextBtn': function (event) {
        debugger;
        // var selectedCards = Session.get('sessionSelectedCards');
        if (selectedCards.length > 0) {
            
            //check if already updated
            var updatedData = $.grep(NewGame.Questions, function (e) {
                return e.QuestionId == currentQuestion.QuestionId;
            })

            if (updatedData.length === 0) {
                //update the result
                NewGame.Questions.push({
                    QuestionId: currentQuestion.QuestionId,
                    IsPositiveEssence : currentQuestion.currentQuestion,
                    SelectedCards: selectedCards,
                    Comment: ''
                });
                //update result ends   
            }

            if (currentQuestion.Commentable) {
                Router.go('/questionComment/' + Router.current().params._id);
            } else {
                if (nextQuestionAvailable(Router.current().params._id)) {
                    Router.go('/questionCategory/' + (++Router.current().params._id));
                } else {
                    postFullScore();
                }
            }
        } else {
            alert('Please select at least one card to move forward or skip the question');
        }
    },
    //skip button click
    'click #skipBtn': function (event) {
        //get the current question
        debugger;
        if (currentQuestion) {
            if (nextQuestionAvailable(Router.current().params._id)) {
                Router.go('/questionCategory/' + (++Router.current().params._id));
            } else {
                postFullScore();
            }
        }
    },

    'change .cardRadio': function (event) {
        event.preventDefault();
        debugger;
        var valueUdpate = $(event.target).val();//value to be updated
        var valueChecked = false; //is the element checked
        var valueExists = false; // does the eleement value exists in the array of selected cards of the current game index?
        var valueIndex = selectedCards.indexOf(valueUdpate); //-1 indicates not in any index.
        if ($(event.target).is(':checked')) { valueChecked = true; }

        if (valueIndex !== -1) {
            valueExists = true;
        }

        if (valueChecked && !valueExists && selectedCards.length < 24) { //if value is checked and does not exists in the array of selected Cards.
            selectedCards.push(valueUdpate);
            return;
        }

        if (!valueChecked && valueExists) { //if the value is not checked but exists in the array of selected cards.
            selectedCards.splice(valueIndex, 1);
            return;
        }
        //update the score to the list
        //updateScore(categoryIndex, gameIndex);
    }
});