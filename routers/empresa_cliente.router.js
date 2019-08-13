const clienteRouter =  require('express').Router();

//saveClient, getClients, disable, enable

module.exports = (wagner) => { 

    const clienteCtrl = wagner.invoke((Clients)=>require('../controllers/empresa_cliente.controller')(Clients));

    //saveContrato 
    clienteRouter.post("/save",(req,res)=>{
        clienteCtrl.saveClient(req,res);
    });
    //getContratoById
    clienteRouter.get("/get",(req,res)=>{
        clienteCtrl.getClients(req,res);
    });
    //getContratoByClient
    clienteRouter.put("/enable/:id",(req,res)=>{
        clienteCtrl.enable(req,res);
    });
    //getContratos
    clienteRouter.put("/disable/:id",(req,res)=>{
        clienteCtrl.disable(req,res);
    })
    //getClient
    clienteRouter.get("/get/:id",(req,res)=>{
        clienteCtrl.getClient(req,res);
    });

    return clienteRouter;
}