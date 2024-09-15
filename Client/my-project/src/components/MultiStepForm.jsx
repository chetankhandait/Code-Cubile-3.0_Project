import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    investmentAmount: "",
    stockPreference: "",
    investmentTimeline: "",
    marketAnalysis: "",
  });

  const handleNext = () => setStep(step + 1);
  const handlePrevious = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const progress = (step / 4) * 100;

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-gray-100 p-4 max-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-900 text-white rounded-lg p-4">
        <div className="space-y-8">
          <div
            className={`flex items-center  ${
              step === 1 ? "text-blue-500 " : ""
            }`}
          >
            <span className="mr-2">Step 1</span> Your Info
          </div>
          <div
            className={`flex items-center ${step === 2 ? "text-blue-500" : ""}`}
          >
            <span className="mr-2">Step 2</span> Select Plan
          </div>
          <div
            className={`flex items-center ${step === 3 ? "text-blue-500" : ""}`}
          >
            <span className="mr-2">Step 3</span> Add-ons
          </div>
          <div
            className={`flex items-center ${step === 4 ? "text-blue-500" : ""}`}
          >
            <span className="mr-2">Step 4</span> Summary
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="w-full md:w-3/4 bg-white rounded-lg p-8 shadow-md">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-1 bg-blue-500 mb-4"
        />

        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Info</h2>
            <label className="block text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Stephen King"
              className="w-full p-2 border"
            />

            <label className="block mt-4 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. stephen@lorem.com"
              className="w-full p-2 border"
            />

            <label className="block mt-4 text-sm">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 234 567 890"
              className="w-full p-2 border"
            />
            <div className="flex justify-between mt-8">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
                disabled
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Investment Details</h2>

            <label className="block text-sm">
              How much money do you want to invest?
            </label>
            <input
              type="number"
              name="investmentAmount"
              value={formData.investmentAmount}
              onChange={handleChange}
              placeholder="e.g. $10,000"
              className="w-full p-2 border"
            />

            <label className="block mt-4 text-sm">
              Which stocks would you like to invest in?
            </label>
            <input
              type="text"
              name="stockPreference"
              value={formData.stockPreference}
              onChange={handleChange}
              placeholder="e.g. Tesla, Apple"
              className="w-full p-2 border"
            />

            <label className="block mt-4 text-sm">
              What is your investment timeline?
            </label>
            <input
              type="text"
              name="investmentTimeline"
              value={formData.investmentTimeline}
              onChange={handleChange}
              placeholder="e.g. 5 years"
              className="w-full p-2 border"
            />
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Market Analysis</h2>

            <label className="block text-sm">
              Do you follow any market trends?
            </label>
            <input
              type="text"
              name="marketAnalysis"
              value={formData.marketAnalysis}
              onChange={handleChange}
              placeholder="e.g. Yes, following the technology sector"
              className="w-full p-2 border"
            />

            <label className="block mt-4 text-sm">
              How do you analyze stock performance?
            </label>
            <input
              type="text"
              name="analysisMethod"
              placeholder="e.g. Fundamental or Technical Analysis"
              className="w-full p-2 border"
            />
            <div className="flex justify-between mt-8">
              <button
                onClick={handlePrevious}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Email:</strong> {formData.email}
            </p>
            <p>
              <strong>Phone:</strong> {formData.phone}
            </p>
            <p>
              <strong>Investment Amount:</strong> {formData.investmentAmount}
            </p>
            <p>
              <strong>Stock Preference:</strong> {formData.stockPreference}
            </p>
            <p>
              <strong>Investment Timeline:</strong>{" "}
              {formData.investmentTimeline}
            </p>
            <p>
              <strong>Market Analysis:</strong> {formData.marketAnalysis}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevious}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Previous
              </button>
              <Link
                to="/finance-assistant"
                onClick={() => alert("Form submitted")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
