const status = require('http-status');

let _machine;

//Get all EMG machines
const getAll = (req, res) => {
    _machine.find({})
        .then(machines => {
            res.status(200);
            res.json({
                code: 200,
                detail: machines
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

//Get one EMG machine by id
const getById = (req, res) => {
    const id = req.params.id;
    _machine.findOne({ _id: id })
        .then(machine => {
            res.status(200);
            res.json({
                code: 200,
                detail: machine
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

//Get one EMG machine by client
const getByClient = (req, res) => {
    const client_id = req.params.client_id;
    _machine.find({ client: client_id })
        .then(data => {
            res.status(200);
            res.json({
                code: 200,
                detail: data
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

//Create new machine
const newMachine = (req, res) => {
    const machine = req.body;
    _machine.create(machine)
        .then(data => {
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

//Update
const updateMachine = (req, res) => {
    const machine = req.body;
    _machine.update({ _id: machine.id },
        {$set : { info : machine.info,
                  location : machine.location,
                  client : machine.client}})
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

//Deshabilitar
const setInactive = (req, res) => {
    const id = req.params.id;
    _machine.update({ _id: id },{$set : { active : false}})
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

//habilitar
const setActive = (req, res) => {
    const id = req.params.id;
    _machine.update({ _id: id },{$set : { active : true}})
        .then(data =>{
            console.log(data);
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

//addService
const addService = (req, res) => {
    const id = req.params.id;
    console.log(req);
    _machine.update({ _id: id },{$push : { services : req.body.service}})
        .then(data =>{
            console.log(data);
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

//Get all services of any machine
const getAllServicesByMachine = (req, res) => {
    const id = req.params.id;
    _machine.findOne({ _id: id },'services')
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

//Get all services of all machines
const getAllServices = (req, res) => {
    _machine.find({},'services')
        .then(machines => {
            res.status(200);
            res.json({
                code: status[201],
                detail: machines
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

//Get only one service
const getService = (req, res) => {
    const id = req.params.id;
    const sid = req.params.sid;
    _machine.findOne({ _id: id},'services')
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


module.exports = (Machine) => {
    _machine = Machine;
    return ({
        getAll, getById, getByClient, newMachine, updateMachine, setActive, setInactive, addService, getAllServicesByMachine, getAllServices, getService
    });
}