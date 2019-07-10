const Clarifai = require ('clarifai');

const app = new Clarifai.App({
    apiKey: '3cc0bd81e9b84daa9622c8c404fddf93'
  });

const handleAPiCall = (req, res) => {
    app.models.predict(
        Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    }).catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, DB) => {
    const { id } = req.body;
    DB('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage,
    handleAPiCall
}