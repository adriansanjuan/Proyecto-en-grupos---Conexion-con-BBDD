require("dotenv").config()//Importa y configura las variables de entorno
const inscriptionModel = require("../models/inscription.model")//Importa el modelo de inscripción

const { wrapAsync } = require("../utils/functions")
const AppError = require("../utils/AppError")

exports.createInscription = wrapAsync(async (req, res, next) => {
    await inscriptionModel.createInscription(req.body, function (err, inscriptionCreated) {
        if (err) {
            next(new AppError(err, 400))
        } else {
            console.log(inscriptionCreated)
            res.redirect(`/api/${process.env.API}/inscription/SSR`)
        }
    })
})

exports.showNewInscription = wrapAsync(async (req, res, next) => { // Función muestra las nuevas inscripciones
    const companyModel = require("../models/company.model"); // Extrae el contenido del modelo
    const userModel = require("../models/users.model"); // Extrae el contenido del modelo
    const inscriptionModel = require("../models/inscription.model"); // Importa el modelo de inscripción

    const companies = await companyModel.find({})
    userModel.findAll(async function (err, users) {
        if (err) {
            next(new AppError(err, 404));
        } else {
            const inscripciones = await inscriptionModel.find({});
            const usuariosFiltrados = users.filter((user) => {
                return !inscripciones.some(
                    (inscription) => inscription.IdUser === user.idUser
                );
            });
            res.render("inscription/new.ejs", { companies, users: usuariosFiltrados });
        }
    });
});

exports.showAllInscription = wrapAsync(async (req, res, next) => {
    await inscriptionModel.findAllInscription(async function (err, datosInscription) {
        if (err) {
            next(new AppError(err, 404))
        } else {
            const companyModel = require("../models/company.model")
            const userModel = require("../models/users.model")
            const companies = await companyModel.find({})
        
            await userModel.findAll(function (err, users) {
                if (err) {
                    next(new AppError(err, 404))
                } else {
                    res.render("inscription/index.ejs", { datosInscription, companies, users });
                }
            })
        }
    })
})

exports.showEditInscription = wrapAsync(async (req, res, next) => {
    const { id } = req.params
    await inscriptionModel.findInscriptionById(id, async function (err, inscription) {
        if (err) {
            next(new AppError(err, 404));
        } else {
            const companyModel = require("../models/company.model")
            const userModel = require("../models/users.model")
            const companies = await companyModel.find({})
            await userModel.findAll(function (err, users) {
                if (err) {
                    next(new AppError(err, 404))
                } else {
                    res.render("inscription/edit.ejs", { inscription, companies, users });
                }
            })
        }
    })
})

exports.editInscription = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const { FecIni, FecFin, Observaciones, IdUser, IdCompany } = req.body
    const inscriptionActualizado = {
        FecIni,
        FecFin,
        Observaciones,
        IdUser,
        IdCompany,
    };
    await inscriptionModel.updateInscriptionById(id, inscriptionActualizado, function (err, datosActualizados) {
        if (err) {
            next(new AppError(err, 400))
        } else {
            console.log(datosActualizados)
            res.redirect(`/api/${process.env.API}/inscription/SSR`)
        }
    })
})

exports.deleteInscription = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await inscriptionModel.deleteInscriptionById(id, function (err, datosEliminados) {
        if (err) {
            next(new AppError(err, 400));
        } else {
            res.redirect(`/api/${process.env.API}/inscription/SSR`)
        }
    });
});

// CSR

exports.findAllInscriptionCSR = wrapAsync(async (req, res, next) => {
    await inscriptionModel.findAllInscription(function (err, datosInscription) {
        if (err) {
            next(new AppError(err, 500))
        } else {
            res.status(200).json(datosInscription)
        }
    });
});

exports.createInscriptionCSR = wrapAsync(async (req, res, next) => {
    await inscriptionModel.createInscription(req.body, function (err, inscriptionCreated) {
        if (err) {
            next(new AppError(err, 400));
        } else {
            res.status(200).json(inscriptionCreated);
        }
    });
});

exports.editInscriptionCSR = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const { FecIni, FecFin, Observaciones, IdUser, IdCompany } = req.body;
    const inscriptionActualizado = {
        FecIni,
        FecFin,
        Observaciones,
        IdUser,
        IdCompany,
    };
    await inscriptionModel.updateInscriptionById(id, inscriptionActualizado, function (err, datosActualizados) {
        if (err) {
            next(new AppError(err, 400));
        } else {
            res.status(200).json(inscriptionActualizado);
        }
    });
});

exports.deleteInscriptionCSR = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    await inscriptionModel.deleteInscriptionById(id, function (err, datosEliminados) {
        if (err) {
            next(new AppError(err, 400))
        } else {
            res.status(200).json(datosEliminados)
        }
    })
})
