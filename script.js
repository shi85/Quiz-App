const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const nextButton = document.getElementById('next-btn')
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions , currentQuestionIndex;

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion() } )

function startGame() {
    console.log('start');
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    reserState() 
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')

        if (answer.correct) {
            button.dataset.correct = answer.correct 
        }

        button.addEventListener('click' , selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function reserState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
}

function setStatusClass(element , correct ) {
    clearStatusClass(element) 
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 4 + 4?' ,
        answers: [
            {text: '8' , correct: true},
            {text: '44' , correct: false}    
        ]
    },


{
    question: 'What is 2 * 5?' ,
    answers: [
        {text: '25' , correct: false},
        {text: '10' , correct: true}    
    ]
},

{
    question: 'What is Javascript?' ,
    answers: [
        {text: 'It is an scripting language' , correct: true},
        {text: 'It is an strongly typed language' , correct: false},
        {text: 'javascript objects are class based' , correct: false},
        {text: 'Javascript uses less memory' , correct: true}

    ]
}
]

