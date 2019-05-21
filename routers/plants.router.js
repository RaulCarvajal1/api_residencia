const plantsRouter =  require('express').Router();

module.exports = (wagner) => { 

    const plantsCtrl = wagner.invoke((Plant)=>require('../controllers/plants.controller')(Plant))

    //Nueva planta
    plantsRouter.post("/create",(req,res)=>{
        plantsCtrl.newPlanta(req,res);
    })
    //Agregar linea
    plantsRouter.put("/addline/:id",(req,res)=>{
        plantsCtrl.addLine(req,res);
    })
    //Get plantas por cliente
    plantsRouter.get("/getplants/:id",(req,res)=>{
        plantsCtrl.getByClient(req,res)
    })
    //Get lineas por plantas
    plantsRouter.get("/getlines/:id",(req,res)=>{
        plantsCtrl.getByClient(req,res)
    })
    //Update bosss
    plantsRouter.put("/updateboss/:id",(req,res)=>{
        plantsCtrl.updateBoss(req,res);
    })
    //Disable
    plantsRouter.patch("/disable/:id",(req,res)=>{//ok!
        plantsCtrl.disable(req,res);
    });
    //Enable
    plantsRouter.patch("/enable/:id",(req,res)=>{//ok!!
        plantsCtrl.enable(req,res);
    });

    return plantsRouter;
}