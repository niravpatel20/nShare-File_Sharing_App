const router = require('express').Router();
const File = require('../models/file');
const path = require('path');


// '/files/download/:id'
router.get('/:id', async (req, res) => {
    
    try{
        const file = await File.findOne({uuid : req.params.id});
        console.log(file);
        
        if(!file){
            res.status(404).send({
                error : 'Link has expired!'
            });
        }

        const downloadPath =path.join(__dirname, '..', file.path);

        res.download(downloadPath);

    } catch(e){
        // will be rendered
        res.status(500).send(e);
    }
})

module.exports = router;