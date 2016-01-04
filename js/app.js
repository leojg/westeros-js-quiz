requirejs.config({
    paths: {
        templates: '../resources/templates',
        jquery: 'libs/jquery',
        backbone: 'libs/backbone',
        underscore: 'libs/underscore',
        text: 'libs/text',
        bootstrap: 'libs/bootstrap'
    }
});

requirejs(['jquery','views/quizView','views/userView','models/quizModel','models/userModel','views/summaryView'], function($, QuizView, UserView, Quiz, User, SummaryView) {

    $(document).ready(function() {        
        if (sessionStorage.getItem("currentUser")) {
            var quizView = new QuizView({model: new Quiz()});    
        } else {
            var userView = new UserView();
        }
    });

  

    //utilitary functions

    function hasClass(el, cssClass) {
        for (i = 0; i < el.classList.length; i++) {
            if (cssClass === el.classList[i]) {
                return true;
            }
        }
        return false;
    }

});




















