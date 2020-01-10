const configsRouter =  require('express').Router();

module.exports = (wagner) => { 

    const unitpriceCntrl = wagner.invoke((Unitprice)=>require('../controllers/unit_price.controller')(Unitprice));

    //setFech 
    configsRouter.post("/saveunitprice",(req,res)=>{
        unitpriceCntrl.savePrice(req,res);
    });
    //getFecAnt
    configsRouter.get("/getunitprice",(req,res)=>{
        unitpriceCntrl.getUltPrice(req,res);
    });

    return configsRouter;
}