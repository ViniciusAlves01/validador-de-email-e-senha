function validateEmail(email){
   if(!email.match(/\w{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}/)){
      const err = new Error('Formato de email inválido.')
      err.input = 'email'
      throw err
   }
}
function validatePassword(password) {
   if (
       password.length < 8 || 
       !password.match(/[a-z]/) || 
       !password.match(/[A-Z]/) || 
       !password.match(/[0-9]/) ||
       !password.match(/[^a-zA-Z0-9\s]/)
   ) {
       const err = new Error('Senha inválida. Atenda aos requisitos abaixo')
       err.input = 'password'
       throw err
   }
}

function updatePasswordRequiremets(){
   let ids = ['upperCase', 'lowerCase', 'especial', 'number', 'numberOfCharacters']
   let passwordConditions = [/[A-Z]/, /[a-z]/, /[^a-zA-Z0-9\s]/, /\d/, /.{8,}/]

   const passwordValue = password.value
   for (let i = 0; i < ids.length; i++) {
   const condition = passwordConditions[i].test(passwordValue)
   if (condition) {
      document.getElementById(ids[i]).classList.add('password-acepted')
   }else {
      document.getElementById(ids[i]).classList.remove('password-acepted')
      }
   }
}
function resetFormStyles() {
   Object.entries(userInputs).forEach(([key, value]) => {
       value.classList.remove('input-acepted', 'invalid-input')
       document.querySelector(`#${key}-error`).textContent = ''
   })
}
function success(){
   const successBox = document.createElement('div')
   successBox.classList.add('succesBox')
   successBox.innerText = 'Cadastro bem sucedido! ✅'
   body.append(successBox)
}
const body = document.querySelector('body')
const form = document.querySelector('form')

const userInputs = {}
userInputs.name = document.getElementById('name')
userInputs.email = document.getElementById('email')
userInputs.password = document.getElementById('password')

password.addEventListener('input', updatePasswordRequiremets)

form.addEventListener('submit', (ev) =>{
   ev.preventDefault()

   body.children[1].remove('')
   resetFormStyles()

   try {
      userInputs.name.classList.add('input-acepted')
      validateEmail(userInputs.email.value)
      userInputs.email.classList.add('input-acepted')
      validatePassword(userInputs.password.value)
      userInputs.password.classList.add('input-acepted')
      success()
   } catch (error) {
      userInputs[error.input].classList.add('invalid-input')
      document.querySelector(`#${error.input}-error`).textContent = error.message  
   }
})