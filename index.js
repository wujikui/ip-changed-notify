const { resolveIp } = require('./lib/resolveIp')
const { sendEmail } = require('./lib/sendEmail')
const config = require('./config.json')

async function main() {
    const log = (text) => {
        console.log(`[${new Date().toISOString()}] ${text}`)
    }
    const send = (subject, text) => {
        return sendEmail({
            smtp: config.mail.smtp,
            message: {
                from: config.mail.from,
                to: config.mail.to,
                subject: `[${config.mail.subjectPrefix}] ${subject}`,
                html: `${text}<br/>${new Date().toISOString()}`
            }
        })
    }

    let lastIp
    const task = () => {
        return resolveIp().then(async ip => {
            if (!lastIp) {
                const text = `initialized ip: ${ip}`
                lastIp = ip
                log(text)
                await send(text, text)
            } else if (lastIp !== ip) {
                const text = `ip changed: ${lastIp} => ${ip}`
                lastIp = ip
                log(text)
                await send(text, text)
            }
        }, err => {
            console.error(err.message)
        })
    }

    setInterval(() => {
        task()
    }, config.checkIntervalSecond * 1000)
    task()
}

main().catch(console.error)