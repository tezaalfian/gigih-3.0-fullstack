const printSong = (song) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (song) {
                resolve(song);
            } else {
                reject(new Error("Song is not defined"));
            }
        }, 2000);
    });
}

const printSongWithAwait = async (song) => {
    try {
        const result = await printSong(song);
        console.log(result);
    } catch (err) {
        console.log(err.message);
    }
}

const song = {
    title: "song title",
    artists: [
        { name: "artist name 1" }
    ],
    duration: 200
}

console.log("Printing song");
printSong(song).then((song) => {
    console.log(song);
}).catch((err) => {
    console.log(err.message);
});
printSongWithAwait();