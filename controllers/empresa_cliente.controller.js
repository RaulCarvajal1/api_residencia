let _clients


//Save Client
const saveClient = (req, res) => {
    const client = req.body;
    _clients.create(client)
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

//Get Clients
const getClients = (req, res) => {
    _clients.find()
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

//Get by id
const getClient = (req, res) => {
    let id = req.params.id;
    _clients.findOne({ _id : id})
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

//Disable
const disable = (req, res) => {
    const id = req.params.id;
    _clients.update({ _id: id },{$set : { status : false}})
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
    _clients.update({ _id: id },{$set : { status : true}})
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

module.exports = (Client) => {
    _clients = Client;
    return ({
        saveClient, getClients, disable, enable, getClient
    })
}