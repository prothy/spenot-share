if (username) {
    document.querySelector('.header-links').innerHTML = `<span>Welcome, <a href="/user/${username}">${username}</a>.</span> <a href='/logout'>Logout</a>`
}

function getUsernameFromCookie() {
    for (let element of document.cookie.split(';')) {
        if (element.startsWith('name=')) return element.substr(5)
    }
}