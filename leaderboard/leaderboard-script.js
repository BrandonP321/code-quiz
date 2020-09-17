var leadersListEle = $('.ranks-list')
var userScoreEle = $('.user-score')
var usernameInput = $('.username-input')
var addScoreBtn = $('.add-score-btn')
var recentScore = localStorage.getItem('recentUserScore')
var rankings = []
var sortedRanks;

function displayRanks() {
    rankings = []
    sortedRanks = []
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
    console.log(rankings)
    leadersListEle.empty();
    // sort and iterate through list of player scores and print them to leaderboard
    sortedRanks = rankings.sort(([a, b], [c, d]) => c - a || b - d)
    console.log(sortedRanks)
    for (var i = 0; i < sortedRanks.length; i++) {
        leadersListEle.append(`<li>${sortedRanks[i][1]}: ${sortedRanks[i][0]}%</li>`)
    }
}

// display user's recent score on screen
function displayRecentScore() {
    if (recentScore !== 'none') {
        $('.add-score-div').css('display', 'block')
        console.log('recent score: ' + recentScore)
        userScoreEle.text(recentScore + '%')
    }
}

// allow user to add their recent score to the leaderboard
function addUserScore() {
    var username = usernameInput.val()
    localStorage.setItem(username, recentScore)
    leadersListEle.empty();
    displayRanks();
    $('.add-score-div').css('display', 'none')
    localStorage.setItem('recentUserScore', 'none')
}

localStorage.setItem('Beanman321', 40)
localStorage.setItem('gooseman310', 80)
localStorage.setItem('johnny', 20)

addScoreBtn.on('click', function() {
    addUserScore();
    usernameInput.val('')
})

usernameInput.on('keydown', function(event) {
    if (event.keyCode == 13) {
        addUserScore();
        usernameInput.val('')
    }
})

displayRanks();
displayRecentScore();

// when the user leaves the page, set their recent score in storage back to none
window.onbeforeunload = function() {
    localStorage.setItem('recentUserScore', 'none')
}