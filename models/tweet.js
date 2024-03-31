//ye database ko connect krne ke liye hai
const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
//function employee(sequelize,DataTypes)
//{}
//module.Exports
module.exports =(sequelize,DataTypes)=> //it lambda expresiion is a funvtion 
//seqlize is an authencticted sqlize object
{
    const tweet = sequelize.define(
        "tweet",
        {
          twid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          twtext: DataTypes.STRING,
          userid: DataTypes.INTEGER,
          media: DataTypes.STRING(1000),
          numlikes: {
            type:DataTypes.INTEGER,
            default:0
          },
          numretweets:{
            type:DataTypes.INTEGER,
            default:0
          },
          twtime:{
             type:DataTypes.DATE,
             defaultValue: DataTypes.NOW
            }
        },
        {
          tableName: "tweet",
          timestamps: false,////////false, // no created at & no updated at in the table
       
             // timestamps: false //change kiya
            //  createdAt: "twtime",//new to know indian nhi gmt ke hisaab se
            //  updatedAt: false //dont need this field in our table

        }
      );
      return tweet;
    };


    










































//     const users = sequelize.define("tweet",
//     {
//         tweetid : {
//             type: DataTypes.INTEGER, 
//             primaryKey : true, 
//             autoIncrement : true //change kiya

//         },
//         twtext : {//changes hone abhi
//             type: DataTypes.INTEGER, 
//             primaryKey : true, 

//         },
//         passwordhash : {
//             type:DataTypes.STRING,
//             allowNull:false
//         },
//         media: DataTypes.STRING,
//         // numlikes:{},""
//         // email:DataTypes.STRING,
//         // gender: DataTypes.STRING,

// },{
//             tablename:'tweet',
//             // timestamps: false //change kiya
//             createdAt: "twtime",//new to know indian nhi gmt ke hisaab se
//             updatedAt: false //dont need this field in our table

//     })
//        return users;
// }
// //index.js line 30 mie ye pehle diya hua hai alg se usme dalne ki no need l