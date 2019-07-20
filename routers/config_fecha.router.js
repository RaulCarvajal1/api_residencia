const configsRouter =  require('express').Router();

module.exports = (wagner) => { 

    const configCtrl = wagner.invoke((Config)=>require('../controllers/config_fecha.controller')(Config));

    //setFech 
    configsRouter.post("/setfech",(req,res)=>{
        configCtrl.setFech(req,res);
    });
    //change
    configsRouter.put("/changefech",(req,res)=>{
        configCtrl.change(req,res);
    });
    //getFecAnt
    configsRouter.get("/getfech",(req,res)=>{
        configCtrl.getFecAnt(req,res);
    });

    return configsRouter;
}