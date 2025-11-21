import React from "react";
import audioFiles from "./audioSource.js";
import Player from "./Player.jsx";

const Index = () => {
  const [source, setSource] = React.useState(null);

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <section className="flex flex-wrap justify-center gap-6 p-10 flex-1 overflow-y-auto">
        {audioFiles.map((item) => (
          <article
            key={item.id}
            className="bg-white shadow-md h-40 w-52 flex flex-col items-center justify-center rounded-2xl transition-transform hover:scale-105"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {item.title}
            </h2>
            <button
              onClick={() => setSource(item.src)}
              className={`mt-4 px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-150 ${
                item.src === source
                  ? "bg-yellow-500 text-white"
                  : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              }`}
            >
              {item.src === source ? "Playing..." : "Play"}
            </button>
          </article>
        ))}
      </section>

      <footer className="w-full">
        <Player source={source} />
      </footer>
    </main>
  );
};

export default Index;
