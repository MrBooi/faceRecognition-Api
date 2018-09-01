const Clarifai = require('clarifai');

     app = new Clarifai.App({
    apiKey: 'f9c42b71e4c24da6b8a67be14bffbc19'
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