/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              username:
 *                  type: string
 *              phone:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 */


/**
 * @swagger
 * /auth/register:
 *   post:
 *      summary: Create a new user
 *      tags:
 *          - Authentication
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: User created successfully
 *          400:
 *              description: Invalid input, object invalid
 *          500:
 *              description: Internal server error
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *         - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid username or password
 *       400:
 *         description: Bad request
 */


/**
 * @swagger
 * /user/create:
 *  post:
 *      summary: Create a new user
 *      tags:
 *          - Users
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          201:
 *              description: User created successfully
 *          400:
 *              description: Invalid input, object invalid
 *          500:
 *              description: Internal server error
 */


/**
 * @swagger
 * /user/list:
 *   get:
 *     summary: Fetch users with optional filters
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: fetch user
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully
 *       400:
 *         description: object invalid
 *       500:
 *         description: Internal server error
 */
