// created reference points for elements on page
var leadersListEle = $('.ranks-list')
var userScoreEle = $('.user-score')
var usernameInput = $('.username-input')
var addScoreBtn = $('.add-score-btn')
// store the user's recent quiz score
var recentScore = localStorage.getItem('recentUserScore')
var rankings = []
var sortedRanks;

// take each user score in local storage and display them on screen
function displayRanks() {
    // reset arrays that store user scores
    rankings = []
    sortedRanks = []
    // for each user in storage...
    for (var i = 0; i < localStorage.length; i++) {
        // retrieve score of player key(i) in local storage
        var scoreToDisplay = localStorage.getItem(localStorage.key(i))
        // retrieve name of player i in local storage
        var userToDisplay = localStorage.key(i)
        // if the user score isn't the player's recent score from the quiz, append it to the on page list
        if (userToDisplay != 'recentUserScore') {
            // leadersListEle.append(`<li>${userToDisplay}: ${scoreToDisplay}</li>`)
            rankings.push([parseInt(scoreToDisplay), userToDisplay])
        }
    }

    // empty leaderboard element before appending scores again
    leadersListEle.empty();
    // sort and iterate through list of player scores and print them to leaderboard
    sortedRanks = rankings.sort(([a, b], [c, d]) => c - a || b - d)
    for (var i = 0; i < sortedRanks.length; i++) {
        leadersListEle.append(`<li>${sortedRanks[i][1]}: ${sortedRanks[i][0]}%</li>`)
    }
}

// display user's recent score on screen
function displayRecentScore() {
    // check to make sure the user has actually gone through the quiz
    if (recentScore !== 'none') {
        // make the div containing score and user input visible on screen
        $('.add-score-div').css('display', 'block')
        // display the user's recent score
        userScoreEle.text(recentScore + '%')
    }
}

// allow user to add their recent score to the leaderboard
function addUserScore() {
    // store the user's given username
    var username = usernameInput.val()
    // add the user's score and username to local storage
    localStorage.setItem(username, recentScore)
    // clear the leader board and then append all user scores and usernames
    leadersListEle.empty();
    displayRanks();
    // make the div allowing user input invisible
    $('.add-score-div').css('display', 'none')
    // reset the user's recent score in local storage to 0
    localStorage.setItem('recentUserScore', 'none')
}

// random users and scores to populate leaderboard
localStorage.setItem('Beanman321', 40)
localStorage.setItem('gooseman310', 80)
localStorage.setItem('johnny', 20)

// when user clicks button to add score to leaderboard, add their score and clear the input field
addScoreBtn.on('click', function() {
    addUserScore();
    usernameInput.val('')
})

// also allow user to press enter to add score and clear input field
usernameInput.on('keydown', function(event) {
    if (event.keyCode == 13) {
        addUserScore();
        usernameInput.val('')
    }
})

// initially display all current user scores and try to retrieve user's recent score
displayRanks();
displayRecentScore();

// when the user leaves the page, set their recent score in storage back to none
window.onbeforeunload = function() {
    localStorage.setItem('recentUserScore', 'none')
}