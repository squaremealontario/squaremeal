const express = require('express')
const app = express()
const nodemailer  = require('nodemailer');
const multer = require('multer');
const bcrypt = require('bcrypt');
const DIR = "public/ProductUploads";
const DIRCAT = "public/CategoryUploads";
const uuid = require('uuid');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const stripe = require('stripe')('sk_test_51PxtrhKS3gOVqHXyQyj0rw2Fqesvio8Ca8Oi1YQRfYKBc5oUuNfZbS4a5oBcAJ1GdHrXqCtdNnqFcLt45Bsb3S6f00CxLmwltd');



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

const storageCat = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DIRCAT)
    },
    filename: function (req, file, cb) {
      picname = Date.now() + Math.round(Math.random()) + file.originalname
      cb(null, picname)
    }
  })

const upload = multer({ storage: storage })
const uploadCatImage = multer({ storage: storageCat })

app.use(express.urlencoded({extended:false}))
app.use(express.json())

const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/square_meal').then(() => console.log('Connected to MongoDB!'));
mongoose.connect('mongodb+srv://Admin:SquareMealPassword@clustersquaremeal.v1fj3lo.mongodb.net/SquareMeal?retryWrites=true&w=majority&appName=ClusterSquareMeal').then(() => console.log('Connected to MongoDB!'));

var cors = require('cors');
const { useEffect } = require('react');
app.use(cors())



var registerSchema = new mongoose.Schema({name:String,email:{type:String,unique:true},phone:String,password:String,usertype:String,isActive:Boolean,activationToken:String},{versionKey:false})

var studentSchema = new mongoose.Schema({FirstName:String,LastName:String,email:{type:String,unique:true},password:String,usertype:String,isActive:Boolean,activationToken:String},{versionKey:false})

var productSchema = new mongoose.Schema(
    {
        Uploader:{type:String,require:true},
        Title:{type:String,require:true},
        Category:{type:String,require:true},
        Image:{type:String,require:true},
        Description:{type:String,require:true},
        Price:{type:Number,require:true},
        OriginalPrice:{type:Number,require:true},
        Quantity:{type:Number},
        ProductType:{type:String,require:true},
        SpecialNote:{type:String,require:true},
        isVeg:{type:Boolean,default:false},
        isNonVeg:{type:Boolean,default:false},
        isGlutenFree:{type:Boolean,default:false},
        isDairyFree:{type:Boolean,default:false},
        isVegan:{type:Boolean,default:false},
        isNutFree:{type:Boolean,default:false},
        isHalal:{type:Boolean,default:false},
        isKosher:{type:Boolean,default:false},
        isActive:{type:Boolean,default:false},
        isFeaturing:{type:Boolean,default:false},
        isDelected:{type:Boolean,default:false},
        createAt:{type:Date,default:Date.now},
        lastUpdateAt:{type:Date,default:Date.now},
        lastUpdateBy:{type:String,require:true},
        isBlocked:{type:Boolean,default:false}}
    ,{versionKey:false})

var categorySchema = new mongoose.Schema(
    {Uploader:{type:String, require:true},
    Title:{type:String,require:true},
    Image:{type:String,require:true},
    Description:{type:String,require:true},
    uploadedAt:{type:Date, default:Date.now},
    isActive:{type:Boolean, default:false},
},{versionKey:false})

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

var addToCartSchema = new mongoose.Schema(
    {Product:{type:String,require:true},
    User:{type:String,require:true},
    Quantity:{type:Number,require:true},
    addedAt:{type:Date,require:true, default:Date.now}
},{versionKey:false})


var orderSessionsScheme = new mongoose.Schema(
    {items: [
        {
          productId: {
              type: String,
              required: true
          },
          quantity: {
              type: Number,
              required: true
          },
          price: {
              type: Number,
              required: true
          }
        }
      ],
      sessionId: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
},{versionKey:false})


const orderSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true
    },
    sessionId: {
      type: String,
      required: true
    },
    items: [
      {
        productId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
      }
    ],
    quantity: {
      type: Number,
      required: true
    },
    subTotal: {
      type: Number,
      required: true
    },
    serviceFee: {
      type: Number,
      required: true
    },
    tax: {
      type: Number,
      required: true
    },
    totalAmount: {
        type: Number,
        required: true
      },
    payment: {
      method: {
        type: String, // e.g., 'card', 'ideal', 'google_pay', etc.
        required: true
      },
      card: {
        brand: String,
        last4: String,
        exp_month: Number,
        exp_year: Number,
        cardholder_name: String
      },
      ideal: {
        bank: String,
        bic: String
      },
      googlePay: {
        token: String // Add fields as per your need
      },
      status: {
        type: String, // e.g., 'pending', 'completed', 'failed'
        required: true,
        default: 'Pending',
      },
      reference: {
        type: String, // Stripe Payment Intent ID or Charge ID
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    },
    email: {
      type: String,
    },
    status: {
      type: String,
      default: 'Pending',
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date
    }
  },{versionKey:false});
  



const registerModel = mongoose.model("Register", registerSchema, "Register");

const studentModel = mongoose.model("Student Account", studentSchema, "Student Account");

const productModel = mongoose.model("Product", productSchema, "Product");

const categoryModel = mongoose.model("Category", categorySchema, "Category");

const postModel = mongoose.model("Supporter Post", PostSchema, "Supporter Post");

const cartModel = mongoose.model("UserCart", addToCartSchema, "UserCart");

const orderModel = mongoose.model("Order", orderSchema, "Order");

const orderSessionsModel = mongoose.model("OrderSession", orderSessionsScheme, "OrderSession");



const transporter = nodemailer.createTransport({
    service:"outlook",
    auth: {
      user: "elite.purchase@outlook.com",
      pass: "elite0123",
    },
});

var cartinfoSend=async()=>
{
    
    // var User;
    // io.on('user', user =>
    // {
    //     User = user._id;
    // })
    // console.log(User)
    // const result = await cartModel.find({User});
    // console.log(result)
}
cartinfoSend();

// cartinfoSend();

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
            let token = jwt.sign({_id:result._id, usertype:result.usertype, name:result.name} , process.env.TOKEN_KEY, {expiresIn: '1h'});
            res.send({statuscode:1, authToken:token})
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


app.post('/api/scan/order',async (req,res)=>
{
    const sessionId = req.body.axs;
    var result = await orderModel.findOne({sessionId});
    if(!result)
    {
        res.send({statuscode:0});
    }
    else
    {
        const userId = result.userId;
        const productIds = result.items.map(item => item.productId);
        var userResult = await studentModel.findOne({ _id:userId}).select('FirstName LastName email usertype');
        if(!userResult)
        {
            userResult = await registerModel.findOne({ _id:userId }).select('name email usertype')
        }

        if(!userResult)
        {
            res.send({statuscode:2});
        }
        else
        {
            var productResult = await productModel.find({ _id:productIds }).select('Title Image');
            if(productResult.length>0)
            {
                res.send({statuscode:1, order:result, customer: userResult, product: productResult});
            }
            else
            {
                res.send({statuscode:2});
            }
        }

        
    }
})
    


