define(["underscore","backbone","text!templates/summary.html"],
       function(_, Backbone, summaryTemplate) {

    var SummaryView = Backbone.View.extend({

        el: "#container",

        initialize: function() {
            this.render();
        },
        
        render: function() {
        

                var correctAnswers = this.model.get("correctAnswers");
                var questionsLength = this.model.get("questions").length;

                var result =  correctAnswers / questionsLength;

                var summaryTitle;


                if (result == 1) {
                    summaryTitle = "Congratulations! Your knowlledge of the world put most of the schollars and maesters to shame!";    
                } else if (result >  0.75) {
                    summaryTitle = "Excelent! You got "+correctAnswers+" out of "+questionsLength+" questions. You should visit the citadel, if you have not do so, to improve even more!";        
                } else if (result > 0.5) {
                    summaryTitle = "Well enougth! you got "+correctAnswers+" out of "+questionsLength+" questions. A maester would do better, but for a chainless man this result is good";        
                } else {
                    summaryTitle = "Clearly you do better with a sword than with numbers and facts! You got "+correctAnswers+" out of "+questionsLength+" questions.";                   
                }
            
                var template = _.template(summaryTemplate)({resultText:summaryTitle});        
                this.$el.html(template);
        }

    });
    
    return SummaryView;
    
});