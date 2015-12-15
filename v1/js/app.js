//quiz object declaration

var quiz = {};

quiz.questions = [
    {
        question: "The Westerosi capital population is:",
        answers: [
            "half a millon",
            "a quarter of a millon",
            "seven hundred thousands"
        ],
        solution: 0
    },
    {
        question: "The number of The Free Cities is:",
        answers: [
            "seven",
            "eigth",
            "nine"
        ],
        solution: 2
    },
    {
        question: "The heigth of the wall is:",
        answers: [
            "a thousand feets",
            "seven hundred feets",
            "three hundred feets"
        ],
        solution: 1
    }];

quiz.title = "A world of ice and fire numbers";

quiz.currentQuestion = -1;
quiz.correctAnswers = 0;

//utilitary functions

function hasClass(el, cssClass) {
    for (i = 0; i < el.classList.length; i++) {
        if (cssClass === el.classList[i]) {
            return true;
        }
    }
    return false;
}

// business logic functions.

function checkAnswer(answer, qindex) {
   
    var question = quiz.questions[qindex];
    
    if (answer == question.solution) {
        return true;
    }
    
    return false;
}

function handleClick() {
    var form = document.forms[0];
    var checkedAnswer;

    for (i = 0; i < form.elements.answer.length; i++) {
        var answer = form.elements.answer[i];

        if (answer.checked === true) {
            if (checkAnswer(answer.value, quiz.currentQuestion)) {
                quiz.correctAnswers += 1;
            }
            getNextQuestion();
            break;
        }
    }        
}

function renderQuestion(questionDiv,questionData) {
    var questionTitle = document.createElement('h2');
    questionTitle.appendChild(document.createTextNode(questionData.question));
    
    questionDiv.appendChild(questionTitle);
    
    for (i = 0; i < questionData.answers.length; i++) {
        
        var answer = questionData.answers[i];
        
        var answerBox = document.createElement('div');
        
        var radio = document.createElement('input');
        radio.setAttribute('type','radio');
        radio.setAttribute('name','answer');
        radio.setAttribute('value',i);
        
        radio.addEventListener('click', function clickEventListenerHandler() {
         
            var btnNext = document.getElementById('btn-next');
            btnNext.disabled = false;
            
            this.removeEventListener('click', clickEventListenerHandler);
        })
        
        var answerText = document.createElement('p');
        answerText.appendChild(document.createTextNode(answer));
        
        answerBox.appendChild(radio);
        answerBox.appendChild(answerText);
        
        questionDiv.appendChild(answerBox);
        
    }    
}

function getNextQuestion() {

        var questionsBox = document.getElementById('questions-box');
        
        questionsBox.innerHTML = "";
    
        quiz.currentQuestion += 1;
    
        if (quiz.currentQuestion < quiz.questions.length) {

            var btnNext = document.getElementById('btn-next');
            renderQuestion(questionsBox, quiz.questions[quiz.currentQuestion]);
            btnNext.disabled = true;            

        } else {
            showSummaryScreen();   
        }

            
    
}

function showSummaryScreen() {
    var container = document.querySelector('#container');
    
    container.innerHTML = "";
    
    var result = quiz.correctAnswers / quiz.questions.length;
    
    var summaryTitle;
    
    if (result == 1) {
        summaryTitle = document.createTextNode("Congratulations! Your knowlledge of the world put most of the schollars and maesters to shame!");    
    } else if (result >  0.75) {
        summaryTitle = document.createTextNode("Excelent! You got "+quiz.correctAnswers+" out of "+quiz.questions.length+" questions. You should visit the citadel, if you have not do so, to improve even more!");        
    } else if (result > 0.5) {
        summaryTitle = document.createTextNode("Well enougth! you got "+quiz.correctAnswers+" out of "+quiz.questions.length+" questions. A maester would do better, but for a chainless man this result is good");        
    } else {
        summaryTitle = document.createTextNode("Clearly you do better with a sword than with numbers and facts! You got "+quiz.correctAnswers+" out of "+quiz.questions.length+" questions.");                   
    }
    
    container.appendChild(summaryTitle);
    
    
}

// Events declarations

document.addEventListener('DOMContentLoaded', function() {

        var title = document.getElementById('title');
        title.appendChild(document.createTextNode(quiz.title));
    
        getNextQuestion();
    
        var btnNext = this.getElementById('btn-next');
        btnNext.addEventListener('click', handleClick);    
    
})



























