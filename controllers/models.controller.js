let _models

//Crear
const save = (req, res) => {
    const model = req.body;
    _models.create(model)
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
//Obtener uno
const getById = (req, res) => {
    const id = req.params.id;
    _models.findOne({ _id : id })
        .then(agreement => {
            res.status(200);
            res.json({
                code: 200,
                detail: agreement
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
//Obtener todos
const get = (req, res) => {
    _models.find()
        .then(agreement => {
            res.status(200);
            res.json({
                code: 200,
                detail: agreement
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

module.exports = (Models) => {
    _models = Models;
    return ({
        save, getById, get
    })
}