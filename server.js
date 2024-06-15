const express = require('express')
const app = express()
const nodemailer  = require('nodemailer');
const multer = require('multer');
const bcrypt = require('bcrypt');
const DIR = "public/ProductUploads";
const uuid = require('uuid');
var jwt = require('jsonwebtoken');
require('dotenv').config()


var picname;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DIR)
    },
    filename: function (req, file, cb) {
      picname = Date.now() + Math.round(Math.random()) + file.originalname
      cb(null, picname)
    }
  })

const upload = multer({ storage: storage })

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/square_meal').then(() => console.log('Connected to MongoDB!'));
mongoose.connect('mongodb+srv://Admin:SquareMealPassword@clustersquaremeal.v1fj3lo.mongodb.net/SquareMeal?retryWrites=true&w=majority&appName=ClusterSquareMeal').then(() => console.log('Connected to MongoDB!'));

var cors = require('cors');
const { log } = require('console');
const { isBooleanObject } = require('util/types');
const { type } = require('os');
app.use(cors())



var registerSchema = new mongoose.Schema({name:String,email:{type:String,unique:true},phone:String,password:String,usertype:String,isActive:Boolean,activationToken:String},{versionKey:false})

var studentSchema = new mongoose.Schema({FirstName:String,LastName:String,email:{type:String,unique:true},password:String,usertype:String,isActive:Boolean,activationToken:String},{versionKey:false})

var productSchema = new mongoose.Schema({Uploader:{type:String,require:true},Title:{type:String,require:true},Image:{type:String,require:true},Description:{type:String,require:true},Price:{type:Number,require:true},OriginalPrice:{type:Number,require:true},ProductType:{type:String,require:true},SpecialNote:{type:String,require:true},isBread:Boolean,isVeg:Boolean,isNonVeg:Boolean,isGlutenFree:Boolean,isVegan:Boolean,isActive:Boolean,isDelected:{type:Boolean,default:false},createAt:{type:Date,default:Date.now},isBlocked:{type:Boolean,default:false}},{versionKey:false})

var PostSchema = new mongoose.Schema(
    {Uploader:{type:String, require:true},
    Product:{type:String, require:true},
    FromTime:{type:Date, require:true},
    UptoTime:{type:Date, require:true},
    uploadedAt:{type:Date, default:Date.now},
    publishedAt:{type:Date},
    publishOption:{type:String, default:"By User"},
    publishStatus:{type:Boolean, default:true},
    AutomaticTime:{type:Date},
    PublishTime:{type:Date},
    Quantity:{type:Number, require:true},
    RemainingQuantity:{type:Number, require:true},
    isDelected:{type:Boolean, default:false},
},{versionKey:false})




const registerModel = mongoose.model("Register", registerSchema, "Register");

const studentModel = mongoose.model("Student Account", studentSchema, "Student Account");

const productModel = mongoose.model("Product", productSchema, "Product");

const postModel = mongoose.model("Supporter Post", PostSchema, "Supporter Post");



const transporter = nodemailer.createTransport({
    service:"outlook",
    auth: {
      user: "elite.purchase@outlook.com",
      pass: "elite0123",
    },
});



app.listen(9000, () => {
    console.log('app is running on port 3000');
 })



app.post('/api/register-supporter', async(req,res)=>
    {
        var token = uuid.v4();
        var usertype = req.body.Usertype;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.Pass, salt);
        var newrecord = new registerModel({name:req.body.Name,email:req.body.Email,phone:req.body.Phone,password:hash,isActive:false,activationToken:token, usertype:usertype});
        var result = await newrecord.save();
        if(result)
        {
            const mailOptions = {
                from:`elite.purchase@outlook.com`,
                to:`${req.body.Email}`,
                subject:`Verify Your Registered Email Id`,
                text: `Hey ${req.body.Name},\n\nPlease verify your email in order\n\nClick here to get verified http://localhost:3000/email-verification/?token=${token}`
            };
            
            transporter.sendMail(mailOptions, (error, info)=>{
                if(error)
                {
                    res.send({statuscode:3});
                }
                else
                {
                    res.send({statuscode:1});
                }
            })
        }
        else
        {
            res.send({statuscode:0});
        }
    })


app.post('/api/register-student', async(req,res)=>
    {
        var token = uuid.v4();
        var usertype = req.body.Usertype;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.Pass, salt);
        var newrecord = new studentModel({FirstName:req.body.FName,email:req.body.Email,LastName:req.body.LName,password:hash,isActive:false,activationToken:token, usertype:usertype});
        var result = await newrecord.save();
        if(result)
        {
            const mailOptions = {
                from:`elite.purchase@outlook.com`,
                to:`${req.body.Email}`,
                subject:`Verify Your Registered Email Id`,
                text: `Hey ${req.body.Name},\n\nPlease verify your email in order\n\nClick here to get verified http://localhost:3000/email-verification/?token=${token}`
            };
            
            transporter.sendMail(mailOptions, (error, info)=>{
                if(error)
                {
                    res.send({statuscode:3});
                }
                else
                {
                    res.send({statuscode:1});
                }
            })
        }
        else
        {
            res.send({statuscode:0});
        }
    })
    


