let _iva

//Get fecha
const getUltIva = (req, res) => {
    _iva.findOne()
        .sort({ last_mod : -1 })
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
const saveIva = (req, res) => {
    let data = req.body
    _iva.create(data)
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

module.exports = (Iva) => {
    _iva = Iva;
    return ({
        getUltIva,saveIva
    })
}