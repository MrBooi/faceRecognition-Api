const Clarifai = require('clarifai');

     app = new Clarifai.App({
    apiKey: 'bab116521f4b42189370b186839c84a5'
  });

  const handleApiCall = (req, res) => {
         app.models
            .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
            .then(data => {
                res.json(data);
            })
            .catch(err => res.status(400).json('unable to work with api'))
  }


const handleImageEntry = (req,res,db) =>{

    const { id } = req.body;

      db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
          res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}


module.exports ={
    handleImageEntry,
    handleApiCall
}