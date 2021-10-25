const yt = require('youtube-search-without-api-key');

module.exports = {
    searchYT: async function (txt) {
        return yt.search(txt);
    }
}
