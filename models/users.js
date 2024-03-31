//ye database ko connect krne ke liye hai

//function employee(sequelize,DataTypes)
//{}
//module.Exports
const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports =(sequelize,DataTypes)=> //it lambda expresiion is a funvtion 
//seqlize is an authencticted sqlize object
{
    //have to change 

    const users = sequelize.define("users",
    {
        userid : {
            type: DataTypes.INTEGER, 
            primaryKey : true, 
            autoIncrement : true //change kiya

        },
        username: DataTypes.STRING,
        passwordhash: DataTypes.STRING,
        gender: DataTypes.STRING,
        mobile: DataTypes.STRING,
        email: DataTypes.STRING,
        pic: DataTypes.STRING,
        profiletext: DataTypes.STRING,
        },
        proffesion:DataTypes
        {
            tableName: "users",
            timestamps: false, // no created at & no updated at in the table
        }

);
       return users;
};
//index.js line 30 mie ye pehle diya hua hai alg se usme dalne ki no need l