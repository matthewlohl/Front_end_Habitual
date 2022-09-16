window.addEventListener('load', renderLoginForm())

function renderLoginForm(){
    console.log('rendering login form')
    const fields = [
        {tag: 'input', attributes: {class: 'email-input', type: 'email', name: 'email', placeholder: 'Email'}},
        {tag: 'input', attributes: {class: 'password-input', type: 'password', name: 'password', placeholder: 'Password'}},
        {tag: 'input', attributes: {class: 'login-btn', type: 'submit', value: 'Login'}},
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

    
    const card = document.querySelector('.card')
    card.appendChild(form)
    addEventListeners_login()
}

function addEventListeners_login(){
    console.log('adding event listner')
    const form = document.querySelector('form')
    form.method = 'POST'
    form.name = 'form'
    form.onsubmit = validateForm
    const signup_btn = document.querySelector('.signup-btn')
    signup_btn.addEventListener('click', updateURL)
        
    
    // const login_btn = document.querySelector('.login-btn')
    // signup_btn.addEventListener('click', renderRegisterForm)
    // login_btn.addEventListener('click', validateForm)
}

function addEventListeners_signup(){
    console.log('adding event listner')
    const form = document.querySelector('form')
    form.method = 'POST'
    form.onsubmit = validateForm
    
    // const login_btn = document.querySelector('.login-btn')
    // signup_btn.addEventListener('click', renderRegisterForm)
    // login_btn.addEventListener('click', validateForm)
}

function renderRegisterForm() {
    const fields = [
        {tag: 'input', attributes: {class: 'email-input', type: 'email', name: 'email', placeholder: 'Email'}},
        {tag: 'input', attributes: {class: 'password-input', type: 'password', name: 'password', placeholder: 'Password'}},
        {tag: 'input', attributes: {class: 'confirm-password-input', type: 'password', name: 'confirm password', placeholder: 'Confirm Password'}},
        {tag: 'button', attributes: {class: 'signup-btn', type: 'submit', value: 'Sign up'}}
    ]
    const form = document.createElement('form');
    fields.forEach( f => {
        let field = document.createElement('input')
        Object.entries(f.attributes).forEach(([a,v]) => {
            field.setAttribute(a,v);
            form.appendChild(field)
        })
    })
    console.log('render register form')
    const card = document.querySelector('.card')
    card.appendChild(form)
    // form.addEventListener('submit', addUser)
    addEventListeners_signup()
}

function runValidation(){
    const form = document.querySelector('form')
    form.onsubmit = validateForm
}

function updateURL(){
    window.location.hash = 'register'
    console.log('URL changed')
    const form = document.querySelector('form');
    form.remove();
    renderRegisterForm()
}


function validateForm(){
    console.log('checking form')
    const email_input = document.forms["form"]['email'].value
    const password_input = document.forms["form"]['password'].value
    // const confirm_password_input = document.forms["form"]['confirm password'].value

        if (email_input == "" || password_input == ""){
            const card = document.querySelector('.card')
            const p = document.createElement('p')
            const missingInput = document.createTextNode('Please fill in all fields')
            p.appendChild(missingInput)
            card.appendChild(p)
            return false;
        }

}
