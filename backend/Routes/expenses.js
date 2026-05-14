import express from "express"
const router = express.Router()

import { createExpenses, deleteExpense, getExpenses, updateExpense } from "../Controllers/expenses.js"
import { protect } from "../middlewares/auth.js"
import { validator } from "../middlewares/validator.js"
import { expenseValidator } from "../Schema/expenseSchema.js"


/**
 * @swagger
 * /expenses: 
 *   get:
 *      summary: Get all expenses for the logged in user
 *      tags: [Expenses]
 *      security:
 *          - bearerAuth: []
 *      responses: 
 *          200:
 *             description: A list of tasks 
 */

router.get('/', protect, getExpenses) //add protect

/**
 * @swagger
 * /expenses:
 *   post:
 *     summary: Create a new expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [expense, income]
 *               category:
 *                 type: string
 *               dueDate:
 *                 type: string
 *     responses:
 *       201:
 *         description: expense created
 */

router.post('/', protect, createExpenses)

/**
 * @swagger
 * /expenses/{id}:
 *   put:
 *     summary: Update an expense by ID
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Expense ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *               category:
 *                 type: string
 *               dueDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Expense updated successfully
 */

router.put('/:id', protect,  updateExpense)

/**
 * @swagger
 * /expenses/{id}:
 *   delete:
 *     summary: Delete a expense by ID
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Expense ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense deleted
 */
router.delete('/:id', protect,  deleteExpense)

export default router