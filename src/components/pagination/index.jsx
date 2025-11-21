import React from "react";

const fetchCurrentPageData = (currentPage, size) => {
  const arr = [];
  for (let i = (currentPage - 1) * size + 1; i <= currentPage * size; i++) {
    arr.push(i);
  }
  return arr;
};

const Index = () => {
  const [totalPage, setTotalPage] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentPageData, setCurrentPageData] = React.useState([]);

  React.useEffect(() => {
    setTotalPage(15);
  }, []);

  React.useEffect(() => {
    if (totalPage > 1) {
      setCurrentPageData(fetchCurrentPageData(currentPage, 20));
    }
  }, [currentPage, totalPage]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div className="text-4xl font-extrabold text-center py-6 tracking-wide text-blue-400">
        Pagination
      </div>

      <div className="flex-grow flex items-center justify-center px-8 pb-8">
        <div className="grid grid-cols-5 gap-3 w-full max-w-6xl h-[70vh] place-content-center">
          {currentPageData.map((item, i) => (
            <div
              key={i}
              className="bg-blue-600/80 text-white text-sm font-semibold px-4 py-3 rounded-xl text-center"
            >
              Card {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 pb-6">
        <button
          onClick={() => currentPage > 1 && setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-150 ${
            currentPage === 1
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 active:scale-95"
          }`}
        >
          Prev
        </button>

        {Array.from({ length: totalPage }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded-md font-medium transition-all duration-150 ${
              index + 1 === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            currentPage < totalPage && setCurrentPage((p) => p + 1)
          }
          disabled={currentPage === totalPage}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-150 ${
            currentPage === totalPage
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500 active:scale-95"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Index;
