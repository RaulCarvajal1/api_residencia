const machineRouter = require('express').Router();

module.exports = (wagner) => {

    const machineCtrl = wagner.invoke((Machine)=>require('../controllers/machines.controller')(Machine));  


    //Crear maquinaria
    machineRouter.post("/newemg",(req,res)=>{ //ok!
        machineCtrl.newMachine(req,res);
    });
    //Inhabilitar maquinaria
    machineRouter.patch("/inactivate/:id", (req, res) => {//ok!
        machineCtrl.setInactive(req,res);
    });
    //Habilitar maquinaria
    machineRouter.patch("/activate/:id", (req, res) => {//ok!
        machineCtrl.setActive(req,res);
    });
    //Actualizar maquinaria
    machineRouter.put("/updateemg",(req,res)=>{//ok!
        machineCtrl.updateMachine(req,res);
    });
    //Leer toda la maquinaria
    machineRouter.get("/getallemg",(req,res)=>{//ok!
        machineCtrl.getAll(req,res);
    });
    //Leer maquinaria por cliente
    machineRouter.get("/getbyclient/:client_id",(req,res)=>{//ok!
        machineCtrl.getByClient(req,res);
    });
    //Leer un equipo en especifico
    machineRouter.get("/getbyid/:id",(req,res)=>{//ok!
        machineCtrl.getById(req,res);
    });
    //Crear servicio
    machineRouter.patch("/newservice/:id", (req, res) => {//ok!
        machineCtrl.addService(req,res);
    });
    //Ver todos los servicios
    machineRouter.get("/getallservices",(req,res)=>{//ok!
        machineCtrl.getAllServices(req,res);
    });
    //Ver servicios por máquina
    machineRouter.get("/getallservicesbyemg/:id",(req,res)=>{//ok!
        machineCtrl.getAllServicesByMachine(req,res);
    });
    //Ver servicio
    machineRouter.get("/getservice/:id/:sid",(req,res)=>{//Falta!
        machineCtrl.getService(req,res);
    });

    return machineRouter;
}