function saveUser(name) {
    var users = localStorage.getItem("users");
    
    if (users) {
        users = users.split(","); 
        users.push(name);
    } else {
        users = [name];
    }
    
    localStorage.setItem("users",users);
}

function getUser(name) {
    var users = localStorage.getItem("users");
    
    if (users) {
        users = users.split(","); 
        var i = users.indexOf(name);
        
        if (i != -1) {
            return users[i];
        }
    }
}