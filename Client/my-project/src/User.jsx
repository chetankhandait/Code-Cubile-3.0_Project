import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from 'react-markdown';

const ReportComponent = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/run-workflow");

      // Console log the entire JSON response
      console.log("JSON Response:", response.data);

      // Set the report data
      setReportData(response.data);  // Set the entire JSON data in the state
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Investment Report</h1>
      <button onClick={fetchReport} disabled={loading}>
        {loading ? "Loading..." : "Get Report"}
      </button>

      {reportData && (
        <div>
          <h2>Generated Report:</h2>
          
          {/* Stock Analyst Report */}
          <section>
            <h3>Stock Analyst Report</h3>
            <ReactMarkdown>
              {reportData.stock_analyst_report.content}
            </ReactMarkdown>
            {/* Optionally display sections */}
            <h4>Company Information</h4>
            <p>{reportData.stock_analyst_report.sections.company_info}</p>
            <h4>Analyst Recommendations</h4>
            <p>{reportData.stock_analyst_report.sections.analyst_recommendations}</p>
            <h4>Company News</h4>
            <p>{reportData.stock_analyst_report.sections.company_news}</p>
          </section>

          {/* Research Analyst Report */}
          <section>
            <h3>Research Analyst Report</h3>
            <ReactMarkdown>
              {reportData.research_analyst_report.content}
            </ReactMarkdown>
            {/* Optionally display sections */}
            <h4>Rankings</h4>
            <p>{reportData.research_analyst_report.sections.rankings}</p>
            <h4>Investment Potential</h4>
            <p>{reportData.research_analyst_report.sections.investment_potential}</p>
          </section>

          {/* Final Investment Report */}
          <section>
            <h3>Final Investment Report</h3>
            <ReactMarkdown>
              {reportData.final_investment_report.content}
            </ReactMarkdown>
            {/* Optionally display summary */}
            <h4>Summary</h4>
            <p>{reportData.final_investment_report.summary}</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default ReportComponent;
