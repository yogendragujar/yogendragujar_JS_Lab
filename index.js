function Question(text, choices, answer) {
    this.answer = answer;
    this.choices = choices;
    this.text = text;
}

Question.prototype.isCorrectAnswer = function(choice){
    return this.answer == choice;
}

//Create questions
var questions = [
    new Question("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];

function Quiz() {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function(){
    return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function(){
    return this.questionIndex === this.questions.length;
}

Quiz.prototype.checkOptionsWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.checkOptionsWithAnswer(choice);
        loadQuestions();
    }
}


function loadQuestions() {
    if (quiz.isEnded()) {
        showscores();
    } else {
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByIndex().text

        var choices = quiz.getQuestionByIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            var ele = document.getElementById("choice" + i);
            ele.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }
        //showing progress
        showProgress();
        
    }


}

function showProgress(){
    var element = document.getElementById("progress");
    element.innerHTML = "Question "+(quiz.questionIndex+1)+" of "+quiz.questions.length;

}

function showscores(){
    var gameOverHTML = "<h1>Result<h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + ". Your percentage is :"+ (quiz.score/questions.length*100) +"% </h2>";
    var e = document.getElementById("quiz");
    e.innerHTML = gameOverHTML;
  }


var quiz = new Quiz(questions);

// display quiz
loadQuestions();
