import createHttpError from "http-errors";
import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { config } from "dotenv";
config()


class User extends Model {
    static associate(models) {
        // Define associations here
    }

    // Generate JWT
    generateJWT() {
        return jwt.sign(
            { id: this.id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );
    }

    // Validate Password
    validatePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }

}

export const initUser = (sequelize) => {
    return User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[a-zA-Z0-9_]+$/, // Example regex for alphanumeric usernames with underscores
                len: [3, 25], // Example length validation,
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: "please enter a valid email"
                },
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isIranPhone(value) {
                    if (!/^(\+98|0)?9\d{9}$/.test(value)) {
                        throw new Error("Invalid Iranian phone number.");
                    }
                }
            },
            set(value) {
                this.setDataValue('phone', standardizeIranPhoneNumber(value));
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM,
            allowNull: false,
            defaultValue: "guest",
            values: ["admin", "user", "guest"],
        }
    }, {
        sequelize,
        modelName: "User",
        tableName: "users",
        hooks: {
            beforeCreate: async (user, options) => {
                await userValidation(user);

                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
            beforeUpdate: async (user, options) => {
                await userValidation(user);

                if (user.password) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    });
}

// Function to standardize Iranian phone numbers
const standardizeIranPhoneNumber = (phone) => {
    if (phone.startsWith('+98')) {
        phone = '0' + phone.slice(3);
    } else if (phone.startsWith('98')) {
        phone = '0' + phone.slice(2);
    } else if (!phone.startsWith('0')) {
        phone = '0' + phone;
    }
    return phone;
}


// Custom validation function
const userValidation = async (user) => {

    const existingUser = await User.findOne({ where: { username: user.username } });
    if (existingUser) {
        throw new createHttpError.BadRequest("Username already in use");
    }

    // Example: Check if the email is already in use
    const existingEmail = await User.findOne({ where: { email: user.email } });
    if (existingEmail) {
        throw new createHttpError.BadRequest("Email already in use");
    }

};
