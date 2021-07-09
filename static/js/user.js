const spotifyUrlInput = document.querySelector('.spotify-url-input')
const spotifyUrlInfo = document.querySelector('.spotify-url-info')

spotifyUrlInput.addEventListener('keydown', async ev => {
    if (ev.key === 'Enter') {
        const response = await fetch('/fetch/song/' + ev.target.value)
            .then(res => res.json())
            .catch(() => spotifyUrlInfo.innerHTML = 'Invalid input.')

        console.log(response);
    }
})