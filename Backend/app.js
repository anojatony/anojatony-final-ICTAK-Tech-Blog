
//library app // Main Server

const express=require('express');
const app = new express();
const multer = require('multer');
const cors=require('cors');
const jwt=require('jsonwebtoken');
var mongoose = require('mongoose');
const Postdata=require('./src/model/Postdata');
const Admindata=require('./src/model/Admindata');
const Featureddata=require('./src/model/Featureddata');
const Trendingdata=require('./src/model/Trendingdata');
const Homedata=require('./src/model/Homedata');
const Students = require('./src/model/Students');
const Trainers = require('./src/model/Trainers');

email='admin@gmail.com';
password='Admin123@';

//PORT
const port=process.env.PORT || 8000;


app.use(cors());

// POST middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 


//middleware function..static
app.use(express.static('./public'));


// multer setup

// setting up storage folder destination and filename
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './public/images');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
  });
  
 // specifying file type
  const fileFilter = (req,file,callback)=>{
   if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
   callback(null,true);
   }
   else{
       callback(null,false);
   }
  }
  
  
  const upload = multer({
      storage: storage,
      fileFilter:fileFilter
    });
  

// multer ends

//middleware for verifying token
function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}



// blogs
app.get('/posts',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
        Postdata.find()
        .then(function(posts){
           res.send(posts)     
        })
    })


    // get students
app.get('/studentsget/:id',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
      Students.findOne({"_id":req.params.id})
       .then(function(user){
        res.send(user)     
        })
  }
  })

      // get students
app.get('/trainersget/:id',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
  if(mongoose.Types.ObjectId.isValid(req.params.id)) {
      Trainers.findOne({"_id":req.params.id})
      .then(function(trainer){
         res.send(trainer)     
      })
  }
  })

    // search category
 app.get('/category/:cat',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
      const cat = req.params.cat;

      Postdata.find({"category": cat})
      .then(function(posts){
         res.send(posts)     
      })
  })


 // Admin blogs
app.get('/adminposts',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
      Admindata.find()
      .then(function(posts){
         res.send(posts)     
      })
  }) 

 // Admin createblog
app.post('/adminblog',verifyToken,upload.single('image'),function (req,res){
  // console.log("hi")
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);
    console.log(req.file);
 var blog={
   title:req.body.title,
   author:req.body.author,
   introduction:req.body.introduction,
   content:req.body.content,
   category:req.body.category,
   date:req.body.date,
   image: 'http://localhost:8000/images/'+ req.file.filename
}
var post = Admindata(blog);
post.save();
})


 // createblog
 app.post('/createblog',upload.single('image'),function (req,res){
  // console.log("hi")
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body);
 var blog={
   title:req.body.title,
   author:req.body.author,
   introduction:req.body.introduction,
   content:req.body.content,
   category:req.body.category,
   date:req.body.date,
   image: req.body.image
}
var post = Postdata(blog);
post.save();
})

// getting id

app.get('/blog/:id',  (req, res) => {
  
  const id = req.params.id;
    Postdata.findOne({"_id":id})
    .then((post)=>{
        res.send(post);
    });
})


//comment



 app.post('/comment', (req,res)=>{

 Postdata.findOne({"_id":req.body.id},async(err,blog)=>{

  try{
  let users = await Students.findOne({"email":req.body.emails});
  console.log(users)
  if(!users){
    // res.status(401).send('not user')
    console.log("not user")
  }
  else{
    blog.comments.push({
    comment:req.body.comment,
    commentor: `${users.firstname}  ${users.lastname}`
     })
    blog.save();
  }
  let usert = await Trainers.findOne({"email":req.body.emailt});
  if(!usert){
    console.log("not user")
  //  res.status(401).send('not user')
  }
  else{
    blog.comments.push({
      comment:req.body.comment,
      commentor: `${usert.firstname}  ${usert.lastname}`
       })
      blog.save();
  }
  }

  catch (err) 
  {if(err){
  console.log(err);
  }
  }
 })

})

//like


app.put('/like', (req,res)=>{
  

  Postdata.findOne({"_id":req.body.id},async(err,blog)=>{
 
   try{
   let users = await Students.findOne({"email":req.body.emails});
   if(!users){
    // res.status(401).send('not a user')
    console.log("not user")
   }
   else if(blog.likedBy.includes(users.email)){
    // res.status(401).send('user already liked')
    console.log("user liked already")
   }
    else{
    blog.like++;
    blog.likedBy.push(users.email)
     blog.save();
    }
   
   let usert = await Trainers.findOne({"email":req.body.emailt});
   if(!usert){
     console.log("not user")
  //  res.status(401).send('not a user')
   }
   else if(blog.likedBy.includes(usert.email)){
    // res.status(401).send('user already liked')
    console.log("user liked already")
   }
   else{
    blog.like++;
    blog.likedBy.push(usert.email)
    blog.save();
   }

   }
 
   catch (err) {
     if(err){
     console.log(err);
     }
   }
  })
 
 })


