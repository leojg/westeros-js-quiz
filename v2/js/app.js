$(document).ready(function() {
    if (sessionStorage.getItem("currentUser")) {
        renderQuiz();        
    } else {
        renderLoginView();        
    }
});

function logInWithUser(userName) {
    
    //sets user to currentuser
    sessionStorage.setItem("currentUser", userName); 
    
    //If not in localstorage saves it
    if (!getUser(userName)) {
        saveUser(userName);
    }
    
    renderQuiz();

}

//utilitary functions

function hasClass(el, cssClass) {
    for (i = 0; i < el.classList.length; i++) {
        if (cssClass === el.classList[i]) {
            return true;
        }
    }
    return false;
}






















