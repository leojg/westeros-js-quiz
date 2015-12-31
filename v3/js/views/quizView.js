define(['underscore', 'backbone', 'models/quizModel','text!/resources/templates/quiz.html', 'views/summaryView'], 
       function(_, Backbone, Quiz, quizTemplate, SummaryView) {
    
    var QuizView = Backbone.View.extend({
        
        el: "#container",
        
        initialize: function() {
            
            var self = this;
            
            this.model.fetch({
                success: function() {
                    self.render();
                },
                error: function() {
                    console.log(arguments);
                }
            });
        },

        events: {
            'click #btn-next': 'handleNextClick',
            'click #btn-back': 'handleBackClick',
            'click input[type=radio]': 'handleRadioClick'
        },

        render: function() {

            var template = _.template(quizTemplate);
            this.$el.html(template);

            var title = $(this.$el).find('#title');

            var titleStr = "Welcome " + sessionStorage.getItem("currentUser") + " to a world of ice and fire in numbers"
            $(title).text(titleStr);
            var quiz = new Quiz();

            this.getNextQuestion();

        },

        getNextQuestion: function() {
            var questionsBox = $(this.$el).find('#questions-box');       
            $(questionsBox).empty();


            var currentQuestion = this.model.get("currentQuestion") + 1;

            this.model.set({"currentQuestion": currentQuestion});

            var questions = this.model.get("questions");

            if (currentQuestion < questions.length) {

                $(this.$el).find('#btn-next').prop("disabled",true);
                this.renderQuestion(questionsBox, questions[currentQuestion]);

            } else {
                new SummaryView({model: this.model});   
            }
        },

        // this could be another view
        renderQuestion: function(questionDiv, questionData, defaultValue) {
                        
            var questionTitle = document.createElement('h2');
            questionTitle.appendChild(document.createTextNode(questionData.question));

            $(questionDiv).append(questionTitle);

            for (i = 0; i < questionData.answers.length; i++) {

                var answer = questionData.answers[i];

                var answerBox = document.createElement('div');

                var radio = document.createElement('input');
                radio.setAttribute('type','radio');
                radio.setAttribute('name','answer');
                radio.setAttribute('value',i);

                if (defaultValue && i == defaultValue) {
                    radio.checked = true;   
                }

                var answerText = document.createElement('p');
                answerText.appendChild(document.createTextNode(answer));

                answerBox.appendChild(radio);
                answerBox.appendChild(answerText);

                $(questionDiv).append(answerBox);

            }    
        },

        handleNextClick: function() {
            var formDataArr = $(this.$el).find("form:first").serializeArray();
            var checkedAnswer;           
            var answer = (formDataArr[0].name == "answer") ? formDataArr[0].value : undefined; 

            if (answer) {
                if (this.model.checkAnswer(answer)) {
                    this.model.set("correctAnswers",this.model.attributes.correctAnswers + 1);                
                }
                this.getNextQuestion();
            }        
        },

        handleBackClick: function() {
            var currentQuestion = this.model.get("currentQuestion");    

            if (this.model.get("currentQuestion") < 1) {
                //its the first question. Should do nothing
                return;    
            } else {            
                currentQuestion -= 1;                                                    
                this.model.set("currentQuestion", currentQuestion)
                getStoredQuestion(currentQuestion);
            }
        },
            
        handleRadioClick: function() {
            $(this.$el).find('#btn-next:disabled').prop("disabled",false);
                        
            var selectedValue = this.value;
            sessionStorage.setItem(this.model.get("currentQuestion"), selectedValue);            
        
        },

        showSummaryScreen: function() {


        }


    });

    return QuizView;

});