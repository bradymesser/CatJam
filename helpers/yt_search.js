/**
 * uses youtube-search, best library for text searches
 */
const search = require('youtube-search');
/**
 * uses youtube-search-api, doesn't support text searches but can get a "random" video (suggested)
 */
const youtubesearchapi = require('youtube-search-api');
require('dotenv').config();

const YT_KEY = process.env.YT_KEY;
const ytSearchOptions = {
    maxResults: 1,
    key: YT_KEY
};

module.exports = {
    searchYT: async function (txt) {
        return search(txt, ytSearchOptions);
    },
    generateRandomID() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
        var charactersLength = characters.length;
        for (var i = 0; i < 11; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    getSuggestedVideo() {
        return youtubesearchapi.GetSuggestData([1])
    }
}
