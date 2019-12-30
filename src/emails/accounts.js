/*This file contains all of the code related to sending emails from user*/
const sgMail = require('@sendgrid/mail')

//send grid API key which is used by us to send email.
const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

//welcome email when users create an account.
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'siddhart.tripathi@gmail.com',
        subject: 'Welcome to Task-App',
        text: `Welcome to the app, ${name}. Let us know how you get along with the app`
    })
}

//email when account is deleted
const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'siddhart.tripathi@gmail.com',
        subject: 'Cancellaction successful',
        text: `Hello ${name}, Thanks for using our applicaiton. We would like to take a moment of yours to know the reason you are leaving,Thanks`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}