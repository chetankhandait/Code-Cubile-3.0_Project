import React, { useState } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  // Handles moving to the next step
  const nextStep = () => {
    setStep((prev) => (prev < 4 ? prev + 1 : prev));
  };

  // Handles moving to the previous step
  const prevStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="p-4 min-h-56  rounded">
            <div className="flex w-full gap-4">

        
            <label
              htmlFor="firstname"
              className="relative h-12  w-full block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="text"
                id="firstname"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="firstname"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 p-1 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Firstname
              </span>
            </label> 
            
             <label
              htmlFor="lastname"
              className="relative h-12 w-full block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="text"
                id="lastname"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="lastname"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 p-1 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Lastname
              </span>
            </label>

          
    </div> 
     <label
              htmlFor="Email"
              className="relative h-12 my-4 w-full block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                type="email"
                id="Email"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="Email"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 p-1 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Email
              </span>
            </label>

          </div>
        );
      case 2:
        return <div className="p-4  min-h-56 rounded">Step 2 Content</div>;
      case 3:
        return <div className="p-4  min-h-56 bg-gray-50 rounded">Step 3 Content</div>;
      case 4:
        return <div className="p-4  min-h-56 bg-gray-50 rounded">Step 4 Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="lg:pt-40 p-8">
      <div className="max-w-4xl h-96 mx-auto my-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-8">
          {Array.from({ length: 3 }, (_, i) => i + 1).map((item) => (
            <div key={item} className="flex-1 flex justify-center items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 
                ${
                  step >= item
                    ? "bg-purple-600 text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {step > item ? "✓" : item}
              </div>
              {item < 4 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    step > item ? "bg-purple-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="mb-4">{renderStepContent()}</div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="px-4 py-2 text-white bg-black rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className="px-4 py-2 text-white bg-purple-500 rounded"
          >
            {step === 4 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
