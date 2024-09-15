import React, { useState } from "react";
import { motion } from "framer-motion";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    plan: "",
    addons: "",
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
            <h2 className="text-2xl mb-4">Your Info</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 mb-4 rounded-lg"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 mb-4 rounded-lg"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border border-gray-300 mb-4 rounded-lg"
            />
            <div className="flex justify-between">
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
            <h2 className="text-2xl mb-4">Select Plan</h2>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 mb-4 rounded-lg"
            >
              <option value="">Select your plan</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
            </select>
            <div className="flex justify-between">
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
            <h2 className="text-2xl mb-4">Add-ons</h2>
            <textarea
              name="addons"
              value={formData.addons}
              onChange={handleChange}
              placeholder="Add-ons"
              className="w-full p-2 border border-gray-300 mb-4 rounded-lg"
            />
            <div className="flex justify-between">
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
            <h2 className="text-2xl mb-4">Summary</h2>
            <ul>
              <li>Name: {formData.name}</li>
              <li>Email: {formData.email}</li>
              <li>Phone: {formData.phone}</li>
              <li>Plan: {formData.plan}</li>
              <li>Add-ons: {formData.addons}</li>
            </ul>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrevious}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Previous
              </button>
              <button
                onClick={() => alert("Form submitted")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
