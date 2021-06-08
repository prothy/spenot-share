const username = getUsernameFromCookie()

if (username) {
    document.querySelector('.header-links').innerHTML = `<span>Welcome, ${username}.</span> <a href='/logout'>Logout</a>`
}

function getUsernameFromCookie() {
    for (let element of document.cookie.split(';')) {
        if (element.startsWith('name=')) return element.substr(5)
    }
}