const express = require("express")
const router = express.Router()
const Song = require("../models/song")

router.post('/song', (req, res) => {
  const song = new Song({
    title: "Umbrella",
    artist: "Beyonce",
    played: 10
  })

  try {
    /**
     * db.songs.insertOne({})
     */
    const songToSave = song.save()
    res.status(201).json(songToSave)
  }
  catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
})

router.get('/song', async (req, res) => {
  try {
    /**
     * db.songs.find()
     */
    const allSongs = await Song.find()
    res.status(200).json({
      songs: allSongs
    })
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

router.get('/song/:id', async (req, res) => {
  try {
    /**
     * db.songs.find({ _id: req.params.id })
     */
    const song = await Song.findById(req.params.id)
    res.status(200).json({ song })
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

router.patch('/song/:id', async (req, res) => {
  try {
    const {id} = req.params
    const payload = req.body
    const option = { new: true }

    const result = await Song.findByIdAndUpdate(
      id, payload, option
    )

    // res.send(result)
    res.status(200).json({ result })
  }
  catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
})

router.delete('/song/:id', async (req, res) => {
  try {
    const {id} = req.params
    const result = await Song.findByIdAndDelete(id)

    res.status(200).json({ message: `${result.title} has been deleted` })
  }
  catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
})

module.exports = router