const registerForm = document.querySelector('.register-form')

registerForm.addEventListener('submit', async (ev) => {
    ev.preventDefault()

    const formData = JSON.stringify({
        "username": ev.target.username.value,
        "email": ev.target.email.value,
        "password": ev.target.password.value
    })

    const response = await fetch('', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        credentials: 'same-origin',
        body: formData
    })

    console.log(response)
})