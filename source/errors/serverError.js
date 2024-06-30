import { DatabaseError, ValidationError } from "sequelize";
import { ErrorMessages } from "./error.messages.js";
import { config } from "dotenv";
config()
export const serverErrorHandler = (app) => {
    app.use((err, req, res, next) => {
        const statusCode = err.status || 500;
        const response = {
            status: statusCode,
            message: err.message || err.msg || ErrorMessages.SERVER_ERROR,
        };

        if (err instanceof ValidationError) {
            response.message = 'Validation Error';
            response.errors = err.errors.map(e => e.message || e.msg);
            response.status = 400;
        } else if (err instanceof DatabaseError) {
            response.message = 'Database Error';
            response.errors = err.message || err.msg;
        }

        res.status(response.status).json(response);
    })
}