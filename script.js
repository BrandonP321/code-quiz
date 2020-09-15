var questions = {
    1: {
        question: "What is 2+2?",
        choices: ['fish', '22', '4', '7'],
        correct: '4',
        answer: false
    },
    2: {
        question: "If my birthday is the twenty-first of July and I was born in the year 2000, how old am I?",
        choices: ['15', '67', "Don't know don't care", '20'],
        correct: '20',
        answer: false
    },
    3: {
        question: "If I have 27 pancakes, I'm 6 feet tall, and the Earth has a circumference of 24,901 miles, what is the color of my hair?",
        choices: ['blue', 'blonde', 'syrup', 'brown'],
        correct: 'blonde',
        answer: false
    },
    4: {
        question: "What was Albert Einstein's middle name?",
        choices: ["He didn't have one", "Lukas", "Finn", "Niclas"],
        correct: "He didn't have one",
        answer: false
    },
    5: {
        question: "What is my name?",
        choices: ["Robert", "Downey", "Junior", "Brandon"],
        correct: "Brandon",
        answer: false
    }
}

var questionBox = document.querySelector('.content')
var startQuizBtn = document.querySelector('.start-quiz-button')
var questionNum = document.querySelector('.question-number')
var questionText = document.querySelector('.question-text')
var choicesForm = document.querySelector('form')
var choicesList = document.querySelector('.choices-list')
var choicesItem = document.querySelector('li')
var nextBtn = document.querySelector('.nextBtn')
var prevBtn = document.querySelector('.previousBtn')
var alphabet = 'abcdefghijklmnopqrstuvwxyz'
var currentQuestion = 1;
var errorCount = 0;

function submitResults() {
    
}

function showQuestion(question) {
    // reset list of choices to nothing
    choicesList.innerHTML = ''

    questionNum.textContent = question + '.';
    questionText.textContent = questions[question]['question']

    for (var i = 0; i < 4; i++) {
        var questionChoiceItem = document.createElement('li')
        var choiceItemValue = questions[question]['choices'][i]
        var insideHTML = `<label for='${alphabet[i]}'>${choiceItemValue}</label><input id='${alphabet[i]}' type='radio' name='question${currentQuestion}' value='${choiceItemValue}'>`
        questionChoiceItem.innerHTML = insideHTML;
        choicesList.appendChild(questionChoiceItem)
    }

    if (questions[currentQuestion]['answer']) {
        // var chosenIndex = questions[currentQuestion]['choices'].indexOf(questions[currentQuestion]['answer'])
        // var radioList = document.getElementsByTagName('input')
        // radioList[chosenIndex].checked = true;
        var radioId = alphabet[questions[question]['choices'].indexOf(questions[question]['answer'])]
        var radioToCheck = document.querySelector(`#${radioId}`)
        radioToCheck.checked = true;
    }
}

function checkForAnswer() {
    var radioList = document.getElementsByTagName('input')
    for (var i = 0; i < 4; i++) {
        if (radioList[i].type == 'radio' && radioList[i].checked) {
            return radioList[i].value
        }
    }
    return false
}

function nextQuestion() {
    if (checkForAnswer()) {
        questions[currentQuestion]['answer'] = checkForAnswer();
    }

    if (currentQuestion < 4){
        currentQuestion++
        showQuestion(currentQuestion)
    } else if (currentQuestion == 4) {
        currentQuestion++
        showQuestion(currentQuestion)
        nextBtn.textContent = 'Submit'
    } else {
        submitResults()
    }
}

function prevQuestion() {
    if (checkForAnswer()) {
        questions[currentQuestion]['answer'] = checkForAnswer();
    }

    if (currentQuestion != 1 && currentQuestion < 5) {
        currentQuestion--
        showQuestion(currentQuestion);
    } else if (currentQuestion == 5) {
        currentQuestion--
        showQuestion(currentQuestion);
        nextBtn.textContent = 'next'
    }
}

function beginQuiz() {
    // current fix for bug of loading twice
    // if (errorCount == 0) {
    //     errorCount++
    //     return null
    // }

    startQuizBtn.style.display = 'none';
    questionNum.style.display = 'block';
    questionText.style.display = 'block';
    choicesForm.style.display = 'block';
    nextBtn.style.display = 'inline';
    prevBtn.style.display = 'inline';

    showQuestion(1)
}

// currently using onclick in html until problem is solved
// startQuizBtn.addEventListener('click', beginQuiz)
// nextBtn.addEventListener('click', nextQuestion)
// prevBtn.addEventListener('click', prevQuestion)
