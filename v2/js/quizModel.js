//implement commonjs style object model

var quiz = {
    
    title: "",
    currentQuestion: -1,
    correctAnswers: 0,
    questions: [],

    
    load: function(callback) {
        
        var self = this;
        
        $.getJSON("../resources/questions.json", function(data) {
            self.questions = data;
            callback();
        });

    },

    checkAnswer: function(answer, qindex) {

        var question = this.questions[qindex];

        if (answer == question.solution) {
            return true;
        }

        return false;
    }

}