const qrcode = require('qrcode');
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
//Get by plant&line
const getByPlantAndLine = (req, res) => {
    const id_p = req.params.id_p;
    const id_l = req.params.id_l;
    _emg.find({$and:[{ plant : id_p},{line : id_l}]})
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
//Generate and save QR code emg
const genQrEmg = (req, res) => {
    const id = req.params.id;
    qrcode.toDataURL(id,{ errorCorrectionLevel: 'H' })
          .then(url => {
            _emg.update({ _id: id },{$set : { qr : url}})
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
          })
          .catch(err => {
            console.error(err)
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
//Edit
const edit = (req, res) => {
    const body = req.body;
    _emg.update(
        { _id: body._id },
        {$set : 
            { 
                info : body.info,
                meta : body.meta,
                client : body.client,
                plant : body.plant,
                cod_pro : body.cod_pro,
                status : 0,
                active : true
            }
        })
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

module.exports = (Emg) => {
    _emg = Emg;
    return ({
        getAll, getById, getByClient, getByPlant, getByLine, newEmg, disable, enable, genQrEmg, getByPlantAndLine, edit
    })
}