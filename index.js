/**
 * Links to tutorials
 * https://www.youtube.com/watch?v=HZOXPta21PI
 * https://www.youtube.com/watch?v=EPnBO8HgyRU
 */
const dotenv = require('dotenv');
dotenv.config();
const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/api/form', (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
        Name: ${req.body.name}
        Email: ${req.body.email}
        Message: 
        ${req.body.message}
    `

    /**
     * For gmail, should turn off 2-factor authentication, and set Allow less secure apps: to ON (https://myaccount.google.com/u/1/lesssecureapps)
     * 
     */

    /**
     * Steps to secure username and password
     * 1. Create .env file
     * 2. Include in it: 
     *      USERNAME=<your-email-username>
     *      PASSWORD=<your-password>
     * 3. npm i dotenv
     * 4. In the file you want to use the environment variables add
     *      const dotenv = require('dotenv'); 
     *      dotenv.config();
     * 5. Access the variable via process.env.USERNAME and process.env.PASSWORD
     */
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD
      }
    })
    const mailOptions = {
      from: `${req.body.email}`,
      to: 'algoanh1103@gmail.com',
      subject: `${req.body.name}`,
      text: htmlEmail,
      replyTo: `${req.body.email}`
    }

    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', res)
      }
    })
    
  })
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})