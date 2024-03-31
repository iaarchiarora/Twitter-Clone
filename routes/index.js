const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); //npm install bcrypt --save
const multer=require('multer'); //npm install multer //file create krni hai
const uploader=multer({dest:'./uploads'}) //line 4 n 5 27f
const db=require('../models');
const { checkLogin } = require("../service/userService");
// const { createUser } = require('../service/userService'); //line removed pr kyu
// Initialize the session middleware
// Database synchronization
db.sequelize.sync();

//Routesss
router.get('/logout', function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      console.error('Error destroying session:', err);
      res.redirect('/');
    } else {
      res.redirect('/');
    }
  });
 
});

router.post('/tweettweet', async(req, res, next) => {
  let twRecv = { ...req.body };
  twRecv.userid = req.session.userid;
  console.log('twRec', twRecv);
  let tweet = await db.tweet.create(twRecv);
  res.json({ tweet });
});

router.get("/", function (req, res, next) {
  res.render("index", { message: "Welcome" });
});

router.get("/create", async(req, res, next) => {
  res.render('createAccount');
});

router.get('/check/:username', async(req, res, next) => {
  let username = req.params.username;
  let user = await db.users.findOne({ where: { username: username } });
  if (user) {
    res.json({ available: false });
  } else {
    res.json({ available: true });
  }
});

router.post("/create", uploader.single('picture'), async(req, res, next) => {
  const user = req.body;
  const password = user.password;
  user.picture = req.file.path;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    username: user.username,
    passwordhash: hashedPassword,
    gender: user.gender,
    mobile: user.mobile,
    email: user.email,
    pic: user.picture,
    profiletext: user.profiletext
  };

  const userSaved = await db.users.create(newUser);
  res.render('index', { message: 'Account created successfully' });
});

router.post("/home", async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let userLoggedIn = await checkLogin(username, password);

  if (userLoggedIn) {
    req.session.username = username;
    req.session.userid = userLoggedIn.userid;
    req.session.pic=userLoggedIn.pic;
    console.log("home"+req.session.username);
    res.render("home", { username: username, picture: userLoggedIn.pic });
  } else {
    res.render("index", { message: "Invalid credentials" });
  }
});

module.exports = router;
























































// Initialize the session middleware
// Database synchronization
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
// router.get('/createAccount', function(req, res, next) {
//   res.render('createAccount');
// });

// router.post('/createAccount',uploader.single('pic'),async function(req, res, next) { //27f
//   let userrcd={...req.body};        //spread operator is used which copies the object body .... userrcd is copy of req.body .....you can add in that 
 
//   userrcd.pic=req.file.path;//27f
//   console.log('userrcd',userrcd);
//   let usercreated=await createUser(userrcd);
//   //redirect it to home user created to login 
//   res.redirect("/?message=user%20created")

//   //res.json({status : 'user created', ...userCreated});
// });


// router.post('/checkAvailability',async function(req, res, next) {
// let username=req.body.username;
// let user= await db.users.findOne({where:{username:username}})
// if(user !=null)           //user exists,username not available 
// {
//   res.json({available :false,username:username})
// }
// else{
//   res.json({available:true,username:username})
// }
// });



// // router.post('/home',async function(req, res, next) {
// //   //check the login id and password, if correct render home.ejs
// //   let username=req.body.username;
// //   res.render('home', { title: 'Express' });
// //   //else if failed login , render index.ejs with error message 
 
// // });

// router.post('/home',async function(req,res,next)
// {
//   //check login id and password,
//   //if correct render home.ejs, else don't
//     let usernames=req.body.username;
//     let password=req.body.password;
//     let userlogined=await checkLogin(usernames,password);
//     if(userlogined!=null){
//       //succes save the data in session
//       req.session.username;
//       req.session.logintime=new Date();
//       req.session.userid=userlogined.userid;
//       res.render('home',{username:username,pic:userlogined.pic});
//     }


// //   // let user= await db.users.findOne({where:{username:usernames}})
// //   // if(checkLogin(username,password)!=null)//aise hota but aise nhi krna if user&& user.passwordhash==password
// //   // {//ye line 23 if wali nhi chlegi promise null saath pele hi check krliya so ab
  
// //   if (user && user.passwordhash === password) 
// //   {  
// //     res.render('home',{username:usernames})

// //   // res.render('home', {message: 'Expbojlnolnress'});



//   //else if failed login. ewnder index.ejs with message
//   //else redirect to homepage and
//   else{
//     res.render('index', { message:"invalid credentials"});
//   }
// }),

// module.exports = router;




// // var express = require('express');
// // var router = express.Router();

// // const multer=require('multer');
// // const uploader=multer({dest:'./uploads'}) //line 4 n 5 27f

// // const db=require('../models');
// // db.sequelize.sync();

// // /* GET home page. */
// // router.get('/', function(req, res, next) {
// //   res.render('index', { message:"credent"});
// // //ye bs ek baar test krne ke liye hai
// // // router.get("/usertest",async function(req, res, next) {
// // //   let users=await db.users.findAll({});
// // //   res.send(users);
// // });

// // router.post('/home',function(req,res,next)
// // {
// //   //check login id and password,
// //   //if correct render home.ejs, else don't
// //   let usernames=req.body.username;
// //   let password=req.body.password;
// //   // let userlogined=await 
// //   // let user= await db.users.findOne({where:{username:usernames}})
// //   // if(checkLogin(username,password)!=null)//aise hota but aise nhi krna if user&& user.passwordhash==password
// //   // {//ye line 23 if wali nhi chlegi promise null saath pele hi check krliya so ab
// //   // if(checkLogin(username,password)!=null)
// //   // {
// //   if (user && user.passwordhash === password) 
// //   {  
// //     res.render('home',{username:usernames})
// //   }
// //   // res.render('home', {message: 'Expbojlnolnress'});
// //   //else if failed login. ewnder index.ejs with message
// //   //else redirect to homepage and
// //   else{
// //     res.render('index', { message:"invalid credentials"});
// //   }
// // }),

// // module.exports = {router}
