const status = require('http-status');
const sgMail = require('@sendgrid/mail');
const akmail = require('./api_key/sndgrd');

let _service;

//get todos los servicios
const getAll = (req, res) => {
    _service.find({})
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
                code: status[400],
                detail: error
            });
        });
};
//get servicios por cliente
const getByClient = (req, res) => {
    const idclient = req.params.idclient;
    _service.find({ client : idclient })
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
//get servicios por tecnico
const getByTec = (req, res) => {
    const idtec = req.params.idtec;
    _service.find({ tecnico : idtec })
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
};
//get servicios por equipo emg
const getByEmg = (req, res) => {
    const idemg = req.params.idemg  ;
    _service.find({ emg : idemg })
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
};
//get servicio por id
const getById = (req, res) => {
    const id = req.params.id;
    _service.findOne({ _id: id })
        .then(service => {
            res.status(200);
            res.json({
                code: 200,
                detail: service
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
//add servicio (Aqui se asigna fecha programada y tecnico)
const newServ = (req, res) => {
    const service = req.body;
    _service.create(service)
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
//asignar tecnico
const asigtecServicio = (req, res) => {
    const id_s = req.params.id_s;
    const id_t = req.params.id_t;
    const date = req.body;
    _service.update({ _id: id_s },{$set : 
                                { 
                                    status : 1,
                                    tecnico : id_t,
                                    date : date.date
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
};
//iniciar servicio
const iniciarServicio = (req, res) => {
    const id = req.params.id;
    _service.update({ _id: id },{$set : { 
                                        start : Date.now(),
                                        status : 2
                                    }})
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
//finalizar servicio
const finalizarServicio = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    _service.update({ _id: id },{$set : { 
                                        start : Date.now,
                                        status : 3,
                                        signature : data.signature,
                                        score : data.score
                                    }})
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

//Envio de correos 
//Solicitar servicio
/*
    {   
        email
        name,
        client,
        datetime,
        id
    }
*/
const emailSolicitarServicio=(req,res)=>{
    const data = req.body;
    sgMail.setApiKey(akmail.SENGRID_APIKEY);
    const msg = {
      to: data.email,
      from: akmail.sender_email,
      subject: 'Servicio EMG solicitado',
      text: 'Mantenimiento EMG',
      html: getSolicitarServicioHtml(data)
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
function getSolicitarServicioHtml(data){
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
                                                    <h2>¡Hola ${data.name}!</h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                <p>Se ha sido registrado una nueva solicitud de servicio en el sistema de Mantenimiento EMG.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Por favor accede a tu cuenta para que asignes el técnico adecuado para que realice el servicio</p>
                                                    <p>Datos del servicio</p>
                                                    <ul>
                                                        <li><b>Cliente que solicita:</b> ${data.client}</li>
                                                        <li><b>Fecha y hora solicitada:</b> ${data.date}</li>
                                                        <li><b>Id de servicio:</b> ${data.id}</li>
                                                    </ul>
                                                    <p>Inicia sesión aqui LINK_APP</p>
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
//Programar servicio, envio de dos correos a cliente y a técnico
/*
{
    email_tecnico : "",
    email_cliente : "",
    nameTec : "",
    nameCli : "",
    date : "",
    id : ""
}
*/
const emailProgramarServicio=(req,res)=>{
    const data = req.body;
    sgMail.setApiKey(akmail.SENGRID_APIKEY);
    const msgTecnico = {
      to: data.email_tecnico,
      from: akmail.sender_email,
      subject: 'Servicio EMG programado',
      text: 'Mantenimiento EMG',
      html: getProgramarServicioHtmlTecnico(data)
    };
    const msgCliente = {
        to: data.email_cliente,
        from: akmail.sender_email,
        subject: 'Servicio EMG programado',
        text: 'Mantenimiento EMG',
        html: getProgramarServicioHtmlCliente(data)
    };
    sgMail.send(msgTecnico).then(
        data => {
            sgMail.send(msgCliente).then(
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
function getProgramarServicioHtmlTecnico(data){
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
                                                    <h2>¡Hola ${data.nameTec}!</h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Se te ha sido registrado un nuevo servicio en el sistema de Mantenimiento EMG.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Por favor accede a tu cuenta para que revises el nuevo servicio que se te ha sido asignado</p>
                                                    <p>Datos del servicio</p>
                                                    <ul>
                                                        <li><b>Cliente que solicita:</b> ${data.nameCli}</li>
                                                        <li><b>Fecha y hora:</b> ${data.date}</li>
                                                        <li><b>Id de servicio:</b> ${data.id}</li>
                                                    </ul>
                                                    <p>Inicia sesión aquí LINK_APP</p>
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
function getProgramarServicioHtmlCliente(data){
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
                                                    <h2>¡Hola ${data.nameCli}!</h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Se te ha sido registrado un nuevo servicio en el sistema de Mantenimiento EMG.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Por favor accede a tu cuenta para que revises el nuevo servicio que se te ha sido asignado</p>
                                                    <p>Datos del servicio</p>
                                                    <ul>
                                                        <li><b>Tecnico que realizara el servicio:</b> ${data.nameTec}</li>
                                                        <li><b>Fecha y hora:</b> ${data.date}</li>
                                                        <li><b>Id de servicio:</b> ${data.id}</li>
                                                    </ul>
                                                    <p>Inicia sesión aquí LINK_APP</p>
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
//Asignado servicio
/*
{
    email_tecnico : "",
    email_cliente : "",
    nameTec : "",
    nameCli : "",
    date : "",
    id : ""
}
*/
const emailAsigTecServicio=(req,res)=>{
    const data = req.body;
    sgMail.setApiKey(akmail.SENGRID_APIKEY);
    const msgTecnico = {
      to: data.email_tecnico,
      from: akmail.sender_email,
      subject: 'Servicio EMG programado',
      text: 'Mantenimiento EMG',
      html: getAsigTecServicioHtmlTecnico(data)
    };
    const msgCliente = {
        to: data.email_cliente,
        from: akmail.sender_email,
        subject: 'Servicio EMG programado',
        text: 'Mantenimiento EMG',
        html: getAsigTecServicioHtmlCliente(data)
    };
    sgMail.send(msgTecnico).then(
        data => {
            sgMail.send(msgCliente).then(
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
function getAsigTecServicioHtmlTecnico(data){
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
                                                    <h2>¡Hola ${data.nameTec}!</h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Se te ha sido registrado un nuevo servicio en el sistema de Mantenimiento EMG.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Por favor accede a tu cuenta para que revises los detalles  del nuevo servicio que se te ha sido asignado</p>
                                                    <p>Datos del servicio</p>
                                                    <ul>
                                                        <li><b>Cliente que solicita:</b> ${data.nameCli}</li>
                                                        <li><b>Fecha y hora:</b> ${data.date}</li>
                                                        <li><b>Id de servicio:</b> ${data.id}</li>
                                                    </ul>
                                                    <p>Inicia sesión aquí LINK_APP</p>
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
function getAsigTecServicioHtmlCliente(data){
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
                                                    <h2>¡Hola ${data.nameCli}!</h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Se ha asignado un técnico a tu servicio solicitado en el sistema de Mantenimiento EMG.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p>Por favor accede a tu cuenta para que revises los detalles del servicio que se te ha sido asignado</p>
                                                    <p>Datos del servicio</p>
                                                    <ul>
                                                        <li><b>Tecnico que realizara el servicio:</b> ${data.nameTec}</li>
                                                        <li><b>Fecha y hora:</b> ${data.date}</li>
                                                        <li><b>Id de servicio:</b> ${data.id}</li>
                                                    </ul>
                                                    <p>Inicia sesión aquí LINK_APP</p>
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

module.exports = (Service) => {
    _service = Service;
    return ({
        getAll, getByClient, getByTec, getByEmg, getById, newServ, asigtecServicio, iniciarServicio, finalizarServicio, emailSolicitarServicio, emailProgramarServicio, emailAsigTecServicio
    });
}