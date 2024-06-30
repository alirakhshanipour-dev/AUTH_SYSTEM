import autoBind from "auto-bind"
import createHttpError from "http-errors"
import { StatusCodes as STATUS } from "http-status-codes"
import { UserMessages } from "./user.messages.js"
import { models } from "../../configs/database/db.config.js"

export const UserController = (() => {
    class UserController {
        #model
        constructor() {
            autoBind(this)
            this.#model = models.User
        }


        async getUser(req, res, next) {
            try {
                const { id: userId } = req.params
                const user = await this.#model.findByPk(userId, {
                    attributes: {
                        exclude: ["id", "password", "createdAt", "updatedAt"]
                    }
                })
                if (!user) {
                    throw new createHttpError.NotFound("no user found with this id")
                }

                res.status(STATUS.OK).json({
                    success: true,
                    message: UserMessages.GET_SUCCESS,
                    user
                })

            } catch (error) {
                next(error)
            }
        }


        async getUsers(req, res, next) {
            try {
                const users = await this.#model.findAll({
                    attributes: {
                        exclude: ["id", "password", "createdAt", "updatedAt"]
                    }
                })

                res.status(STATUS.OK).json({
                    success: true,
                    message: UserMessages.GET_USERS_SUCCESS,
                    users
                })
            } catch (error) {
                next(error)
            }
        }


        async createUser(req, res, next) {
            try {
                const userData = req.body
                const user = await this.#model.create(userData)
                res.status(STATUS.CREATED).json({
                    success: true,
                    message: UserMessages.CREATE_USER_SUCCESS,
                    user
                })
            } catch (error) {
                next(error)
            }
        }
    }
    return new UserController()
})()
