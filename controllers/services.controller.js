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
    const id = req.params.idclient;
    _service.findOne({ owner.client : idclient })
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
    const id = req.params.idtecnico;
    _service.findOne({ tecnico : idtecnico })
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
//get servicios por equipo emg
const getByEmg = (req, res) => {
    const id = req.params.idemg  ;
    _service.findOne({ emg : idemg })
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
//get servicio por id
const getById = (req, res) => {
    const id = req.params.id;
    _service.findOne({ _id: id })
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
//add servicio (Aqui se asigna fecha programada y tecnico)
const newServ = (req, res) => {
    const user = req.body;
    _user.create(user)
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
//iniciar servicio
//finalizar servicio