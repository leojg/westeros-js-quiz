define(['backbone'], function(Backbone) {

    var User = Backbone.Model.extend({

        fetch: function() {
            var users = localStorage.getItem("users");

            if (users) {
                users = users.split(","); 
                var i = users.indexOf(this.get("userName"));

                if (i != -1) {
                    return users[i];
                }
            }        
        },

        save: function() {
            var users = localStorage.getItem("users");

            if (users) {
                users = users.split(","); 
                users.push(this.get("userName"));
            } else {
                users = [this.get("userName")];
            }

            localStorage.setItem("users",users);        
        }
    });
    
    return User;
    
});