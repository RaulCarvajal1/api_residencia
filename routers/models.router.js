const configsRouter =  require('express').Router();

module.exports = (wagner) => { 

    const modelsCtrl = wagner.invoke((Models)=>require('../controllers/models.controller')(Models));

    //save
    configsRouter.post("/save",(req,res)=>{
        modelsCtrl.save(req,res);
    });
    //getById
    configsRouter.get("/get/:id",(req,res)=>{
        modelsCtrl.getById(req,res);
    });
    //get
    configsRouter.get("/get",(req,res)=>{
        modelsCtrl.get(req,res);
    });

    return configsRouter;
}