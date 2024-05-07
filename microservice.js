const express = require('express');
const multer = require('multer')
const sharp = require('sharp')
const fs = require('fs');
const { error } = require('console');
const Sharp = require('sharp');
const app= express();
const port = process.env.PORT || 3000

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.post('/storage',upload.single('photo'),async (req,res)=>{
    try{
        imgfile=req.file.buffer;
        fs.writeFileSync(__dirname + `/${req.file.originalname}`,imgfile);
        async function Imageresize(){
            try{
                
                const response = await sharp(req.file.buffer).resize(200,200).toBuffer();
                console.log(response)
                const contentType=req.file.mimetype;
                res.set('Content-Type',contentType);
                await res.send(response);
                
               
            }
            catch(error){
                console.log(error)
            }
        }
        Imageresize();
        // fs.writeFileSync(__dirname + `/${req.file.originalname}` +"dj",newnm);
    }
    catch(error){
        console.log(error)
    }
});

app.listen(port, ()=>{
    console.log(`Image-processing microservice listerning on port number ${port}`)
})