import Expense from "../Models/Expenses.js";

export const createExpenses = async (req, res, next) => {
  const expense = req.body;

  try {
    const newExpense = await Expense.create({
      ...expense,
      createdBy: req.user._id,
    });
    res.status(201).json(newExpense);
  } catch (error) {
    next(error);
  }
};

// GET Expenses
export const getExpenses = async (req, res, next) => {
  try {
    const getExpense = await Expense.find({ createdBy: req.user._id });
    res.status(200).json({ getExpense });
  } catch (error) {
    next(error);
  }
};

// UPDATE EXPENSES
export const updateExpense = async (req, res, next) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!expense)
      return res
        .status(404)
        .json({ message: `no expenses found match this id: ${id}` });
    
    res.status(200).json(expense)

    next()

  } catch (error) {
    next(`this Id ${id} does not exist: `, error)
  }
};


// DELETE EXPENSES
export const deleteExpense = async (req, res, next) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByIdAndDelete({ _id: id });

    if (!expense)
      return res
        .status(404)
        .json({ message: `no expenses found match this id: ${id}` });
    
    res.status(200).json({message: `Expense of this ID ${id} was deleted`})

    next()

  } catch (error) {
    next(`this Id ${id} does not exist: `, error)
  }
};
