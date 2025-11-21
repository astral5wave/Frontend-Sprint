import React from "react";
import { PieChart } from "@mui/x-charts";

const initialState = {
  income:0,
  expense:0,
};

let incomeMap = new Map();
let expenseMap = new Map();

const reducer = (state, action) => {
  switch (action.type) {
    case "addIncome":
      incomeMap.set(action.id, { amount: action.payload, remark: action.remark });
      return {
        ...state,
        income: state.income + action.payload,
      };
    case "addExpense":
      expenseMap.set(action.id, { amount: action.payload, remark: action.remark });
      return {
        ...state,
        expense: state.expense + action.payload,
      };
    case "deleteIncome":
      incomeMap.delete(action.id);
      return {
        ...state,
        income: state.income - action.payload,
      };
    case "deleteExpense":
      expenseMap.delete(action.id);
      return {
        ...state,
        expense: state.expense - action.payload,
      };
    default:
      incomeMap = new Map();
      expenseMap = new Map();
      return initialState;
  }
};

const Index = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [inputValue, setInputValue] = React.useState("");
  const [remark, setRemark] = React.useState("");
  const [type, setType] = React.useState("income");

  const handleAdd = () => {
    const value = parseFloat(inputValue);
    if (!value || value <= 0) return;

    const id = crypto.randomUUID();
    if (type === "income") {
      dispatch({ type: "addIncome", id, payload: value, remark });
    } else {
      dispatch({ type: "addExpense", id, payload: value, remark });
    }
    setInputValue("");
    setRemark("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-6">
      <div className="grid grid-cols-3 gap-6 flex-grow">
        <div className="col-span-1 flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg p-6">
          <div className="text-xl font-semibold text-gray-700 mb-2">Total Income</div>
          <div className="text-3xl font-bold text-green-600 mb-6">{state.income}</div>
          <div className="text-xl font-semibold text-gray-700 mb-2">Total Expense</div>
          <div className="text-3xl font-bold text-red-600">{state.expense}</div>
        </div>

        <div className="col-span-1 flex items-center justify-center bg-white rounded-2xl shadow-lg">
          <PieChart
            series={[
              {
                innerRadius: 90,
                outerRadius: 120,
                data: [
                  {
                    id: 0,
                    value: state.expense,
                    label: "Expense",
                    color: "#f87171",
                  },
                  {
                    id: 1,
                    value: state.income,
                    label: "Income",
                    color: "#34d399",
                  },
                ],
              },
            ]}
            width={300}
            height={300}
          />
        </div>

        <div className="col-span-1 flex flex-col justify-center bg-white rounded-2xl shadow-lg p-6">
          <div className="text-lg font-semibold text-gray-700 mb-4">Add Transaction</div>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter amount"
            className="border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Remark (e.g. Salary, Rent, Snacks)"
            className="border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="income"
                checked={type === "income"}
                onChange={() => setType("income")}
              />
              <span>Income</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                value="expense"
                checked={type === "expense"}
                onChange={() => setType("expense")}
              />
              <span>Expense</span>
            </label>
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white font-semibold rounded-lg py-2 hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6 flex-grow">
        <div className="bg-white rounded-2xl shadow-lg p-4 overflow-y-auto max-h-72">
          <div className="text-lg font-semibold text-gray-700 mb-2">Income List</div>
          {[...incomeMap].map(([id, { amount, remark }]) => (
            <div
              key={id}
              className="flex justify-between items-center bg-green-50 border border-green-200 rounded-lg p-3 mb-2"
            >
              <div>
                <div className="text-green-700 font-medium">₹{amount}</div>
                <div className="text-sm text-gray-600 italic">{remark || "—"}</div>
              </div>
              <button
                className="text-red-500 font-semibold hover:underline"
                onClick={() =>
                  dispatch({ type: "deleteIncome", id, payload: amount })
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 overflow-y-auto max-h-72">
          <div className="text-lg font-semibold text-gray-700 mb-2">Expense List</div>
          {[...expenseMap].map(([id, { amount, remark }]) => (
            <div
              key={id}
              className="flex justify-between items-center bg-red-50 border border-red-200 rounded-lg p-3 mb-2"
            >
              <div>
                <div className="text-red-700 font-medium">₹{amount}</div>
                <div className="text-sm text-gray-600 italic">{remark || "—"}</div>
              </div>
              <button
                className="text-red-500 font-semibold hover:underline"
                onClick={() =>
                  dispatch({ type: "deleteExpense", id, payload: amount })
                }
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
