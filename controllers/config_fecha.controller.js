let _config_fecha

//Get fecha
const getFecAnt = (req, res) => {
    _config_fecha.findOne({ name : "fecha" })
        .then(fecant => {
            res.status(200);
            res.json({
                code: 200,
                detail: fecant
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
//Setfecha
const setFech = (req, res) => {
    _config_fecha.create({value : false})
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
//Change value
const change = (req, res) => {
    const value = req.body;
    _config_fecha.update({ name : "fecha" },{ value : value.value})
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

module.exports = (Config_fecha) => {
    _config_fecha = Config_fecha;
    return ({
        setFech, getFecAnt, change
    })
}