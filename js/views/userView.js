define(['underscore', 'backbone', 'views/quizView', 'models/userModel', 'models/quizModel','text!templates/login.html'], function(_, Backbone, QuizView, User, Quiz, loginTemplate) {

    var UserView = Backbone.View.extend({
        
        el: "#container",

        initialize: function() {
            this.render();
        },

        events: {
            'submit #login-form': 'logIn'
        },

        render: function() {
            var template = _.template(loginTemplate);
            this.$el.html(template);
        },

        logIn: function(event) {

            event.preventDefault();

            var userName = this.$el.find("#txt-username").val();

            if (userName) {
                //sets user to currentuser
                var user = new User({"userName":userName});
                sessionStorage.setItem("currentUser", userName); 

                //If not in localstorage saves it
                if (!user.fetch()) {
                    user.save();
                }

                var quizView = new QuizView({model: new Quiz()});        
            }
        }
    });

    return UserView;
    
});