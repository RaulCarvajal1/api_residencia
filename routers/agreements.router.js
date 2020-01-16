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
        agreementControllers.getContratos(req,res);
    })
    agreementRouter.get("/getcontratosactivos",(req,res)=>{
        agreementControllers.getContratosActivos(req,res);
    })
    agreementRouter.get("/getcontratosactivosbyclient/:id",(req,res)=>{
        agreementControllers.getContratosActivosByClient(req,res);
    })
    //addEmg
    agreementRouter.put("/addemg/:id",(req,res)=>{
        agreementControllers.addEmg(req,res);
    })

    agreementRouter.put("/vencer/:id",(req,res)=>{
        agreementControllers.vencerContrato(req,res);
    })
    agreementRouter.put("/restar/:id",(req,res)=>{
        agreementControllers.restarContrato(req,res);
    })

    agreementRouter.put("/actualizar",(req,res)=>{
        agreementControllers.actualizarContrato(req,res);
    })
    
    return agreementRouter;
}