var express = require('express');
var multer  = require('multer');
var fs  = require('fs');
var path = require('path');
var pdfUtil = require('pdf-to-text');
const generateUniqueId = require('generate-unique-id');

const gTTS = require('gtts');
var options = {
    root: path.join(__dirname)
};
// pages up to
// var option = {from: 0, to: 10};
var dir2 = '/home/badusha/Desktop/min/nodejs-simple-file-upload/uploads/';
var dir3 = '/home/badusha/Desktop/min/nodejs-simple-file-upload/tmp/';
var full_story = "12"
var app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
   
});
var upload = multer({storage: storage}).array('files', 12);
app.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong:(");
            // console.log(filename)
        }
        var filenames =dir2+"/"+req.files[0].filename
        console.log(filenames)
        pdfUtil.pdfToText(filenames, function(err, data) {
            if (err) throw(err);
            // console.log(data); //print all text    
            // full_story +=data.replace("|", " ");
            var full_story2 = data.replace("https://mp4directs.com", " ");
            var gtts = new gTTS(full_story2, 'en');
            var def = generateUniqueId({
                length: 32,
                useLetters: false
              });
            gtts.save(req.files[0].filename+def+'.mp3', function (err, result){
                if(err) { throw new Error(err); }
                console.log("Text to speech converted!");
                console.log(result)
                
                });
            });
           
            // fs.writeFile(dir3+"/tmp.txt", full_story2, err => {
            //     if (err) {
            //       console.error(err);
            //     }
            //     // file written successfully
            //   });

          });
        //   const buffer = fs.readFileSync(dir3+"/tmp.txt"); 

         
            res.send("done")
            //send
    //         res.sendFile(, options, function (err) {
    //             if (err) {
    //                 next(err);
    //             } else {
    //                 // console.log('Sent:', fileName);
    //             }
    //     // res.end("Upload completed.");
    //     //  res.send(res.req.file.filename);  
    //     // res.json(upload).end()
    // });
    // console.log(JSON.stringifyupload.req)
    
})

app.listen(3000);
