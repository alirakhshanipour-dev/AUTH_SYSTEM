import { StatusCodes as STATUS } from "http-status-codes"
import { ErrorMessages } from "./error.messages.js"

export const notFoundHandler = (app) => {
    app.use((req, res, next) => {
        const status = STATUS.NOT_FOUND || 404
        const message = ErrorMessages.NOT_FOUND_ROUTE || "Route Not Found"

        res.status(status).json({
            message
        })
    })
}