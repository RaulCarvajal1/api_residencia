const status = require('http-status');

let _service;


//get todos los servicios
const getAll = (req, res) => {
    _service.find({})
        .then(services => {
            res.status(200);
            res.json({
                code: 200,
                detail: services
            });
        })
        .catch(error => { 
            res.status(400);
            res.json({
                code: status[400],
                detail: error
            });
        });
};
//get servicios por cliente
const getByClient = (req, res) => {
    const idclient = req.params.idclient;
    _service.find({'owner.client' : idclient })
        .then(user => {
            res.status(200);
            res.json({
                code: 200,
                detail: user
            });
        })
        .catch(error => {
            res.status(400);
            res.json({
                code: 400,
                detail: error
            });
        });
}
//get servicios por tecnico
const getByTec = (req, res) => {
    const idtec = req.params.idtec;
    _service.find({ tecnico : idtec })
        .then(services => {
            res.status(200);
            res.json({
                code: 200,
                detail: services
            });
        })
        .catch(error => {
            res.status(400);
            res.json({
                code: 400,
                detail: error
            });
        });
}
//get servicios por equipo emg
const getByEmg = (req, res) => {
    const idemg = req.params.idemg  ;
    _service.find({ emg : idemg })
        .then(services => {
            res.status(200);
            res.json({
                code: 200,
                detail: services
            });
        })
        .catch(error => {
            res.status(400);
            res.json({
                code: 400,
                detail: error
            });
        });
}
//get servicio por id
const getById = (req, res) => {
    const id = req.params.id;
    _service.findOne({ _id: id })
        .then(service => {
            res.status(200);
            res.json({
                code: 200,
                detail: service
            });
        })
        .catch(error => {
            res.status(400);
            res.json({
                code: 400,
                detail: error
            });
        });
}
//add servicio (Aqui se asigna fecha programada y tecnico)
const newServ = (req, res) => {
    const service = req.body;
    _service.create(service)
        .then(data => {
            console.log(data);
            res.status(200);
            res.json({
                code: 200,
                detail: data
            });
        })
        .catch(error => {
            console.log(error);
            res.status(400);
            res.json({
                code: 400,
                detail: error
            });
        });
};
//asignar tecnico
const asigtecServicio = (req, res) => {
    const id = req.params.id;
    const tecid = req.body.tecid;
    _user.update({ _id: id },{$set : { 
                                        start : Date.now,
                                        status : 1,
                                        tecnico : tecid
                                      }})
        .then(data =>{
            res.status(200);
            res.json({
                code: 200,
                detail: data
            });
        })
        .catch(error =>{
            console.log(error);
            res.status(400);
            res.json({
                code: 400,
                detail: error
            });
        });    
};
//iniciar servicio
const iniciarServicio = (req, res) => {
    const id = req.params.id;
    _user.update({ _id: id },{$set : { 
                                        start : Date.now,
                                        status : 2
                                    }})
        .then(data =>{
            res.status(200);
            res.json({
                code: 200,
                detail: data
            });
        })
        .catch(error =>{
            console.log(error);
            res.status(400);
            res.json({
                code: 400,
                detail: error
            });
        });    
};
//finalizar servicio
const finalizarServicio = (req, res) => {
    const id = req.params.id;
    const sign = req.body.sign;
    _user.update({ _id: id },{$set : { 
                                        start : Date.now,
                                        status : 3,
                                        signature : sign
                                    }})
        .then(data =>{
            res.status(200);
            res.json({
                code: 200,
                detail: data
            });
        })
        .catch(error =>{
            console.log(error);
            res.status(400);
            res.json({
                code: 400,
                detail: error
            });
        });    
};

module.exports = (Service) => {
    _service = Service;
    return ({
        getAll, getByClient, getByTec, getByEmg, getById, newServ, asigtecServicio, iniciarServicio, finalizarServicio
    });
}