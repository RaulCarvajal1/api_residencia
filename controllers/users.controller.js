const status = require('http-status');

let _user;

//Add user
const newUser = (req, res) => {
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

//Login ??
const login = (req, res) => {
    const body = req.body;
    _user.findOne({ username : body.username })
        .then(user => {
            if(user.password == body.password && user.active==true){
                res.status(200);
                res.json({
                    code: 200,
                    authorized: true,
                    detail : user
                });
            }else{
                res.status(200);
                res.json({
                    code: 200,
                    authorized: false,
                    msg : "Usuario inexistente o inactivo"
                });
            }
        })
        .catch(error => {
            res.status(400);
            res.json({
                code: 400,
                detail: error
            });
        });
}

//Get users
const getAll = (req, res) => {
    _user.find({})
        .then(users => {
            res.status(200);
            res.json({
                code: 200,
                detail: users
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

//Get user by id
const getById = (req, res) => {
    const id = req.params.id;
    _user.findOne({ _id: id })
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

//Get users tec
const getTec = (req, res) => {
    _user.find({role : 1},'info')
        .then(users => {
            res.status(200);
            res.json({
                code: 200,
                detail: users
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

//Update
const updateu = (req, res) => {
    const user = req.body;
    console.log(req);
    _user.update({ _id: user.id },
        {$set : { 
                  username : user.username,
                  password : user.password,
                  info : user.info 
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

//Disable
const disable = (req, res) => {
    const id = req.params.id;
    _user.update({ _id: id },{$set : { active : false}})
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
    _user.update({ _id: id },{$set : { active : true}})
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

//Modificar permisos
const modPermissions = (req, res) => {
    const id = req.params.id;
    const perm = req.body.perm;
    _user.update({ _id: id },{$set : { permissions : perm}})
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

module.exports = (User) => {
    _user = User;
    return ({
        newUser, login, getAll, getTec, getById, updateu, disable, enable, modPermissions
    });
}  