app.post("/api/login", async (req, res)=>
{
    if(req.body.LoginAPI==="Student")
    {
        console.log("Student")
        var result = await studentModel.findOne({email:req.body.Email});
    }
    else
    {
        var result = await registerModel.findOne({email:req.body.Email});
    }
    if(!result)
    {
        res.send({statuscode:0})
    }
    else
    {
        var hash = result.password;
        var compareResult = bcrypt.compareSync(req.body.Pass, hash); // true
        if(compareResult===true)
        {
            let token = jwt.sign({data:result._id} , process.env.TOKEN_KEY, {expiresIn: '1h'});
            res.send({statuscode:1,membdata:result, authToken:token})
        }
        else
        {
            res.send({statuscode:0})
        }
    }
})

app.get('/api/search-user-by-id/:uid',async (req,res)=>
{
    var result = await registerModel.findOne({_id:req.params.uid});
    if(!result)
    {
        res.send({statuscode:0});
    }
    else
    {
        let token = jwt.sign({data:result._id} , process.env.TOKEN_KEY, {expiresIn: '1h'});
        res.send({statuscode:1,membdata:result, authToken:token})
    }
})
    


app.post('/api/add-product', upload.single("Image"), async(req,res)=>
{
    if(!req.file)
    {
        picname = "noimage.jpg";
    }

    var datenow = new Date();

    var newrecord = new productModel({
        Uploader:req.body.Uploader,
        Title:req.body.Title,
        Image:picname,
        Description:req.body.Description,
        Price:req.body.Price,
        OriginalPrice:req.body.OriginalPrice,
        ProductType:req.body.ProductType,
        SpecialNote:req.body.SpecialNote,
        isBread:req.body.isBread,
        isGlutenFree:req.body.isGlutenFree,
        isNonVeg:req.body.isNonVeg,
        isVeg:req.body.isVeg,
        isVegan:req.body.isVegan
    });
    var result = await newrecord.save();
    if(result)
    {
        res.send({statuscode:1});
    }
    else
    {
        res.send({statuscode:0});
    }
})

app.post('/api/fetch-products-supporters', async(req,res)=>
{
    const result = await productModel.find({ Uploader: req.body.id}).select('Title Price ProductType Image isActive').sort({ createdAt: -1 });
    if(result.length===0)
    {
        res.send({statuscode:0});
    }
    else
    {
        res.send({statuscode:1,membsdata:result});
    }
})

app.post('/api/notactiveproducts', async(req,res)=>
{
    const result = await productModel.find({ Uploader: req.body.id, isActive: false}).select('_id Title Price Image').sort({ createdAt: -1 });
    if(result.length===0)
    {
        res.send({statuscode:0});
    }
    else
    {
        res.send({statuscode:1,membsdata:result});
    }
})

app.post('/api/fetchForPosting', async(req,res)=>
{
    const result = await productModel.findOne({ _id: req.body.id});
    if(result.length===0)
    {
        res.send({statuscode:0});
    }
    else
    {
        res.send({statuscode:1,membsdata:result});
    }
})
    



app.post('/api/publish-post', async(req,res)=>
{
    var token = uuid.v4();
    var uid = req.body.UserID;
    var pid = req.body.ProductID;
    var FromTime = req.body.FromTime;
    var UptoTime = req.body.UptoTime;
    var setAuto = req.body.setAuto;
    var AutomaticTime = req.body.AutoSTime;
    var Quantity = req.body.Quantity;
    var RemainingQuantity = req.body.Quantity;
    var newrecord;
    var result;
    var result2
    if(setAuto)
    {
        newrecord = new postModel({Uploader:uid, Product:pid, Quantity, RemainingQuantity, FromTime, UptoTime, publishOption:"Automatic", publishStatus:false, AutomaticTime, PublishTime:AutomaticTime});
        result = await newrecord.save();
    }
    else
    {
        newrecord = new postModel({Uploader:uid, Product:pid, Quantity, RemainingQuantity, FromTime, UptoTime, publishedAt:new Date().now, PublishTime:new Date().now});
        result2 = await newrecord.save();
    }
    var updaterecord = await productModel.updateOne({_id:pid}, {$set:{isActive:true}})
    if(result)
    {
        res.send({statuscode:2});
    }
    else if(result2)
    {
        res.send({statuscode:1});
    }
    else
    {
        res.send({statuscode:0});
    }
})


app.post('/api/fetchposts', async(req,res)=>
{
    const result = await postModel.find({ Uploader: req.body.id, isDelected: false}).sort({ createdAt: -1 });
    if(result.length===0)
    {
        res.send({statuscode:0});
    }
    else
    {
        res.send({statuscode:1,membsdata:result});
    }
})