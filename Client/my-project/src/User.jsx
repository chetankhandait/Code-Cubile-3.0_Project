import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const FinancialAdvisor = () => {
  const [formData, setFormData] = useState({
    name: "",
    financial_goal: "",
    risk_tolerance: "",
    investment_amount: 0,
    investment_timeline: "",
    ticker_symbol: "",
    timespan: "day",
    limit: 30,
  });

  const [advice, setAdvice] = useState(null);
  const [notification, setNotification] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission to fetch advice
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: "John Doe",
      financial_goal: "Retirement",
      risk_tolerance: "Moderate",
      investment_amount: 50000,
      investment_timeline: "10 years",
      ticker_symbol: "AAPL",
      timespan: "day",
      limit: 30,
      notification_threshold: 5.0, // percentage threshold for stock change notifications
    };

    try {
      const response = await axios.post("http://localhost:8000/get-advice/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Set the advice response to the state
      setAdvice(response.data.advice);

    } catch (error) {
      console.error("Error fetching advice:", error.response?.data);
    }
  };

  // Listen for price notifications using SSE
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8000/notifications/");

    eventSource.onmessage = (event) => {
      setNotification(event.data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>Get Personalized Financial Advice</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="financial_goal"
          placeholder="Financial Goal"
          value={formData.financial_goal}
          onChange={handleChange}
        />
        <input
          type="text"
          name="risk_tolerance"
          placeholder="Risk Tolerance"
          value={formData.risk_tolerance}
          onChange={handleChange}
        />
        <input
          type="number"
          name="investment_amount"
          placeholder="Investment Amount"
          value={formData.investment_amount}
          onChange={handleChange}
        />
        <input
          type="text"
          name="investment_timeline"
          placeholder="Investment Timeline"
          value={formData.investment_timeline}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ticker_symbol"
          placeholder="Stock Ticker Symbol"
          value={formData.ticker_symbol}
          onChange={handleChange}
        />
        <button type="submit">Get Advice</button>
      </form>

      {advice && (
        <div>
          <h3>Financial Advice</h3>
          {/* Render advice as markdown */}
          <ReactMarkdown>{advice}</ReactMarkdown>
        </div>
      )}

      {notification && (
        <div>
          <h3>Price Change Notification</h3>
          <p>{notification}</p>
        </div>
      )}
    </div>
  );
};

export default FinancialAdvisor;
