const express = require('express')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
const app = express()

// parse form input to JSON
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
    // const transporter = nodemailer.createTransport({
    //   // host: 'smtp.mail.yahoo.com',
    //   // port: 465,
    //   service:'yahoo',
    //   // secure: false,
    //   auth: {
    //      user: 'vuonga1103@yahoo.com',
    //      pass: 'Purpletomat0'
    //   },
    //   // debug: false,
    //   // logger: true
    // });

    // const mailOptions = {
    //   from: '"Nodemailer Contact" <vuonga1103@yahoo.com>',
    //   to: 'vuonga1103@yahoo.com',
    //   replyTo: 'test@gmail.com',
    //   subject: 'New Message',
    //   text: req.body.message,
    //   html: htmlEmail
    // }

    // transporter.sendMail(mailOptions, (err, info) => {
    //   if (err) {
    //     return console.log(err)
    //   }

    //   console.log('Message sent: %s', info.message)
    //   console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
    // })
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'algoanh1103',
        pass: 'Rainbowtomat0!'
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