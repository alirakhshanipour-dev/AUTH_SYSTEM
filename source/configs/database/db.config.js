import { Sequelize } from "sequelize";
import { initUser } from "../../models/user.model.js";


const sequelize = new Sequelize({
    username: "alirakhshanipur",
    password: "",
    database: "userAuth",
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    logging: false
})

const models = {
    User: initUser(sequelize),
}


function associateModels(models) {
    Object.values(models).forEach(model => {
        if (model.associate) {
            model.associate(models)
        }
    })
}


associateModels(models)

const sequelizeConfig = (sequelize) => {
    sequelize.sync({ alter: true })
        .then(() => {
            console.log("database synced successfully");
        })
        .catch((err) => {
            console.log("error in syncronizing database:", err);
        })

}


export { sequelize, models, sequelizeConfig }