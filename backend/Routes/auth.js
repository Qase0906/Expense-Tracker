import express from "express"
import { login, register } from "../Controllers/auth.js"
import { protect } from "../middlewares/auth.js"
import { validator } from "../middlewares/validator.js"
import { createUserSchema } from "../Schema/usersSchema.js"
const router = express.Router()


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 */
router.post('/register', validator(createUserSchema), register)


router.post('/login', login)


// Protected routes
router.get('/profile', protect, (req, res) => {
    res.json(req.user)
})


export default router