const plantsRouter =  require('express').Router();

module.exports = (wagner) => { 

    const plantCtrl = wagner.invoke((Plant)=>require('../controllers/plants.controller')(Plant));

    //Nueva planta
    plantsRouter.post("/create",(req,res)=>{
        plantCtrl.newPlanta(req,res);
    });
    //Agregar linea
    plantsRouter.put("/addline/:id",(req,res)=>{
        plantCtrl.addLine(req,res);
    });
    //Get plantas
    plantsRouter.get("/getall",(req,res)=>{
        plantCtrl.getAll(req,res);
    });
    //Get plantas por cliente
    plantsRouter.get("/getplants/:id",(req,res)=>{
        plantCtrl.getByClient(req,res)
    });
    //Get plantas por id
    plantsRouter.get("/getplant/:id",(req,res)=>{
        plantCtrl.getById(req,res)
    });
    //Get lineas por plantas
    plantsRouter.get("/getlines/:id",(req,res)=>{
        plantCtrl.getLinesByClient(req,res)
    });
    //Update bosss
    plantsRouter.put("/update",(req,res)=>{
        plantCtrl.update(req,res);
    });
    //Disable
    plantsRouter.patch("/disable/:id",(req,res)=>{//ok!
        plantCtrl.disable(req,res);
    });
    //Enable
    plantsRouter.patch("/enable/:id",(req,res)=>{//ok!!
        plantCtrl.enable(req,res);
    });

    return plantsRouter;
}