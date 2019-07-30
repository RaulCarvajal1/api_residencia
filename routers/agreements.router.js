const agreementRouter =  require('express').Router();

//saveContrato, getContratoById, getContratoByClient, getContratoByEmg, getContratos, addEmg

module.exports = (wagner) => { 

    const agreementControllers = wagner.invoke((Agreement)=>require('../controllers/agreements.controller')(Agreement));

    //saveContrato 
    agreementRouter.post("/savecontrato",(req,res)=>{
        agreementControllers.saveContrato(req,res);
    });
    //getContratoById
    agreementRouter.get("/getcontratobyid/:id",(req,res)=>{
        agreementControllers.getContratoById(req,res);
    });
    //getContratoByClient
    agreementRouter.get("/getcontratobyclient/:id",(req,res)=>{
        agreementControllers.getContratoByClient(req,res);
    });
    //getContratos
    agreementRouter.get("/getcontratos",(req,res)=>{
        agreementControllers.getContratoByClient(req,res);
    })
    //addEmg
    agreementRouter.put("/addemg/:id",(req,res)=>{
        agreementControllers.addEmg(req,res);
    })

    return agreementRouter;
}