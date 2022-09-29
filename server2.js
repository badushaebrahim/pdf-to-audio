var express = require('express');
var multer  = require('multer');
var fs  = require('fs');
var path = require('path');
var pdfUtil = require('pdf-to-text');
const {PythonShell} =require('python-shell');
const generateUniqueId = require('generate-unique-id');
const {PythonShell} =require('python-shell');
// var options = {
//     root: 
// };
let options = {
        mode: 'text',
        pythonOptions: ['-u'], // get print results in real-time
          scriptPath: 'path/to/my/scripts', //If you are having python_test.py script in same folder, then it's optional.
        args: ['shubhamk314'] //An argument which can be accessed in the script using sys.argv[1]
    };
// pages up to
// var option = {from: 0, to: 10};
var defpath =path.join(__dirname)
var dir2 = '/home/badusha/Desktop/min/nodejs-simple-file-upload/uploads/';
// var dir3 = '/home/badusha/Desktop/min/nodejs-simple-file-upload/tmp/';
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
        
	PythonShell.run('python_test.py', options, function (err, result){
		if (err) throw err;
		// result is an array consisting of messages collected
		//during execution of script.
		console.log('result: ', result.toString());
		res.send(result.toString())
	  });
          
          });
        

         
            res.send("done")
          
    
})

app.listen(3000);
