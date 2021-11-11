require('dotenv').config();
const File = require('./models/file');
const fs = require('fs');
const connectDB = require('./config/db');


connectDB();

const fetchData = async () => {

    const pastDate = new Date(Date.now() - 24*60*60*1000);
    console.log(pastDate);
    
    const files = await File.find({ createdAt: { $lt: pastDate}}).exec();

    if(files.length){
        for(const file of files){
            try{
                fs.unlinkSync(file.path);

                await file.remove();

                console.log(`Successfully deleted ${file.fileName}`);

            } catch(e){
                console.log(`Something went wrong ${e}`);
            }
        }
    }
}

fetchData().then(() => {
    console.log('Job completed!');
    process.exit();
});