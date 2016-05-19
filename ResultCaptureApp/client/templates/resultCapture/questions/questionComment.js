var currentQuestion = undefined;

Template.questionComment.rendered = function () {

    if (!this.rendered) {
        this.rendered = true;
    }
};

Template.questionComment.helpers({
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

Template.questionComment.events({
    'click #nextBtn': function (event) {
        for(var k in NewGame.Questions){
            if(NewGame.Questions[k].QuestionId === Router.current().params._id){
                NewGame.Questions[k].Comment = $('#commentText').val();
                break;
            }
        }
            
        if (nextQuestionAvailable(Router.current().params._id)){
            Router.go('/questionCategory/' + (++Router.current().params._id));
        }else{
            postFullScore();
        }
    },
    //skip button click
    'click #skipBtn': function (event) {
        // get the current question
        if (currentQuestion) {
            if (nextQuestionAvailable(Router.current().params._id)) {
                Router.go('/questionCategory/' + (++Router.current().params._id));
            } else {
                postFullScore();
            }
        }
    },
});