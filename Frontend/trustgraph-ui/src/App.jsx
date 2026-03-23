import { useState } from "react";

function App() {
  const [page, setPage] = useState("home");

  if (page === "home") {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">
            Trust<span className="text-blue-500">Graph</span>
          </h1>

          <p className="text-gray-400 mb-6">
            AI-powered credit scoring for developers
          </p>

          <button
            onClick={() => setPage("analyze")}
            className="bg-blue-500 px-6 py-3 rounded-xl"
          >
            Get Started
          </button>
        </div>
      </div>
    );
  }

  return <div>Coming soon...</div>;
}

export default App;