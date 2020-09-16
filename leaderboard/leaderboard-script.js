var rankings = []

function storeRanks() {
    for (var i = 0; i < localStorage.length; i++) {
        if (user != 'recentUserScore') {
            var score = localStorage.getItem(user)
            rankings.push([user, score])
        }
    }
}

localStorage.setItem('brp321', 35)
localStorage.setItem('brandon', 30)
localStorage.setItem('theman', 20)

storeRanks();