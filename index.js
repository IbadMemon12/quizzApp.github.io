const questions = [
 {
    question: "which is the largest animal in the world?",
    answer: [
        { text: "shark", correct: false},
        { text: "blue whale", correct: true},
        { text: "Elephant", correct: false},
        { text: "giraffe", correct: false},

    ]
 },
 {
    question: "which is the smallest country in the world?",
    answer: [
        { text: "vatican city", correct: true},
        { text: "Bhutan", correct: false},
        { text: "Nepal", correct: false},
        { text: "shri Lanka", correct: false},

    ]
 },
 {
    question: "which is the largest desert in the world?",
    answer: [
        { text: "kalahari", correct: false},
        { text: "Gobi", correct: false},
        { text: "sahara", correct: false},
        { text: "Antarctica", correct: true},

    ]
 },
 {
    question: "which is the smallest  continent in the world?",
    answer: [
        { text: "asia", correct: false},
        { text: "Australia", correct: true},
        { text: "arctic", correct: false},
        { text: "Africa", correct: false},

    ]
 }   
];


const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currenQuestionIndex = 0;
score = 0;


function startQuiz(){
    currenQuestionIndex = 0;
    score = 0 ;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currenQuestion = questions[currenQuestionIndex];
    let questionNo = currenQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currenQuestion.question;

    currenQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currenQuestionIndex++;
if(currenQuestionIndex < questions.length){
    showQuestion();
}else{
    showScore();
}
}

nextButton.addEventListener("click", ()=>{
    if(currenQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();
