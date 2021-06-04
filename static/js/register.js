const registerForm = document.querySelector('.register-form')

registerForm.addEventListener('submit', async (ev) => {
    ev.preventDefault()

    const formData = JSON.stringify({
        "username": ev.target.username.value,
        "email": ev.target.email.value,
        "password": ev.target.password.value
    })

    let response;

    try {
        response = await fetch('', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            credentials: 'same-origin',
            body: formData
        }).then(res => res.text())

        setResponseInfo(response)
        setTimeout(() => window.location.href = "/", 1000)
    } catch {
        response = 'Registration failed. Try again.'
        setResponseInfo(response)
    }
})

function setResponseInfo(text) {
    const responseInfo = document.createElement('span')
    responseInfo.innerHTML = text

    registerForm.appendChild(responseInfo)
}