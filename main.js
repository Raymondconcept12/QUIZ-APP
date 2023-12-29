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
        question: "From which language is the word 'ketchup' derived?",
        answer: [

            { text: "Chinese", correct: true},
            { text: "African", correct: false},
            { text: "English", correct: false},
            { text: "French", correct: false}
        ]
    }, 

    {
        question: "Which country has the biggest population in Europe?",
        answer: [

            { text: "Nigeria", correct: false},
            { text: "Russia", correct: true},
            { text: "Italy", correct: false},
            { text: "Estonia", correct: false}
        ]
    }, 

    {
        question: "Who portrayed Edward Scissorhands?",
        answer: [

            { text: "Johnny Sin", correct: false},
            { text: "Williams brat", correct: false},
            { text: "John Cena", correct: false},
            { text: "Johnny Depp", correct: true}
        ]
    } ,

    {
        question: "What are made and repaired by a cobbler?",
        answer: [

            { text: "Umbrella", correct: false},
            { text: "Shoe", correct: true},
            { text: "Corps", correct: false},
            { text: "Stone", correct: false}
        ]
    } ,

    {
        question: "What color are the four stars on the flag of New Zealand?",
        answer: [

            { text: "White", correct: false},
            { text: "Blue", correct: false},
            { text: "Green", correct: false},
            { text: "Red", correct: true}
        ]
    } ,

    {
        question: "How many states make up the United States of America?",
        answer: [

            { text: "50", correct: true},
            { text: "45", correct: false},
            { text: "20", correct: false},
            { text: "36", correct: false}
        ]
    } ,

    {
        question: "Which English king married six times?",
        answer: [

            { text: "John Lackland", correct: false},
            { text: "Henry VIII", correct: true},
            { text: "Edward VIII", correct: false},
            { text: "Elizabeth I", correct: false}
        ]
    } ,

    {
        question: "H2O is the chemical formula for what?",
        answer: [

            { text: "Cement", correct: false},
            { text: "Acid", correct: false},
            { text: "Water", correct: true},
            { text: "Sand", correct: false}
        ]
    } ,

    {
        question: "What has a face and two hands, but no arms or leg?",
        answer: [

            { text: "Tree", correct: false},
            { text: "Humans", correct: false},
            { text: "Snake", correct: false},
            { text: "Clock", correct: true}
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
