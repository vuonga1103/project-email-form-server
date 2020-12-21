/**
 * Links to tutorials
 * https://www.youtube.com/watch?v=HZOXPta21PI
 * https://www.youtube.com/watch?v=EPnBO8HgyRU
 */

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
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'USERNAME',
        pass: 'PASSWORD'
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