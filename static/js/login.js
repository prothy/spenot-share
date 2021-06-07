const loginForm = document.querySelector('.register-form')

loginForm.addEventListener('submit', async (ev) => {
    ev.preventDefault()

    console.log(ev)

    const formData = JSON.stringify({
        "username": ev.target.username.value,
        "password": ev.target.password.value
    })

    let response;

    response = await fetch('', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
        body: formData
    })

    setResponseInfo(await response.text())
    if (response.ok) setTimeout(() => window.location.href = '/', 1000)
})

function setResponseInfo(text) {
    const responseInfo = document.querySelector('#responseinfo')
    responseInfo.innerHTML = text
}