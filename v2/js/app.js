$(document).ready(function() {
        
        loadQuiz(getNextQuestion);
        
        var btnNext = this.querySelector('#btn-next');
        btnNext.addEventListener('click', handleNextClick);    
    
        var btnBack = this.querySelector('#btn-back');
        btnBack.addEventListener('click', handleBackClick)
    
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

























