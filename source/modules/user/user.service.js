import { StatusCodes as STATUS } from "http-status-codes"
import autoBind from "auto-bind"
import { UserMessages } from "./user.messages.js"
import { models } from "../../configs/database/db.config.js"



export const UserService = (() => {
    class UserService {
        #model
        constructor() {
            autoBind(this)
            this.#model = models.User
        }

        async register(req, res, next) {
            try {
                const { username, phone, email, password } = req.body;
                const user = await this.#model.create({ username, phone, email, password });

                res.status(STATUS.OK).json({ message: UserMessages.REGISTER });
            } catch (error) {
                next(error)
            }
        }

        async login(req, res, next) {
            try {
                const { username, password } = req.body;
                const user = await this.#model.findOne({ where: { username } });

                if (!user || !user.validatePassword(password)) {
                    return res.status(STATUS.UNAUTHORIZED).json({ message: UserMessages.LOGIN });
                }

                const token = user.generateJWT();

                res.status(STATUS.OK).json({ token });
            } catch (error) {
                next(error)
            }
        }

    }
    return new UserService()
})()