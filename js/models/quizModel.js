define(['backbone'], function(Backbone) {

    var Quiz = Backbone.Model.extend({
        url: "../resources/quiz.json", 
        
        checkAnswer: function(answer) {
   
            var question = this.attributes.questions[this.attributes.currentQuestion];

            if (answer == question.solution) {
                return true;
            }

            return false;
            
        }
    
    });

    return Quiz;
    
});