//implement commonjs style object model


function loadQuiz(callback) {
    
    $.getJSON("../resources/quiz.json", function(data) {
        
        quiz = data;
        quiz.title = "A world of ice and fire numbers";
        quiz.currentQuestion = -1;
        quiz.correctAnswers = 0;
        
        var title = document.getElementById('title');
        title.appendChild(document.createTextNode(quiz.title));
        
        callback();


    });
    
}

function checkAnswer(answer, qindex) {
   
    var question = quiz.questions[qindex];
    
    if (answer == question.solution) {
        return true;
    }
    
    return false;
}
