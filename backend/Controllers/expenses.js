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

// Date filter
const getDateFilter = (date) => {
  const now = new Date();

  if (date === "today") {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return { createdAt: { $gte: start, $lt: end } };
  }

  if (date === "month") {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    return { createdAt: { $gte: start, $lt: end } };
  }

  return {};
};

// GET Expenses
export const getExpenses = async (req, res, next) => {
  try {
    const { limit = 5, page = 1, type, date } = req.query;
    const userId = req.user._id;

    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);
    const skip = (parsedPage - 1) * parsedLimit;

    
    const baseQuery = {
      createdBy: userId,
      ...(type && { type }),
      ...getDateFilter(date)
    };

    const getExpense = await Expense.find(baseQuery).sort({
      createdAt: -1,
    });

    const paginatedExpense = await Expense.find(baseQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parsedLimit);

    const incomeTotal = await Expense.countDocuments({
      createdBy: userId,
      type: "income",
    });

    const expenseTotal = await Expense.countDocuments({
      createdBy: userId,
      type: "expense",
    });

    const totalCount = await Expense.countDocuments(baseQuery);

    const totalPages = Math.ceil(totalCount / parsedLimit);

    res.status(200).json({
      getExpense,
      totalPages,
      currentPage: parsedPage,
      paginatedExpense,
      incomeTotal,
      expenseTotal,
    });
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

    res.status(200).json(expense);
  } catch (error) {
    next(`this Id ${id} does not exist: `, error);
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

    res.status(200).json({ message: `Expense of this ID ${id} was deleted` });
  } catch (error) {
    next(`this Id ${id} does not exist: `, error);
  }
};
