function handleNextClick() {
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

function handleBackClick() {
    if (quiz.currentQuestion < 1) {
        //its the first question. Should do nothing
        return;    
    } else {
        
        quiz.currentQuestion -= 1
        
        var previousQuestion = getStoredQuestion(quiz.currentQuestion);
        
        if (previousQuestion) {
            
        } else {
            //should handle this?   
        }
    }
}

function renderQuestion(questionDiv, questionData, defaultValue) {
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
        });
        
        radio.addEventListener('click', function() {
            var selectedValue = this.value;
            sessionStorage.setItem(quiz.currentQuestion, selectedValue);
        });
        
        if (defaultValue && i == defaultValue) {
            radio.checked = true;   
        }
        
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

function getStoredQuestion(qid) {
    var qAnswer = sessionStorage.getItem(qid);
    
    if (qAnswer) {
        var questionsBox = document.getElementById('questions-box');       
        questionsBox.innerHTML = "";    

        if (quiz.currentQuestion < quiz.questions.length) {

            var btnNext = document.getElementById('btn-next');
            btnNext.disabled = false;
            
            renderQuestion(questionsBox, quiz.questions[quiz.currentQuestion], qAnswer);

        } else {
            showSummaryScreen();   
        }            
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