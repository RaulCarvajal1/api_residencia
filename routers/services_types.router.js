const stRouter =  require('express').Router();

module.exports = (wagner) => { 

    const stCtrl = wagner.invoke((Tipos)=>require('../controllers/services_types.controller')(Tipos));

    //saveType 
    stRouter.post("/savest",(req,res)=>{
        stCtrl.saveType(req,res);
    });
    //delType
    stRouter.delete("/delst/:id",(req,res)=>{
        stCtrl.delType(req,res);
    });
    //getTypes
    stRouter.get("/getst",(req,res)=>{
        stCtrl.getTypes(req,res);
    });

    return stRouter;
}