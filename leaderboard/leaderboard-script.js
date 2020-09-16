var leadersListEle = $('.ranks-list')
var rankings = []

function storeRanks() {
    for (var i = 0; i < localStorage.length; i++) {
        var scoreToDisplay = localStorage.getItem(localStorage.key(i))
        var userToDisplay = localStorage.key(i)
        if (userToDisplay != 'recentUserScore') {
            leadersListEle.append(`<li>${userToDisplay}: ${scoreToDisplay}</li>`)
        }
    }
}

localStorage.setItem('brp321', 35)
localStorage.setItem('brandon', 30)
localStorage.setItem('theman', 20)

storeRanks();