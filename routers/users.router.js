const userRouter = require('express').Router();

module.exports = (wagner) =>{

    const userCtrl = wagner.invoke((User)=>require('../controllers/users.controller')(User));
    
    //Create user
    userRouter.post("/create",(req,res)=>{//ok!
        userCtrl.newu(req,res);
    });
    //Login
    userRouter.post("/login",(req,res)=>{//ok!
        userCtrl.login(req,res);
    });
    //Get all users
    userRouter.get("/getall",(req,res)=>{//ok!
        userCtrl.getAll(req,res);
    });
    //Get users by role
    userRouter.get("/getbybole/:role",(req,res)=>{//ok!
        userCtrl.getByRole(req,res);
    });
    //Get users by id
    userRouter.get("/getbyid/:id",(req,res)=>{//ok!
        userCtrl.getById(req,res); 
    });
    //Update
    userRouter.put("/update",(req,res)=>{//ok!
        userCtrl.updateu(req,res);
    });
    //Disable
    userRouter.patch("/disable/:id",(req,res)=>{//ok!
        userCtrl.disable(req,res);
    });
    //Enable
    userRouter.patch("/enable/:id",(req,res)=>{//ok!!
        userCtrl.enable(req,res);
    });

    return userRouter;
}