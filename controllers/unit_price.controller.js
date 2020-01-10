let _unit_price

//Get fecha
const getUltPrice = (req, res) => {
    _unit_price.findOne()
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
const savePrice = (req, res) => {
    let data = req.body
    _unit_price.create(data)
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

module.exports = (Unitprice) => {
    _unit_price = Unitprice;
    return ({
        getUltPrice, savePrice
    })
}