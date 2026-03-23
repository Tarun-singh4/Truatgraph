import { useState } from "react";
import heroImg from "./assets/hero.png"

function App() {
  const [page, setPage] = useState("home");

  if (page === "home") {
    return (
      <div className="min-h-screen bg-black text-white overflow-hidden relative">

        {/* BG */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>

        {/* PARTICLES */}
        <div className="absolute inset-0">
          <div className="w-2 h-2 bg-blue-400 rounded-full absolute top-20 left-20 animate-ping"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full absolute top-40 right-32 animate-pulse"></div>
          <div className="w-1 h-1 bg-white rounded-full absolute bottom-32 left-1/3 animate-bounce"></div>
        </div>

        <div className="flex items-center justify-center min-h-screen px-10 relative z-10">

          <div className="flex w-full max-w-7xl items-center">

            {/* LEFT */}
            <div className="w-1/2">

              <h1 className="text-7xl font-bold mb-6">
                Trust<span className="text-blue-500">Graph</span>
              </h1>

              <p className="text-2xl font-semibold text-gray-200 mb-6">
                Transforming digital productivity into
                <span className="text-blue-400"> verifiable credit identity</span>
              </p>

              <p className="text-gray-400 mb-6 max-w-lg">
                AI-powered system that converts GitHub activity into trust,
                risk scores, and financial eligibility.
              </p>

              <div className="flex gap-3 mb-8 text-sm">
                <span className="bg-white/10 px-3 py-1 rounded-full">AI Scoring</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">GitHub Data</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">Credit Engine</span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setPage("analyze")}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-xl font-semibold hover:scale-110 transition"
                >
                  Get Started
                </button>

                <button className="border border-gray-500 px-6 py-3 rounded-xl hover:bg-gray-800">
                  Learn More
                </button>
              </div>

            </div>

            {/* RIGHT */}
            <div className="w-1/2 flex justify-center items-center relative">

              <div className="absolute w-[350px] h-[350px] bg-blue-500/30 blur-3xl rounded-full animate-pulse"></div>

              <img
                src={heroImg}
                alt="TrustGraph"
                className="h-[450px] relative z-10 hover:scale-105 transition duration-500"
              />

            </div>

          </div>

        </div>

      </div>
    );
  }

  return <div>Coming soon...</div>;
}

export default App;