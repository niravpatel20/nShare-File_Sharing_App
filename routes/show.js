const router = require('express').Router();
const File = require('../models/file');


// '/files/:id'
router.get('/:id', async (req, res) => {
    
    try{
        const file = await File.findOne({uuid : req.params.id});
        console.log(file);
        
        if(!file){
            res.status(404).render('download', {
                error : 'Link has expired!'
            });
        }

        // will be rendered
        res.status(200).render('download', {
            uuid: file.uuid,
            fileName: file.fileName,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });
    } catch(e){
        // will be rendered
        res.status(500).render('download', {error: 'Something went wrong.'});
    }
})

module.exports = router;