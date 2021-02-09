const nodemailer = require('nodemailer')

let emailer

module.exports = {
    sendEmail: (config) => {
        return new Promise(((resolve, reject) => {
            if (!emailer) {
                // see https://nodemailer.com/smtp/
                emailer = nodemailer.createTransport(config.smtp);
            }
            // see https://nodemailer.com/message/
            emailer.sendMail(config.message, (err, info) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        }))
    }
}