const { getAllPlaylist, createPlaylist, deletePlaylist } = require('../models/playlist');
const { playSong } = require('../services/playlistService');
const express = require('express');
const router = express.Router();

router.get('/playlists', (req, res) => {
    res.send({
        data: getAllPlaylist(),
        message: "Successfully get all playlist",
    });
});

router.get('/playlists/:id', (req, res) => {
    const { id } = req.params;
    try {
        const playlist = playSong(id);
        res.send({
            data: playlist,
            message: "Successfully play a song",
        });
    } catch (error) {
        res.status(404).send({
            message: error.message,
        });
    }
});

router.post('/playlists', (req, res) => {
    const { title, artists, url } = req.body;
    if (!title || !artists || !url) {
        return res.status(400).send({
            message: "Please fill all required field",
        });
    }
    if (!Array.isArray(artists)) {
        return res.status(400).send({
            message: "Artists must be an array",
        });
    }
    if (artists.length === 0) {
        return res.status(400).send({
            message: "Artists must not be empty",
        });
    }
    try {
        const newPlaylist = createPlaylist(title, artists, url);
        res.send({
            data: newPlaylist,
            message: "Successfully create a playlist",
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
        });
    }
});

router.delete('/playlists/:id', (req, res) => {
    const { id } = req.params;
    try {
        deletePlaylist(id);
        res.send({
            message: "Successfully delete a playlist",
        });
    } catch (error) {
        res.status(404).send({
            message: error.message,
        });
    }
});

module.exports = router;