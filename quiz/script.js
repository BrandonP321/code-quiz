// object containing question, choices, correct choice, and the chosen answer
var questions = {
    1: {
        question: "What is 2+2?",
        choices: ['fish', '22', '4', '7'],
        correct: '4',
        answer: false
    },
    2: {
        question: "If my birthday is the twenty-first of July and I was born in the year 2000, how old am I?",
        choices: ['15', '67', "Why would I care", '20'],
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
        choices: ["He has no middle name", "Lukas", "Finn", "Niclas"],
        correct: "He has no middle name",
        answer: false
    },
    5: {
        question: "What is my name?",
        choices: ["Robert", "Downey", "Junior", "Brandon"],
        correct: "Brandon",
        answer: false
    }
}

// intitialize all global variables with jQuery formatting
var questionBox = $('.content')
var startQuizBtn = $('.start-quiz-button')
var questionNum = $('.question-number')
var questionText = $('.question-text')
var choicesForm = $('form')
var choicesList = $('.choices-list')
var choicseItem = $('li')
var nextBtn = $('.nextBtn')
var prevBtn = $('.previousBtn')
var alphabet = 'abcdefghijklmnopqrstuvwxyz'
var currentQuestion = 1;
var errorCount = 0;

// determine results and store them in local storage for submition
function submitResults() {
    // determine score
    var totalCorrect = 0;
    for (var i = 1; i <= 5; i++) {
        var questionUserChoice = questions[i]['answer']
        var questionCorrectChoice = questions[i]['correct']
        if (questionUserChoice == questionCorrectChoice) {
            totalCorrect += 1;
        }
    }
    var userScore = totalCorrect / 5

    // store score in localStorage
    localStorage.setItem('recentUserScore', userScore)

    window.location.href = '../leaderboard/leaderboard.html'
}

function showQuestion(question) {
    // reset list of choices to nothing
    choicesList.html('')

    // set text of question number and question text
    questionNum.text(question + '.')
    questionText.text(questions[question]['question'])

    // iterate through each question choice and add it to the page
    for (var i = 0; i < 4; i++) {
        // since element id can't be a number, id will be set to the it's relative index in the alphabet
        var itemLetter = alphabet[i]
        // value of choice to be displayed
        var choiceItemValue = questions[question]['choices'][i]
        // label and input elements for list item will each be stored in their own variable
        var itemLabel = `<label for='${itemLetter}'>${choiceItemValue}</label>`
        var itemInput = `<input id='${itemLetter}' type='radio' name='question${currentQuestion}' value='${choiceItemValue}'>`

        // concatenate label and input with <li> tags
        var itemhtml = "<li>" + itemLabel + itemInput + "</li>"
        // appent list item choice to page
        choicesList.append(itemhtml)
    }

    // if user has already answered question, check radio on load
    if (questions[currentQuestion]['answer']) {
        console.log('has answer')
        // retrieve alphabet letter relative to index of the chosen question choice
        var radioId = alphabet[questions[question]['choices'].indexOf(questions[question]['answer'])]
        // select and check the answer previously chosen by the user
        var radioToCheck = document.querySelector(`#${radioId}`)
        radioToCheck.checked = true;
    }
}

// check if the user has chosen one the available choices
function checkForAnswer() {
    // retrieve list of all radio buttons currently on screen
    var radioList = document.getElementsByTagName('input')
    // iterate through radios until checked radio is found and return value
    for (var i = 0; i < 4; i++) {
        if (radioList[i].type == 'radio' && radioList[i].checked) {
            return radioList[i].value
        }
    }
    // if no radio is checked, return false
    return false
}

function nextQuestion() {
    // check if the user has chosen any of the available choices
    if (checkForAnswer()) {
        // if they have chosen a choice, set the question's answer to the chosen choice
        questions[currentQuestion]['answer'] = checkForAnswer();
    }

    // run normally, but if on the last question, change button text to 'submit'
    if (currentQuestion < 4){
        currentQuestion++
        showQuestion(currentQuestion)
    } else if (currentQuestion == 4) {
        // if on 2nd to last question and user clicks next, change button text to submit
        currentQuestion++
        showQuestion(currentQuestion)
        nextBtn.text("Submit")
    } else {
        // if user click's next('submit') button on last question, go to results
        submitResults()
    }
}

// button to render elements for previous question, won't run if on first question
function prevQuestion() {
    // check if the user has chosen any of the available choices
    if (checkForAnswer()) {
        // if they have chosen a choice, set the question's answer to the chosen choice
        questions[currentQuestion]['answer'] = checkForAnswer();
    }

    // only run if user is not on the first question
    if (currentQuestion != 1 && currentQuestion < 5) {
        currentQuestion--
        showQuestion(currentQuestion);
    } else if (currentQuestion == 5) {
        // if user is on last question and goes back 1, change text of submit button back to 'next'
        currentQuestion--
        showQuestion(currentQuestion);
        nextBtn.text('next')
    }
}

// function to fade in elements of quiz
function beginQuiz() {
    // fade out button to start the quiz
    startQuizBtn.animate({opacity: 0}, 1000)

    // wait one second before continuing to allow button animation to finish
    setTimeout(function() {
        // change displays of button 'start quiz button' and question elements
        startQuizBtn.css('display', 'none')
        questionBox.css('display', 'block')
    
        // show question #1
        showQuestion(1)
        
        //fade in question elements
        questionBox.animate({opacity: 1}, 1000)
    }, 1000)

}

// begin test when user clicks on button
startQuizBtn.on('click', function() {
    beginQuiz();
})