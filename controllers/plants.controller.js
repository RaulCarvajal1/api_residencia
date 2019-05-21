const status = require('http-status');

let _plant

//newPlanta
const newPlanta = (req, res) => {
    const plant = req.body;
    _plant.create(plant)
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
//Add line
const addLine = (req, res) => {
    const id = req.params.id;//Line id
    const line = req.body;
    _plant.update({ _id: id },{ $push: { lines : line }})
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
}
//Get plantas by client
const getByClient = (req, res) => {
    const id = req.params.id  ;
    _plant.find({ _id : id })
        .then(plant => {
            res.status(200);
            res.json({
                code: 200,
                detail: plant
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
//Get lines by plant 
const getLinesByClient = (req, res) => {
    const id = req.params.id;
    _plant.find({ _id : id }, 'lines')
        .then(plants => {
            res.status(200);
            res.json({
                code: 200,
                detail: plants
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
//Update boss
const updateBoss = (req, res) => {
    const id = req.params.id;
    const bossp = req.body.boss;
    _plant.update({ _id: id },{$set : {boss : bossp}})
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
//Disable
const disable = (req, res) => {
    const id = req.params.id;
    _plant.update({ _id: id },{$set : { active : false}})
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
//Enable
const enable = (req, res) => {
    const id = req.params.id;
    _plant.update({ _id: id },{$set : { active : true}})
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

module.export = (Plant) => {
    _plant = Plant;
    return ({
        newPlanta, addLine, getByClient, getLinesByClient, updateBoss, disable, enable
    })
}