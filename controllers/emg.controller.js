let _emg

//Get todos
const getAll = (req, res) => {
    _emg.find({})
        .then(emgs => {
            res.status(200);
            res.json({
                code: 200,
                detail: emgs
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
//Get by id
const getById = (req, res) => {
    const id = req.params.id;
    _emg.findOne({ _id: id })
        .then(emg => {
            res.status(200);
            res.json({
                code: 200,
                detail: emg
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
//Get by client
const getByClient = (req, res) => {
    const idclient = req.params.id;
    _emg.find({ client : idclient })
        .then(emgs => {
            res.status(200);
            res.json({
                code: 200,
                detail: emgs
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
//Get by plant
const getByPlant = (req, res) => {
    const idplant = req.params.id;
    _emg.find({ plant : idplant })
        .then(emgs => {
            res.status(200);
            res.json({
                code: 200,
                detail: emgs
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
//Get by line
const getByLine = (req, res) => {
    const idline = req.params.id;
    _emg.find({ line : idline })
        .then(emgs => {
            res.status(200);
            res.json({
                code: 200,
                detail: emgs
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
//New emg
const newEmg = (req, res) => {
    const emg = req.body;
    _emg.create(emg)
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
//Disable
const disable = (req, res) => {
    const id = req.params.id;
    _emg.update({ _id: id },{$set : { active : false}})
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
    _emg.update({ _id: id },{$set : { active : true}})
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

module.exports = (Emg) => {
    _emg = Emg;
    return ({
        getAll, getById, getByClient, getByPlant, getByLine, newEmg, disable, enable
    })
}