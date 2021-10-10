/** source/routes/user.ts */
import express from 'express';
import controller from '../controllers/user';
const router = express.Router();


/**
 * A user
 * @typedef {object} User
 * @property {} email.required - Email
 * @property {string} firstName.required - The first name
 * @property {string} lastName.required - The last name
 * @property {string} pasword.required - The last name
 * @property {integer} year - The year
*/

/**
 * GET /users
 * @summary This is the summary of the endpoint
 * @tags users
 * @return {array<User>} 200 - success response - application/json
 * @example response - 200 - success response example
 * [
 *   {
 *     "firstName": "josep",
 *     "lastName": "Servat",
 *     "email": "servat@gimail.com",
 *     "password": "password"
 *     "createdAt": "2019-09-12",
 *     "updatedAt": "2019-11-12"
 *   }
 * ]
 */
router.get('/users', controller.getUsers);

export = router;