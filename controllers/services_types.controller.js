let _tipos

//getTypes
const getTypes = (req, res) => {
    _tipos.find()
        .then(types => {
            res.status(200);
            res.json({
                code: 200,
                detail: types
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
//saveType
const saveType = (req, res) => {
    let n_type = req.body;
    _tipos.create(n_type)
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
//delType
const delType = (req, res) => {
    const id = req.params.id;
    _tipos.deleteOne({ _id : id })
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

module.exports = (Tipos) => {
    _tipos = Tipos;
    return ({
        saveType, getTypes, delType
    })
}