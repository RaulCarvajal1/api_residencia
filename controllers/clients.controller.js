const status = require('http-status');

let _client;

//Create client
const newc = (req, res) => {
    const client = req.body;
    _client.create(client)
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
//Get clients
const getAll = (req, res) => {
    _client.find({})
        .then(clients => {
            res.status(200);
            res.json({
                code: 200,
                detail: clients
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
//Get client
const getById = (req, res) => {
    const id = req.params.id;
    _client.findOne({ _id: id })
        .then(client => {
            res.status(200);
            res.json({
                code: 200,
                detail: client
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
//Get client list name
const getNames = (req, res) => {
    _client.find({},'name')
        .then(clients => {
            res.status(200);
            res.json({
                code: 200,
                detail: clients
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
//Update client
const updatec = (req, res) => {
    const client = req.body;
    console.log(req);
    _client.update({ _id: client.id },
        {$set : { 
                  name : client.name,
                  contact : client.contact,
                  address : client.client
                }})
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
//Disable client
const disable = (req, res) => {
    const id = req.params.id;
    _client.update({ _id: id },{$set : { active : false}})
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
//Enable client
const enable = (req, res) => {
    const id = req.params.id;
    _client.update({ _id: id },{$set : { active : true}})
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
    _client = Client;
    return ({
        newc, getAll, getById, getNames, updatec, disable, enable
    });
}