window.addEventListener('load', renderLoginForm())

function renderLoginForm(){
    console.log('rendering form')
    const fields = [
        {tag: 'input', attributes: {type: 'email', name: 'email', placeholder: 'Email'}},
        {tag: 'input', attributes: {type: 'password', name: 'password', placeholder: 'Password'}},
        {tag: 'input', attributes: {type: 'submit', value: 'Login'}},
        {tag: 'button', attributes: {class: 'signup-btn', type: 'button', value: 'Sign up'}}
    ]

    const form = document.createElement('form');
    fields.forEach( f => {
        let field = document.createElement('input')
        Object.entries(f.attributes).forEach(([a,v]) => {
            field.setAttribute(a,v);
            form.appendChild(field)
        })
    })

    // form.addEventListener('submit', requestLogin)
    const signup_btn = document.querySelector('.signup-btn')
    signup_btn.addEventListener('click', renderRegisterForm)
    const card = document.querySelector('.card')
    card.appendChild(form)
}

function renderRegisterForm() {
    
}
