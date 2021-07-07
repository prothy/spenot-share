const spotifyLoginBtn = document.querySelector('#spotify-login-button')

spotifyLoginBtn.addEventListener('click', async ev => {
    ev.preventDefault()

    window.location.href = '/redirect/spotify'
})

function setResponseInfo(text) {
    const responseInfo = document.querySelector('#responseinfo')
    responseInfo.innerHTML = text
}