app.post('/api/add-product', upload.single("Image"), async(req,res)=>
{
    if(!req.file)
    {
        picname = "noimage.jpg";
    }


    var newrecord;
    if(req.body.ProductType==='Grocery')
    {
        newrecord = new productModel({
            Uploader:req.body.Uploader,
            Title:req.body.Title,
            Category:req.body.Category,
            Image:picname,
            Description:req.body.Description,
            Price:req.body.Price,
            OriginalPrice:req.body.OriginalPrice,
            Quantity:req.body.Quantity,
            ProductType:req.body.ProductType,
            SpecialNote:req.body.SpecialNote,
            isVeg:req.body.isVeg,
            isNonVeg:req.body.isNonVeg,
            isGlutenFree:req.body.isGlutenFree,
            isDairyFree:req.body.isDairyFree,
            isVegan:req.body.isVegan,
            isNutFree:req.body.isNutFree,
            isHalal:req.body.isHalal,
            isKosher:req.body.isKosher,
            isActive:req.body.isActive,
            isFeaturing:req.body.isFeaturing,
        });
    }
    else
    {
        newrecord = new productModel({
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
    }
    
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

app.post('/api/add-category', uploadCatImage.single("Image"), async(req,res)=>
{
    if(!req.file)
    {
        picname = "noimage.jpg";
    }

    var datenow = new Date();

    var newrecord = new categoryModel({
        Uploader:req.body.Uploader,
        Title:req.body.Title,
        Image:picname,
        Description:req.body.Description,
        isActive:req.body.isActive,
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

app.post('/api/all-categories', async(req,res)=>
{
    const result = await categoryModel.find().sort({ uploadedAt: 1 });
    if(result.length===0)
    {
        res.send({statuscode:0});
    }
    else
    {
        res.send({statuscode:1,membsdata:result});
    }
})

app.post('/api/all-showcase-categories', async(req,res)=>
{
    const result = await productModel.distinct('Category');
    const CatResult = await categoryModel.find({ _id: result }).select('_id Title');
    const proResult = await productModel.find({ Category: { $exists: true, $ne: null }, isActive:true, isDelected:false, isFeaturing:true, isBlocked:false, Quantity: {$gt: 0} }).select('_id Title Category Price Image OriginalPrice');
    if(result.length===0)
    {
        res.send({statuscode:0});
    }
    else
    {
        res.send({statuscode:1,membsdata:CatResult, productsData: proResult});
    }
})

app.post('/api/all-products', async(req,res)=>
{
    const result = await productModel.find().select('Title Price ProductType Image isActive').sort({ createdAt: -1 });
    if(result.length===0)
    {
        res.send({statuscode:0});
    }
    else
    {
        res.send({statuscode:1,membsdata:result});
    }
})

app.post('/api/feed-products', async(req,res)=>
{
    const result = await productModel.find({ ProductType:'Grocery', isBlocked:false, isDelected:false, isFeaturing:true }).select('Title Price OriginalPrice Image').sort({ createdAt: -1 });
    if(result.length===0)
    {
        res.send({statuscode:0});
    }
    else
    {
        res.send({statuscode:1,membsdata:result});
    }
})

app.post('/api/all-category-names', async(req,res)=>
{
    const result = await categoryModel.find().select('_id Title Description');
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

app.post('/api/fetchActivePosts', async(req,res)=>
{
    const result = await postModel.find({ publishStatus: true});
    if(result.length===0)
    {
        res.send({statuscode:0});
    }
    else
    {
        res.send({statuscode:1,membsdata:result});
    }
})

app.post('/api/ActiveProductsAll', async(req,res)=>
    {
        const result = await productModel.find({ isActive:true }).select('Title Price Image OriginalPrice').sort({ createdAt: -1 });
        if(result.length===0)
        {
            res.send({statuscode:0});
        }
        else
        {
            res.send({statuscode:1,membsdata:result});
        }
})

app.post('/api/add-to-cart', async(req,res)=>
{
    var Product = req.body.Product;
    var User = req.body.User;
    const Quantity = req.body.Quantity;
    const verifyCart = await cartModel.find({Product,User});
    if(verifyCart.length>0)
    {
        res.send({statuscode:2});
    }
    else
    {
        const newrecord = new cartModel({Product,User,Quantity});
        result = await newrecord.save();
        if(result.length===0)
        {
            res.send({statuscode:0});
        }
        else
        {
            res.send({statuscode:1,membsdata:result});
        }
    }
    
})


app.post('/api/cart-data', async(req,res)=>
    {
        var User = req.body.User;
        const result = await cartModel.find({User});
        if(result.length===0)
        {
            res.send({statuscode:0});
        }
        else
        {
            const noQtyPros = await checkCartQty(result);
            if(noQtyPros.length>0)
            {
                if(await removeProductFromCartByID(noQtyPros).deletedCount>0)
                {
                    const result2 = await cartModel.find({User});
                    {
                        if(result2.length===0)
                            {
                                res.send({statuscode:0});
                            }
                            else
                            {
                                res.send({statuscode:1,membsdata:result2});
                            }
                    }
                }
            }
            else
            {
                res.send({statuscode:1,membsdata:result});
            }
        }
        
})

const checkCartQty=async(result)=>
{
    let ids = result.map(item => item.Product);
    const Proresult = await productModel.find({'_id' : ids, isActive:true, isDelected:false, isFeaturing:true, isBlocked:false, Quantity: {$gt: 0}});
    let proids = Proresult.map(items => items._id.toString());
    let array1 = ids.filter(value => !proids.includes(value));
    return array1;
}

const removeProductFromCartByID=async(Product)=>
{
    const result = await cartModel.deleteMany({Product});
    return result;
}

app.post('/api/post-data', async(req,res)=>
    {
        var Post = req.body.Post;
        const result = await postModel.find({'_id' : Post});
        if(result.length===0)
        {
            res.send({statuscode:0});
        }
        else
        {
            res.send({statuscode:1,membsdata:result});
        }
})

app.post('/api/register-names-byids', async(req,res)=>
    {
        const ID = req.body.IDs;
        const result = await registerModel.find({'_id' : ID}).select('_id name');
        if(result.length===0)
        {
            res.send({statuscode:0});
        }
        else
        {
            res.send({statuscode:1,membsdata:result});
        }
})

app.post('/api/product-data', async(req,res)=>
    {
        var Products = req.body.Products;
        const result = await productModel.find({'_id' : Products});
        if(result.length===0)
        {
            res.send({statuscode:0});
        }
        else
        {
            res.send({statuscode:1,membsdata:result});
        }
})

app.post('/api/getUser', async(req,res)=>
    {
        try
        {
            var _id = req.body._id;
            const result = await studentModel.find({_id}).select('FirstName LastName email usertype');
            if(result.length===0)
            {
                res.send({statuscode:0});
            }
            else
            {
                res.send({statuscode:1,UData:result});
            }
        }
        catch
        {
            res.send({statuscode:0});
        }
        
})

app.post('/api/update-user', async(req,res)=>
{
    try
    {
        const FirstName = req.body.FirstName;
        const LastName = req.body.LastName;
        const _id = req.body._id;
        var result = await studentModel.updateOne({ _id, FirstName, LastName });
        if(result.modifiedCount===0)
        {
            res.send({statuscode:0});
        }
        else
        {
            res.send({statuscode:1});
        }
    }
    catch
    {
        res.send({statuscode:0})
    }
});

app.post('/api/my-orders', async(req,res)=>
{
    try
    {
        const _id = req.body._id;
        var result = await orderModel.find({ userId:_id }).select('quantity sessionId totalAmount status createdAt email');
        if(result.length===0)
        {
            res.send({statuscode:0});
        }
        else
        {
            res.send({statuscode:1, OrderData:result});
        }
    }
    catch
    {
        res.send({statuscode:404})
    }
});

app.post('/api/all-orders', async(req,res)=>
{
    try
    {
        const _id = req.body._id;
        const searchUser = await registerModel.findOne({ _id }).select('usertype');
        if(!searchUser)
        {
            res.send({statuscode:3});
        }
        else if(searchUser)
        {
            if(searchUser.usertype==='Admin')
            {
                var result = await orderModel.find().select('quantity sessionId totalAmount status createdAt email');
                if(result.length===0)
                {
                    res.send({statuscode:0});
                }
                else
                {
                    res.send({statuscode:1, OrderData:result});
                }
            }
            else
            {
                res.send({statuscode:3});
            }
        }
        
    }
    catch
    {
        res.send({statuscode:404})
    }
});

app.post('/api/auth-success-session', async(req,res)=>
    {
        var userId = req.body.abc;
        var sessionId = req.body.xyz;
        const result = await orderModel.find({ userId, sessionId });
        const secResut = await orderModel.find({ sessionId });
        if(result.length===0 && secResut.length===0)
        {
            res.send({statuscode:0});
        }
        else if(result.length===0 && secResut.length>0)
        {
            res.send({statuscode:2});
        }
        else
        {
            res.send({statuscode:1});
        }
})

app.post('/api/auth-order-session', async(req,res)=>
{
    try
    {
        var sessionId = req.body.xyz;
        const result = await orderSessionsModel.find({ sessionId });
        console.log(result)
        if(result.length===0)
        {
            res.send({statuscode:0});
        }
        else
        {
            res.send({statuscode:1});
        }
    }
    catch
    {
        res.send({statuscode:404});
    }
    
})

app.delete('/api/deleteOneUCart', async(req,res)=>
    {
        var User = req.body.abc;
        var Product = req.body.xyz;
        const result = await cartModel.deleteOne({ User, Product });
        if(result.length===0)
        {
            res.send({statuscode:0});
        }
        else
        {
            res.send({statuscode:1});
        }
})

app.delete('/api/deleteAllUCart', async(req,res)=>
    {
        var User = req.body.abc;
        const result = await cartModel.deleteMany({ User });
        if(result.length===0)
        {
            res.send({statuscode:0});
        }
        else
        {
            res.send({statuscode:1});
        }
})

app.put('/api/update-order-status', async(req,res)=>
{
    try{
        var userId = req.body.abc;
        const adminAuth = await checkAdmin(userId);
        if(adminAuth)
        {
            var _id = req.body.oabc;
            var status = req.body.changeTo;
            const result = await orderModel.updateOne({_id},{status});
            if(result.modifiedCount===0)
            {
                res.send({statuscode:0});
            }
            else if(result.modifiedCount>0)
            {
                res.send({statuscode:1});
            }
            else
            {
                res.send({statuscode:0});
            }
        }
        else
        {
            res.send({statuscode:3});
        }
    }
    catch
    {
        res.send({statuscode:404});
    }    
})

const checkAdmin=async(_id)=>
{
    try
    {
        const result = await registerModel.findOne({_id, usertype:'Admin'});
        if(!result)
        {
            return false;
        }
        else if(result)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    catch
    {
        return false;
    }
    
}

app.get('/api/search-product', async (req, res) => {
    const searchQuery = req.query.search_query; // Get query from URL

    try {
            const regexQuery = new RegExp(searchQuery, 'i'); // Case-insensitive
            const regexResults = await productModel.find({
                $or: [
                    { Title: regexQuery },
                    { Description: regexQuery }
                ],  isActive:true,  isFeaturing:true, isBlocked: false, isDelected: false, ProductType:'Grocery'
            });
            res.send({statuscode:1, results: regexResults});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching search results' });
    }
});

app.post('/api/create-checkout-session', async (req, res) => {
    const price = Math.round(req.body.Price * 100)
    const Product = req.body.Product;
    const userId = req.body.userId;
    const line_items = Product.map((product)=>({
        product_data:{
            name:product.Title,
            description:product.Description,
            images:product.Image,
        },
    }));
    const session = await stripe.checkout.sessions.create({
        line_items: [
            ...Product.map(item => ({
              price_data: {
                currency: 'cad',
                product_data: {
                    name:item.Title,
                    description:item.Description,
                },
                unit_amount: 0, // All products are free
              },
              quantity: 1,
            })),
            {
              // Add a separate line item for the platform fee
              price_data: {
                currency: 'cad',
                product_data: {
                  name: 'Service Fee',
                },
                unit_amount: price, // Platform fee in cents (e.g., $5 would be 500)
              },
              quantity: 1,
            },
          ],
      mode: 'payment',
      success_url: `${process.env.REACT_APP_SITE_URL}/checkout/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.REACT_APP_SITE_URL}/`,
      metadata: {
        userId: userId, // Attach userId and cart data to Stripe metadata
    },
    });


    const cartItems = Product;
    var addOrderSession = await new orderSessionsModel({items:cartItems.map(item => ({
        productId: item._id,
        quantity: 1,
        price: item.Price
      })),
    sessionId:session.id}).save();

    ExpireTheStripeSession(session)

    if(addOrderSession)
    {
        res.send({statuscode:1,session:session.url});
    }
    else
    {
        res.send({statuscode:0});
    }
  
    
  });

const ExpireTheStripeSession=async(session)=>
{
    setTimeout(async () => {
        // Check if payment has been completed (via webhook or database)
        const updatedSession = await stripe.checkout.sessions.retrieve(session.id);
        if (updatedSession.payment_status === 'unpaid') {
            // Cancel the session if payment hasn't been completed
            await stripe.checkout.sessions.expire(session.id);
            await orderSessionsModel.deleteOne({ sessionId: session.id })
            console.log(`Session ${session.id} has been expired after 5 minutes.`);
        }
    }, 1 * 60 * 1000);
}

const bodyParser = require('body-parser');

  // Match the raw body to content type application/json
app.post('/webhook', bodyParser.raw({ type: 'application/json' }), async (request, response) => {
    const event = request.body;

    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
        const paymentMethod = await stripe.paymentMethods.retrieve(paymentIntent.payment_method);

        // Store payment details and update the order in your database
        // Store the paymentIntentId and other relevant order details in your DB
        const saveOR = await saveOrderToDatabase(paymentIntent, paymentMethod, session);

        const deleteOrderSession = await orderSessionsModel.deleteOne({ sessionId: event.data.object.id })
        // Clear the cart items after successful payment
    }
    else if (event.type === 'checkout.session.expired') {
        const deleteOrderSession = await orderSessionsModel.deleteOne({ sessionId: event.data.object.id })
    }
    // Return a 200 response to acknowledge receipt of the event
    response.json({ received: true });
});


  // Save order to your database
const saveOrderToDatabase = async (paymentIntent, paymentMethod, session) => {
    // Your database logic here
    const cardDetails = paymentMethod.card;
    let paymentData;

      switch (paymentMethod.type) {
        case 'card':
          paymentData = {
            method: 'card',
            card: {
              brand: cardDetails.brand,
              last4: cardDetails.last4,
              exp_month: cardDetails.exp_month,
              exp_year: cardDetails.exp_year,
              cardholder_name: paymentMethod.billing_details.name
            },
            reference: session.payment_intent, // Stripe Checkout Session ID
            status: paymentIntent.status === 'succeeded' ? 'Completed' : 'Failed',
          };
          break;

        case 'ideal':
          paymentData = {
            method: 'ideal',
            ideal: {
              bank: paymentMethod.ideal.bank,
              bic: paymentMethod.ideal.bic
            },
            reference: session.payment_intent, // Stripe Checkout Session ID
            status: paymentIntent.status === 'succeeded' ? 'Completed' : 'Failed',
          };
          break;

        // Add other payment method cases as needed
        default:
          paymentData = {
            method: paymentMethod.type,
          reference: session.payment_intent, // Stripe Checkout Session ID
          status: paymentIntent.status === 'succeeded' ? 'Completed' : 'Failed',};
      }

    const orderSessionPending = await orderSessionsModel.findOne({ sessionId: session.id });

    const qty = orderSessionPending.items.length;
    let sub = 0;
    for(var i=0; i<orderSessionPending.items.length; i++)
    {
        sub += parseFloat(orderSessionPending.items[i].price);
    }
    const taxPercent = 0.13;
    const pFee = parseFloat(process.env.REACT_APP_SERVICE_FEE);
    let preTotal = sub + pFee;
    let tax_amount = preTotal*taxPercent;
    let tax_rounded = Math.round(tax_amount * 100) / 100;
    let Total = preTotal+tax_rounded;


      // Save order with payment data
      const order = {
        userId: session.metadata.userId,
        sessionId: session.id,
        items: orderSessionPending.items.map(item => ({
            productId: item.productId,
            quantity: 1,
            price: item.price
          })),
          quantity: qty,
          subTotal: sub,
          serviceFee: pFee,
          tax: tax_rounded,
          totalAmount: Total,
          payment: paymentData,
          email: session.customer_details.email, // Optional, depending on your flow
          status: 'Pending',
      };


      await orderModel(order).save();

      await clearUserCart(session.metadata.userId)
    // Example: Save to MongoDB or any other DB
  };
  
  // Clear cart items
const clearUserCart = async (User) => {
try {
    await cartModel.deleteMany({ User });
    console.log(`Cart items for user ${User} have been removed.`);
} catch (error) {
    console.error(`Error removing cart items for user ${User}:`, error);
}
};


