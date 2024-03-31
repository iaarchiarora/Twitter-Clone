const db=require('../models');
const{comparePass}=require("./bcryptService");
  
const checkLogin=async(username,password)=>{
        // console.log('req:'+username+','+password);
        let user = await db.users.findOne({ where: { username: username } });
        if(user){
          var equalpass = await comparePass(password,user.passwordhash);
        }
        if (user!=null && equalpass) {
          return user;
        }
        
        else return undefined;
      };
      module.exports = { checkLogin };