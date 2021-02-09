const axios = require('axios')

module.exports = {
    resolveIp: async () => {
        // see https://www.ipip.net/myip.html
        const resp = await axios({
            url: 'http://myip.ipip.net',
            timeout: 5000
        })
        return (/\d+\.\d+\.\d+\.\d+/.exec((resp.data || '')) || [])[0]
    }
}
