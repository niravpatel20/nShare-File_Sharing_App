const router = require('express').Router();
const File = require('../models/file');
const path = require('path');


// '/files/download/:id'
router.get('/:id', async (req, res) => {
    
    try{
        const file = await File.findOne({uuid : req.params.id});
        console.log(file);
        
        if(!file){
            res.status(404).render('download', {
                error : 'Link has expired!'
            });
        }

        const filePath =path.join(__dirname, '..', file.path);

        res.download(filePath);

    } catch(e){
        res.status(500).render('download', {
            error : 'Something went wrong!'
        });
    }
})

module.exports = router;