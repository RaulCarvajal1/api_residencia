const status = require('http-status');
const sgMail = require('@sendgrid/mail');
const akmail = require('./api_key/sndgrd');
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
//
const emailNewUser=(req,res)=>{
    const data = req.body;
    sgMail.setApiKey(akmail.SENGRID_APIKEY);
    const msg = {
      to: data.email,
      from: akmail.sender_email,
      subject: 'Mantenimiento EMG',
      text: 'Mantenimiento EMG',
      html: getHtml(data)
    };
    sgMail.send(msg).then(
        data => {
            res.json({
                code : 200,
                detail : data
            })
        }
    ).catch(
        err => {
            res.json({
                code : 400,
                detail : err
            });
            console.log(err);
        }
    );
};
function getHtml(data){
    return `<body style="margin: 0; padding: 0; font-family:sans-serif;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td>
                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
                                <tr>
                                    <td bgcolor="#00465C" align="center" style="padding: 40px 0 30px 0;">
                                        <img src="http://secureservercdn.net/166.62.108.22/t5v.a77.myftpupload.com/wp-content/uploads/2018/09/logo_.jpg" alt="TecnoapLogo" style="display: block;" >
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor="#E9EBED" style="padding: 40px 30px 40px 30px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td aling="center">
                                                    <h2>Bienvenido ${data.name}</h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                <p>Has sido registrado exitosamente en el sistema de Mantenimiento EMG</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Para activar tu cuenta da click aquí ${akmail.api_url+'user/activar/'+data.id}</p>
                                                    <ul>
                                                        <li><b>Nombre de usuario:</b> ${data.username}</li>
                                                        <li><b>Contraseña:</b> ${data.password}</li>
                                                    </ul>
                                                    <p>Inicia sesión aqui LINK_APP</p>
                                                    <p>Se te recomienda cambiar de usuario y contraseña en tu primer inicio de sesión, por motivos de seguridad.</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td bgcolor="#FFFFFF" align="center" style="padding: 40px 0 30px 0;">
                                        <img src="https://www.emg-automation.com/typo3conf/ext/billiton_template/Resources/Public/Images/logo.png" alt="EMGLogo" style="display: block;" >
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>`;
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
};
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
//Get users admin
const getAdmin = (req, res) => {
    _user.findOne({role : 0},'info')
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
//Get users clients
const getClients = (req, res) => {
    _user.find({role : 2})
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
//Get users clients names
const getClientsNames = (req, res) => {
    _user.find({role : 2},'info.name')
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
    _user.update({ _id: user._id },
        {$set : { 
                  username : user.username,
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
//Update pasword
const updatePass = (req, res) => {
    const user = req.body;
    console.log(req);
    _user.update({ _id: user._id },
        {$set : { 
                  password : user.password,
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
//email enable
const email_enable = (req, res) => {
    const id = req.params.id;
    _user.update({ _id: id },{$set : { active : true}})
        .then(data =>{
            res.status(200);
            res.send("¡Usuario exitosamente activado!");
        })
        .catch(error =>{
            console.log(error);
            res.status(400);
            res.send("¡Error durante la activación!");
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
//usuarioexiste
const existe = (req, res) => {
    const name = req.params.name;
    _user.findOne({ username: name })
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
};
module.exports = (User) => {
    _user = User;
    return ({
        newUser, login, getAll, getTec, getById, updateu, disable, enable, modPermissions, emailNewUser, existe, getClients, updatePass, getClientsNames, email_enable, getAdmin
    });
}