const { getPlaylistById, updateCount } = require("../models/playlist");
function playSong(songId) {
    const song = getPlaylistById(songId);
    if (!song) {
        throw new Error("Song not found");
    }
    updateCount(songId);
    return song;
}

module.exports = {
    playSong
};