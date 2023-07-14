const playlist = [
    {
        id: "830506",
        title: "Vampire",
        artists: ["Olivia Rodrigo"],
        url: "https://open.spotify.com/track/3k79jB4aGmMDUQzEwa46Rz?si=a2ad27f50fb34619",
        playCount: 0
    }
]

function generateId() {
    return Math.random().toString(10).substr(2, 6);
}

function getAllPlaylist() {
    return playlist;
}

function getPlaylistById(id) {
    return playlist.find((playlist) => playlist.id === id);
}

function createPlaylist(title, artists, url) {
    const newPlaylist = {
        id: generateId(),
        title,
        artists,
        url,
        playCount: 0
    }
    playlist.push(newPlaylist);
    return newPlaylist;
}

function deletePlaylist(id) {
    const index = playlist.findIndex((playlist) => playlist.id === id);
    if (index === -1) return;
    playlist.splice(index, 1);
}

function updateCount(id) {
    const index = playlist.findIndex((playlist) => playlist.id === id);
    if (index === -1) return;
    playlist[index].playCount++;
}

module.exports = {
    getAllPlaylist,
    getPlaylistById,
    createPlaylist,
    deletePlaylist,
    updateCount
};