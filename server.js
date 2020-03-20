const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const {Builder, By, Key, util} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const options = new chrome.Options()
options.addArguments("--start-maximized");
options.addArguments("--disable-notifications");

const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build()

const app = express()

app.use(express.static(path.join(__dirname, 'pages')));
app.get("/", (req, res)=>{
    res.sendFile('pages/facebook.html', {root: __dirname})
})


app.get('/login', (req, res) => {
    console.log("LOGGED IN")
    res.sendFile('pages/automation_login.html', {root: __dirname})
})

app.get('/register', (req, res) => {
    console.log("REGESTER")
    res.sendFile('pages/automation_register.html', {root: __dirname})
})


app.listen(5000, ()=>{
    console.log("SERVER STARTED AT PORT 5000")
})


driver.sleep(3000)
function runScriptLogin() {
    
    driver.get('http://localhost:5000')
    
    //driver.sleep(3000)
    
    const email = driver.findElement(By.id('login_email'))
    const password = driver.findElement(By.id('login_password'))

    const login = driver.findElement(By.id('login_btn'))

    email.sendKeys('sampleEmail@gmail.com')
    password.sendKeys('samplepassword')
    

    setTimeout(()=>{
        login.click()
    },10000)


}


function runScriptRegister() {

   
    
    driver.get('http://localhost:5000')

   // driver.sleep(3000)

    const firstName = driver.findElement(By.id('register_firstName'))
    firstName.sendKeys("Sudipt")

    const lastName = driver.findElement(By.id('register_lastName'))
    lastName.sendKeys("Dabral")

    const register_dob = driver.findElement(By.id('register_dob'))
    register_dob.sendKeys(new Date().toDateString())

    const register_male = driver.findElement(By.id('register_male'))
    register_male.click()

    const email = driver.findElement(By.id('register_email'))
    const email2 = driver.findElement(By.id('register_email2'))
    const password = driver.findElement(By.id('register_password'))
    email.sendKeys('sampleEmail@gmail.com')
    email2.sendKeys('sampleEmail@gmail.com')
    password.sendKeys('samplepassword')

    const register = driver.findElement(By.id('register_btn'))

    setTimeout(()=>{
        register.click()
    },10000)


   // driver.quit()
}




if(process.argv.length > 2){
    const command = process.argv[2]
console.log(command)

if(command == 'login')
    runScriptLogin()
if(command == 'register')
    runScriptRegister()
}
