let _agreement

//saveContrato
const saveContrato = (req, res) => {
    const contrato = req.body;
    _agreement.create(contrato)
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

//getContratoById
const getContratoById = (req, res) => {
    const id = req.params.id;
    _agreement.findOne({ _id : id })
        .then(agreement => {
            res.status(200);
            res.json({
                code: 200,
                detail: agreement
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

//getContratoByClient
const getContratoByClient = (req, res) => {
    const id = req.params.id;
    _agreement.find({ client : id })
        .then(agreement => {
            res.status(200);
            res.json({
                code: 200,
                detail: agreement
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

//getContratoByEmg
const getContratoByEmg = (req, res) => {
    const id = req.params.id;
    _agreement.findOne({ client : id })
        .then(agreement => {
            res.status(200);
            res.json({
                code: 200,
                detail: agreement
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

//getContratos
const getContratos = (req, res) => {
    _agreement.find()
        .then(agreements => {
            res.status(200);
            res.json({
                code: 200,
                detail: agreements
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

const getContratosActivos = (req, res) => {
    _agreement.find({ status : true })
        .then(agreements => {
            res.status(200);
            res.json({
                code: 200,
                detail: agreements
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

const getContratosActivosByClient = (req, res) => {
    const id = req.params.id;
    _agreement.find({ status : true, client : id })
        .then(agreements => {
            res.status(200);
            res.json({
                code: 200,
                detail: agreements
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
//addEmg
const addEmg = (req, res) => {
    const id = req.params.id;
    const emgid = req.body;
    _agreement.update({ _id : id },{ $push : { emgs : emgid }})
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

//Vencer contrato por id
const vencerContrato = (req, res) => {
    const id = req.params.id;
    _agreement.update({ _id : id },{ $set : { status : false }})
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
//Restar monto de contrato por id
const restarContrato = (req, res) => {
    const id = req.params.id;
    const total = req.body.total;
    _agreement.update({ _id : id },{ $set : { monto_actual : total }})
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

const actualizarContrato = (req, res) => {
    const body = req.body;
    _agreement.updateOne(
            { _id : body._id },
            { $set : 
                {
                    client : body.client,
                    description : body.description,
                    name : body.name,
                    period : body.period,
                    monto : body.monto,
                    monto_actual : body.monto_actual,
                    conceptos : body.conceptos,
                    divisa : body.divisa
                }
            }
        )
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
}

module.exports = (Agreement) => {
    _agreement = Agreement;
    return ({
        saveContrato, getContratoById, getContratoByClient, getContratoByEmg, getContratos, addEmg, getContratosActivos, getContratosActivosByClient,vencerContrato,restarContrato, actualizarContrato
    })
}