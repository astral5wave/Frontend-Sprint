import React from "react";
import currencyRates from "./currencyRates";
const index = () => {
  const [input, setInput] = React.useState("");
  const [error, setError] = React.useState("");
  const [to, setTo] = React.useState("");
  const [from, setFrom] = React.useState("");
  const [converted, setconverted] = React.useState(0);

  const handleFrom = (e) => {
    setFrom(e.target.value);
  };
  const handleTo = (e) => {
    setTo(e.target.value);
  };
  const handleConvert = () => {
    if (input === "" || from === "" || to === "") {
      setError("Fields cannot be empty");
      return;
    }
    setError("");
    setconverted(() =>
      (
        (Number.parseFloat(to) / Number.parseFloat(from)) *
        Number.parseFloat(input)
      ).toFixed(2)
    );
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-yellow-200 to-yellow-400">
      <div className="w-11/12 md:w-2/3 lg:w-1/2 bg-white rounded-2xl shadow-xl p-10 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center text-gray-800">
          Currency Converter
        </h1>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col w-full">
            <label className="text-gray-700 text-lg mb-2 font-semibold">
              Enter Amount
            </label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="number"
              placeholder="Enter amount"
              className="w-full px-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 text-lg mb-2 font-semibold">
                From
              </label>
              <select
                onChange={handleFrom}
                className="w-full px-4 py-3 border rounded-xl bg-gray-50 shadow-sm focus:outline-none"
              >
                <option value="">--Select--</option>
                {currencyRates.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.code}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-3xl font-bold text-gray-600">→</div>

            <div className="flex flex-col w-1/2">
              <label className="text-gray-700 text-lg mb-2 font-semibold">
                To
              </label>
              <select
                onChange={handleTo}
                className="w-full px-4 py-3 border rounded-xl bg-gray-50 shadow-sm focus:outline-none"
              >
                <option value="">--Select--</option>
                {currencyRates.map((item, i) => (
                  <option key={i} value={item.value}>
                    {item.code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleConvert}
            className="bg-yellow-400 hover:bg-yellow-500 text-white text-lg font-bold px-8 py-3 rounded-xl shadow-md active:scale-95 transition-all duration-200"
          >
            Convert
          </button>
        </div>
        {error && (
          <p className="text-xs text-red-500 w-full text-center">* {error}</p>
        )}
        <div className="text-center mt-4 text-2xl font-semibold text-gray-700">
          Converted Amount :{" "}
          {converted ? (
            `${converted}`
          ) : (
            <span className="text-yellow-600">—</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
