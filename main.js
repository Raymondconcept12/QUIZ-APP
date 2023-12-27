let questions = [

    {
        question: "Who is the richest man in the world?",
        answer: [

            { text: "Bill Gates", correct: false},
            { text: "Elon Musk", correct: false},
            { text: "Ugochukwu Raymond", correct: true},
            { text: "Aligo Dangote", correct: false}
        ]
    }, 

    {
        question: "Which of these is not an Africa country?",
        answer: [

            { text: "Nepal", correct: true},
            { text: "Congo", correct: false},
            { text: "Ghana", correct: false},
            { text: "South africa", correct: false}
        ]
    }, 

    {
        question: "Which is the largest animal in the world?",
        answer: [

            { text: "Shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Dragon", correct: false},
            { text: "Elephant", correct: false}
        ]
    }, 

    {
        question: "Which is the smallest continent in the world?",
        answer: [

            { text: "Asia", correct: false},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
            { text: "Australia", correct: true}
        ]
    }


];

let questionElement = document.getElementById("question")
let answerButtons = document.getElementById("answer-buttons")
let nextButton = document.getElementById("next-btn")

let questionIndex = 0;
let score = 0


function startQuiz() {
    questionIndex = 0;
    score = 0
    nextButton.textContent = "Next"
    showQuestion()
}

function showQuestion() {

    resetState();


    let currentQuestion = questions[questionIndex]
    let questionNo = questionIndex + 1
    questionElement.textContent = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        let button = document.createElement("button")
        button.textContent = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button);

        if(answer.correct) {
            button.dataset.correct = answer.correct ;
        }
        button.addEventListener("click" , selectAnswer)
    });
}

function resetState() {
    
   nextButton.style.display = "none"
   while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
   }
}


function selectAnswer(e) {
    
    let selectedBtn = e.target ;
    let isCorrect = selectedBtn.dataset.correct === "true" ;

    if(isCorrect) {
        selectedBtn.classList.add("correct")
        score++
    } else{
        selectedBtn.classList.add("incorrect")
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct")
        }

        button.disabled = "true"
    });

    nextButton.style.display = "block" ;

}

function showScore() {
    resetState()
    questionElement.textContent = `You Scored ${score} out of ${questions.length}! `
    nextButton.textContent = "Play Again"
    nextButton.style.display = "block"
}

function handleNextButton() {
    questionIndex++

    if (questionIndex < questions.length) {
        showQuestion()
    } else {
        showScore() ;
    }
}

nextButton.addEventListener("click" , ()=> {
    if (questionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})

startQuiz() ;
