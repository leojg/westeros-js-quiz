function renderLoginView() {
    $("#container").empty();
    $("#container").load("../resources/templates/login.html", function() {
        var form = document.querySelector("#login-form");
        form.addEventListener('submit',handleFormSubmit);
        
    });
}

function handleFormSubmit(event) {
    
    event.preventDefault();
    
    var userName = $(this).children("#txt-username").val();
    
    if (userName) {
        logInWithUser(userName);
    }
    
}