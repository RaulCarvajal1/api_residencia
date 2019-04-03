const clientRouter = require('express').Router();

module.exports = (wagner) => {

    const clientCtrl = wagner.invoke((Clients)=>require('../controllers/clients.controller')(Clients));  

    //Create client
    clientRouter.post("/create",(req,res)=>{//ok!
        clientCtrl.newc(req,res);
    });

    //Get clients
    clientRouter.get("/getall",(req,res)=>{//ok!
        clientCtrl.getAll(req,res);
    });

    //Get client
    clientRouter.get("/getone/:id",(req,res)=>{//ok!
        clientCtrl.getById(req,res);
    });

    //Get client list name
    clientRouter.get("/getnames",(req,res)=>{//ok!
        clientCtrl.getNames(req,res);
    });

    //Update client
    clientRouter.put("/update",(req,res)=>{//ok!
        clientCtrl.updatec(req,res);
    });

    //Disable
    clientRouter.patch("/disable/:id",(req,res)=>{//ok!
        clientCtrl.disable(req,res);
    });

    //Enable
    clientRouter.patch("/enable/:id",(req,res)=>{//ok!
        clientCtrl.enable(req,res);
    });

    return clientRouter;

}