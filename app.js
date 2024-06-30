import e from "express"
import morgan from "morgan"
import { Server } from "./source/configs/server/server.js"
import { MainRoutes } from "./source/routes/main.routes.js"
import { notFoundHandler } from "./source/errors/notFoundRoute.js"
import { serverErrorHandler } from "./source/errors/serverError.js"
import { sequelize, sequelizeConfig } from "./source/configs/database/db.config.js"
import { swaggerConfig } from "./source/configs/apis/swagger.conf.js"
import passport from "passport"
import { passportConfig } from "./source/configs/authentication/passport.conf.js"
import session from "express-session"


(() => {
    const app = e()
    app.use(morgan("dev"))
    app.use(e.json())
    app.use(e.urlencoded({ extended: true }))
    app.use(e.static("public"))
    app.use(MainRoutes)


    app.use(session({
        secret: 'your_session_secret',
        resave: false,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passportConfig(passport)
    sequelizeConfig(sequelize)
    swaggerConfig(app)
    serverErrorHandler(app)
    notFoundHandler(app)
    Server.run(app)


})()
