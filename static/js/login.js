var server_URL = `http://localhost:3000/`
var client_URL = `file:///Users/matthewlo/Desktop/Week7/Central_Repo_Habitual/Front_end_Habitual/`

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
        
}

function addEventListeners_signup(){
    console.log('adding event listner')
    const form = document.querySelector('form')
    form.method = 'POST'
    form.onsubmit = validateForm
    
}

function renderRegisterForm() {
    const fields = [
        {tag: 'input', attributes: {class: 'name-input', type: 'text', name: 'user_name', placeholder: 'Name'}},
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
    if(document.querySelector('p')){
        document.querySelector('p').remove()
    }
    form.remove();
    renderRegisterForm()
}


async function validateForm(e){
    e.preventDefault();
    if (document.getElementsByClassName('login-btn')[0]){
        await console.log('Checking Login form')
        const email_input = document.getElementsByClassName('email-input')[0].value
        const password_input = document.getElementsByClassName('password-input')[0].value

        if (email_input == '' || password_input == ''){
            console.log('please fill in all fields')
            let p = document.querySelector  ('p')
            if (! p){
                const card = document.querySelector('.card')
                const p = document.createElement('p')
                const missingInput = document.createTextNode('Please fill in all fields')
                p.appendChild(missingInput)
                card.appendChild(p)
                return false;
            } 
        } else {
            if (document.querySelector('p')){
                document.querySelector('p').remove()
            }
            requestLogin(e)
        }
    } 
    
    // check register form
    else if (document.getElementsByClassName('confirm-password-input'[0])){
        console.log('Checking Register form')
        const name_input = document.getElementsByClassName('name-input')[0].value
        const email_input = document.getElementsByClassName('email-input')[0].value
        const password_input = document.getElementsByClassName('password-input')[0].value
        const confirm_password_input = document.getElementsByClassName('confirm-password-input')[0].value
        if (name_input == '' || email_input == '' || password_input == '' || confirm_password_input == ''){
            console.log('please fill in all fields')
            let p = document.querySelector  ('p')
            if (! p){
                const card = document.querySelector('.card')
                const p = document.createElement('p')
                const missingInput = document.createTextNode('Please fill in all fields')
                p.appendChild(missingInput)
                card.appendChild(p)
                return false;
            } 
        } else if (password_input != confirm_password_input){
            if(document.querySelector('p')){
                document.querySelector('p').textContent = 'Incorrect Password'
                return false;
            } else {
                const p = document.createElement('p')
                const incorrectpw = document.createTextNode('Incorrect Password')
                p.appendChild(incorrectpw)
                document.querySelector('.card').appendChild(p)
                return false;
            }
        } else{
            if (document.querySelector('p')){
                document.querySelector('p').remove()
            }
            requestRegistration(e)
        }
    }
}


async function requestLogin(e){
    e.preventDefault()
    try{
        console.log('checking credentials ... line 154')
    
        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        };
        console.log(user)

        // function checkusername() {
        //     fetch(`${server_URL}/`)
        // }
    
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        };
        fetch(`${server_URL}users/login`, options)
        .then ()
        if (Response.ok){
            const data = await r.json()
            success(data)
         } throw new Error(console.log('wrong pw'));

    } catch (err){
        console.log('incorrect username/password')
        // console.warn(`Error: ${err}`)
        if (err){
            console.log('incorrect username/password')
            const p = document.createElement('p')
            const wrongcredentials = document.createTextNode('Incorrect username/ password')
            p.appendChild(wrongcredentials)
            document.querySelector('.card').appendChild(p)
        }
    }
}

function success(data){
    localStorage.setItem('username', data.user)
    const index = window.location.href.search('login.html')
    const redirect = window.location.href.slice(0,index)+'index.html'
    window.location.replace(redirect)
}


async function requestRegistration(e){
    e.preventDefault();
    try{
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }

        const r = await fetch(`${server_URL}users/register`, options)
        const data = await r.json()
        if (data.err){throw Error (data.err)}
        registerSuccess()

    } catch(err){
        console.warn(err);
    }
}

function registerSuccess(){
    const card = document.querySelector('.card')
    const p = document.createElement('p')
    const div = document.createElement('div')
    div.classList.add('home-link')
    const a = document.createElement('a')
    a.href = `${client_URL}login.html`
    const missingInput = document.createTextNode('Register Success')
    const loginLink = document.createTextNode('Back to Login')
    p.style.color = 'green'
    p.appendChild(missingInput)
    a.style.color = 'blue'
    a.appendChild(loginLink)
    card.appendChild(p)
    card.appendChild(div)
    div.appendChild(a)
}