//feature blogs
app.get('/featuredposts',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
      Featureddata.find()
      .then(function(posts){
         res.send(posts)     
      })
  })



// getting id

app.get('/featuredblog/:id',  (req, res) => {

const id = req.params.id;
  Featureddata.findOne({"_id":id})
  .then((post)=>{
      res.send(post);
  });
})



//Trending blogs
app.get('/trendingposts',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
      Trendingdata.find()
      .then(function(posts){
         res.send(posts)     
      })
  })



// getting id

app.get('/trendingblog/:id',  (req, res) => {

const id = req.params.id;
  Trendingdata.findOne({"_id":id})
  .then((post)=>{
      res.send(post);
  });
})



//Trending blogs
app.get('/homeposts',function(req,res){
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
      Homedata.find()
      .then(function(posts){
         res.send(posts)     
      })
  })



// getting id

app.get('/homeblog/:id',  (req, res) => {

const id = req.params.id;
  Homedata.findOne({"_id":id})
  .then((post)=>{
      res.send(post);
  });
})


//updateblog
app.put('/updateblog',upload.single('image'),(req,res)=>{
  console.log(req.file)
  console.log(req.body)
  id=req.body.id,
  title= req.body.title,
  author = req.body.author,
  genre = req.body.genre,
  content = req.body.content,
  category=req.body.category,
  date=req.body.date,
  image = 'http://localhost:8000/images/'+ req.file.filename
  
 Admindata.findByIdAndUpdate({"_id":id},
                              {$set:{"title":title,
                              "author":author,
                              "genre":genre,
                              "content":content,
                              "category":category,
                              "date":date,
                              "image":image}})
 .then(function(){
     res.send();
 })
})


// getting id

app.get('/updateblog/:id',  (req, res) => {

  const id = req.params.id;
    Admindata.findOne({"_id":id})
    .then((post)=>{
        res.send(post);
    });
  })

//
app.get('/admincount', (req, res)=>{
  Admindata.countDocuments()
  .then((count)=>{
    console.log(count);
    res.send(JSON.stringify({count}));
  })
})


  // getting admin id

app.get('/adminsingleblog/:id',  (req, res) => {

  const id = req.params.id;
    Admindata.findOne({"_id":id})
    .then((post)=>{
        res.send(post);
    });
  })


//delete blog
app.delete('/admindelete/:id',(req,res)=>{
   
  id = req.params.id;
  Admindata.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log('success')
      res.send();
  })
})
         
// ..................................................


    //signup students
    
      app.post('/signup', (req, res) => {
      res.header("Access-Control-Allow-Origin","*")
      res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
      // console.log("hi")
        console.log(req.body);
         Students.findOne({email : req.body.email}).exec(function(err,user){
        console.log(user);
        if(user) {
          res.status(401).send({user})
          console.log("user exists");
        } 

        else{

         var data = {
              firstname : req.body.firstname,
              lastname: req.body.lastname,
              email : req.body.email,
              password : req.body.password,
              phone: req.body.phone
    }
    var data = new Students(data);
    data.save();
  }
})
 })
 


    //signup trainers
    
    app.post('/trainersignup', (req, res) => {
      res.header("Access-Control-Allow-Origin","*")
      res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
      // console.log("hi")
        console.log(req.body);
        Trainers.findOne({email : req.body.email}).exec(function(err,user){
        console.log(user);
        if(user) {
          res.status(401).send('User exists')
          console.log("user exists");
        } 

        else{

         var data = {
              firstname : req.body.firstname,
              lastname: req.body.lastname,
              email : req.body.email,
              password : req.body.password,
              phone: req.body.phone,
              company: req.body.company,
    }
    var data = new Trainers(data);
    data.save();
  }
})
 })
 





//login
app.post('/login', async (req, res) => {
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");


  let trainer = await Trainers.findOne({email: req.body.email, password:req.body.password})
  let user =   await Students.findOne({email: req.body.email, password:req.body.password})
  
      if(req.body.email=="admin@gmail.com" && req.body.password=="Admin123@"){
        let payload={subject:email+password}
        let token=jwt.sign(payload,'secretKey')  
        res.status(200).send({token})
        console.log("token")
      }

     try{
     if(user){
      res.status(200).send({user})
       console.log("success")
     }
     else if(trainer){
      res.status(200).send({trainer})
       console.log("trainer")
     }
    
     }
     catch(err){
      //  if(!user){
      //   res.status(401).send('User not registered')
      //  }
      //  if(!trainer){
      //   res.status(401).send('User not registered')
      //  }
      if(err){
        res.status(401).send({err})
      }
     }

   
  })
  
    
//port

app.listen(port,()=>{
    console.log("Server Ready at"+port);
});