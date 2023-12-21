const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const qr = require('qrcode');
const mongoose = require('mongoose');
const { send } = require('process');
const userdb = 'localhost:27017';
const database = 'QR_gen';
const passdb = '';
const dburl = `mongodb+srv://khoa2062003:ProjectQreactive@cluster0.vcbiwum.mongodb.net/user?retryWrites=true&w=majority`;
const url = require('url');
const jimp = require('jimp');
const multer = require('multer');
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(bodyParser.json());
app.use(cors());
const opt = {
    errorCorrectionLevel: 'H',
    type: 'image/png',
    rendererOpts: {
        quality: 0.3
    }
};
// Connect to the database
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the database successfully'))
    .catch((err) => console.log(err));

    //check connection
    const db = mongoose.connection;
    db.once('open', function(){
        console.log('Connected to MongoDB');
    });
    db.on('error', function(err){
        console.log(err);
    }
    );


// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Global variable to store the current user's account information
let currentAccount = null;




// Define the Mongoose model at the top
const personalQRSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    website: String,
    company: String,
    position: String,
    account: String
});
// Account model for authentication
const accountSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    
});

const Account = mongoose.model('Account', accountSchema);
const personalQR = mongoose.model('personalQR', personalQRSchema);
app.use (express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.get('/', (req,res)=>{
    res.render('login');
}
);

//register
app.get('/register', (req,res)=>{
    res.render('register');
}
);

app.post('/register', async (req,res)=>{
    try {
        const { username, password } = req.body;

        // Save the form data to the MongoDB database
        const account = new Account({
            username,
            password: await bcrypt.hash(password, 10)
        });

        //check if username is already in database
        const user=await Account.findOne({username:username});
        if(user){
            res.status(400).send('Username already exists');
        }
        else{
            await account.save();
            res.redirect('/login');
            res.send('User created successfully');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
);

//getUser
app.get('/getUser', async (req,res)=>{
    try {
        const account = await Account.find();
        res.json(account);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
);

//createuser
app.post('/createUser', async (req,res)=>{
    try {
        const { username, password } = req.body;

        // Save the form data to the MongoDB database
        const account = new Account({
            username,
            password: await bcrypt.hash(password, 10)
        });

        await account.save();
        res.send('User created successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
);


//login
app.get('/login', (req,res)=>{
    res.render('login');
}
);

app.post('/login', async (req,res)=>{
    try {
        const { username, password, email } = req.body;

        // Save the form data to the MongoDB database
        const account = new Account({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        });

        
        //check if username is already in database
        const user=await Account.findOne({username:username});
        if(!user){
            res.status(400).send('Username does not exist');
        }
        else{
            //check if password is correct
            if(await bcrypt.compare(password, user.password)){
                currentAccount = user.username;
                res.redirect('/qr_generate');
            }
            else{
                res.send('Wrong password');
            }
        }
        
        //check if email is already in database
        const mail=await Account.findOne({email:email});
        if(mail){
            res.status(400).send('Email already exists');
        }
        else{
            await account.save();
            res.redirect('/login');
            res.send('User created successfully');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
);


//qr generate route
app.get('/qr_generate', (req,res)=>{
    res.render('qr_generate');
}
);



// Assuming personalQR is your Mongoose model
app.get('/personal_qr_code', (req, res) => {
    res.render("personal_qr_code");
});

// generate QR code for link
const LinkQRSchema = new mongoose.Schema({
    link: String
});
const linkQR = mongoose.model('LinkQR', LinkQRSchema);
app.get('/qr_link', (req,res)=>{
    res.render("qr_link");
}
);

// filling and saving personal information to database
app.post('/personal_qr_code', async (req, res) => {
    try {
        const { name, email, phone, address, website, company, position } = req.body;

        // Save the form data to the MongoDB database
        const personalQRData = new personalQR({
            name,
            email,
            phone,
            address,
            website,
            company,
            position,
            account: currentAccount 
        });

        await personalQRData.save();
        
        // Redirect to the scan page with the ID of the saved document
        res.redirect(`/scan/${personalQRData._id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



// scan route for personal QR code
app.get('/scan/:id', async (req, res) => {
    try {
        // Retrieve the saved data from the database using the provided ID
        const personalQRData = await personalQR.findById(req.params.id);

        if (!personalQRData) {
            return res.status(404).send('QR Data not found');
        }

        // Construct the URL for the profile using the provided ID
        const profileUrl = `http://localhost:5000/profile/${req.params.id}`;

        // Generate the QR code data for the profile URL
        const qrCodeDataUrl = await qr.toDataURL(profileUrl);

        
       
        // send json data to client
        res.json({ qrImageUrl: qrCodeDataUrl });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// profile route for showing personal information
app.get('/profile/:id', async (req,res)=>{
    try {
        // Retrieve the saved data from the database using the provided ID
        const personalQRData = await personalQR.findById(req.params.id);

        if (!personalQRData) {
            return res.status(404).send('QR Data not found');
        }

        // Generate the QR code data
        const Data = `name: ${personalQRData.name}
email: ${personalQRData.email}
phone: ${personalQRData.phone}
address: ${personalQRData.address}
website: ${personalQRData.website}
company: ${personalQRData.company}
position: ${personalQRData.position}`;


        res.render('profile', { data: Data });;
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
);


// gererate QR code for link

app.post('/qr_link', async (req,res)=>{
    try {
        const { link } = req.body;

        // Save the form data to the MongoDB database
        const linkQRData = new linkQR({
            link,
            account: currentAccount // Assuming currentAccount is defined
        });

        await linkQRData.save();

        // generate QR code for link
        const qrCodeDataUrl = await qr.toDataURL(link);

        // Send the QR code image URL to the client
        res.json({ qrImageUrl: qrCodeDataUrl });
        // Later in the code, mistakenly trying to send another response
    // This will result in "Cannot set headers after they are sent to the client" error
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });

    }
}
);


app.get('/scan_link/:id', async (req, res) => {
    try {
        // Retrieve the saved data from the database using the provided ID
        const linkQRData = await linkQR.findById(req.params.id);

        if (!linkQRData) {
            return res.status(404).send('QR Data not found');
        }

        // Construct the URL for the profile using the provided ID
        const profileUrl = linkQRData.link;

        // Generate the QR code data for the profile URL
        const qrCodeDataUrl = await qr.toDataURL(profileUrl);

        // Render the scan page with the QR code data and document ID
        res.render('scan_link', { qrCodeDataUrl, id: req.params.id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


// Generate QR code for image
app.get('/qr_image', (req,res)=>{
    res.render("qr_image");
}
);

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Middleware to store file information in req
const storeFileInfo = (req, res, next) => {
    if (req.file) {
        req.imagePath = 'uploads/' + req.file.originalname;
    }
    next();
};

app.post('/qr_image', upload.single('image'), storeFileInfo, (req, res) => {
    const file = req.file;
    if (!file) {
        const error = new Error('Please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }

    res.redirect('/result');
});

app.get('/result', (req, res) => {
    const imagePath = req.imagePath;
    res.render('result_image', { imagePath: imagePath });
});

app.get('/qr_text', (req,res)=>{
    res.render("qr_text");
}
);

app.post('/qr_text', async (req,res)=>{
    try {
        const { text } = req.body;

        // Save the form data to the MongoDB database
        const textQRData = new textQR({
            text,
            account: currentAccount // Assuming currentAccount is defined
        });

        await textQRData.save();

        // generate QR code for link
        const qrCodeDataUrl = await qr.toDataURL(text);

        //send json data to client
        res.json({ qrImageUrl: qrCodeDataUrl });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

);

const TextQRSchema = new mongoose.Schema({
    text: String
});
const textQR = mongoose.model('textQR', TextQRSchema);
app.get('/scan_text/:id', async (req, res) => {
    try {
        // Retrieve the saved data from the database using the provided ID
        const textQRData = await textQR.findById(req.params.id);

        if (!textQRData) {
            return res.status(404).send('QR Data not found');
        }

        // Construct the URL for the profile using the provided ID
        const profileUrl = textQRData.text;

        // Generate the QR code data for the profile URL
        const qrCodeDataUrl = await qr.toDataURL(profileUrl);

        // Render the scan page with the QR code data and document ID
        res.render('scan_text', { qrCodeDataUrl, id: req.params.id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});




app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
}

);

