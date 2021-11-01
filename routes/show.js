const router = require('express').Router();
const File = require('../models/file');


// '/files/:id'
router.get('/:id', async (req, res) => {
    
    try{
        const file = await File.findOne({uuid : req.params.id});
        console.log(file);
        
        if(!file){
            res.status(404).send({
                error : 'Link has expired!'
            });
        }

        // will be rendered
        res.status(200).send({
            uuid: file.uuid,
            fileName: file.fileName,
            fileSize: file.size,
            download: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });
    } catch(e){
        // will be rendered
        res.status(500).send(e);
    }
})

module.exports = router;