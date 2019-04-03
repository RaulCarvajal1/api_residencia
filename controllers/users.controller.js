const status = require('http-status');

let _user;

//Create users
const newu = (req, res) => {
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
//Login
const login = (req, res) => {
    const body = req.body;
    _user.findOne({ username : body.username })
        .then(user => {
            if(user.password == body.password && user.active==true){
                res.status(200);
                res.json({
                    code: 200,
                    authorized: true,
                    role : user.role,
                    id : user._id
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
//Get users by role
const getByRole = (req, res) => {
    _user.find({role : req.params.role})
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
//Get user
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
//Update
const updateu = (req, res) => {
    const user = req.body;
    console.log(req);
    _user.update({ _id: user.id },
        {$set : { 
                  username : user.username,
                  password : user.password,
                  person : user.person
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

module.exports = (User) => {
    _user = User;
    return ({
        newu, login, getAll, getByRole, getById, updateu, disable, enable
    });
}