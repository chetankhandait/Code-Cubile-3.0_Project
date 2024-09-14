import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown  from 'react-markdown'
function User() {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to run the workflow
  const runWorkflow = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://127.0.0.1:8000/run-workflow");
      setReport(response.data.report);
    } catch (err) {
      setError("Error running the workflow. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Investment Research Workflow
        </h1>
        <p className="text-white text-lg mb-6 text-center">
          Click the button below to generate an investment report.
        </p>

        <div className="flex justify-center">
          <button
            onClick={runWorkflow}
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white py-2 px-6 rounded-lg text-lg`}
          >
            {loading ? "Generating..." : "Run Workflow"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {report && (
          <div className="bg-gray-700 text-white p-4 mt-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Generated Report</h2>
            

            <pre className="whitespace-pre-wrap break-words">
              <ReactMarkdown>


              {report}
              </ReactMarkdown>
              
              </pre>
           
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
