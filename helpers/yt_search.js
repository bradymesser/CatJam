require('dotenv').config();
const search = require('youtube-search');

module.exports = {
    searchYT: async function (txt) {
        search(txt, { maxResults: 1, key: process.env.YT_KEY }, (err, results) => {
            console.log(results)
            let result = null;
            if (err) {
                result = err;
                return result;
            }
            if (results.length) {
                result = results[0].link;
                console.log(tempUrl)
            }
            return result;
        })
    }
}
