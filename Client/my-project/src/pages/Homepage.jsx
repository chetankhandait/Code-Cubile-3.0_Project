import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown'
import {Link} from 'react-router-dom'
const Homepage = () => {
  // State to store the user question, API response, and chat history
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to open the modal
  const openModal = () => {
    document.getElementById("my_modal_4").showModal();
  };

  // Function to close the modal
  const closeModal = () => {
    document.getElementById("my_modal_4").close();
  };

  // Handle input change for the question
  const handleInputChange = (event) => {
    setQuestion(event.target.value);
  };

  // Function to fetch the answer from the backend API
  const fetchAnswer = async () => {
    setIsLoading(true);
    try {
      // Add user question to chat history
      setChatHistory([...chatHistory, { type: "user", text: question }]);

      const response = await fetch("https://623f-103-199-225-157.ngrok-free.app/ask-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),  // Correct format for request body
      });

      const data = await response.json();

      // Add assistant response to chat history
      setChatHistory([...chatHistory, { type: "user", text: question }, { type: "assistant", text: data.answer }]);
      setQuestion(""); // Clear input field
    } catch (error) {
      // Add error message to chat history
      setChatHistory([...chatHistory, { type: "user", text: question }, { type: "assistant", text: "Error fetching the answer." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Set up the keyboard shortcut for Ctrl + K
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        openModal();
      }
    };

    // Attach the event listener to handle the keypress
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
console.log(chatHistory)
  return (
    <>
    
    <div className="min-h-screen flex flex-col items-center justify-center">
      <main className="flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Rapidly build modern websites <br /> without ever leaving your HTML.
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          A utility-first CSS framework packed with classes like
          <span className="text-purple-500"> flex, pt-4, text-center </span>
          and
          <span className="text-purple-500"> rotate-90 </span>
          that can be composed to build any design, directly in your markup.
        </p>
      </main>

      <footer className="mt-10 flex gap-4">
        <Link to={"/multistep-processing"}>
        <button className="bg-purple-500 text-white w-44 py-3 px-6 rounded-lg shadow-lg hover:bg-purple-700">
          Get started
        </button>
        </Link>
        <input
          type="text"
          placeholder="Ask Question"
          className="border w-80 border-gray-300 rounded-lg p-2 max-w-md outline-none"
          onClick={openModal} // Opens the modal when the input is clicked
        />
      </footer>

      {/* Modal Structure */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 h-96 max-w-5xl">
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
              {/* Display chat messages */}
              {chatHistory.map((message, index) => (
                <div key={index} className={`mb-2 ${message.type === "user" ? "text-right" : "text-left"}`}>
                  <div className={`inline-block px-4 py-2 rounded-lg ${message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"}`}>
                    <ReactMarkdown>

                      
                    {message.text}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && <p className="text-center text-gray-500">Loading...</p>}
            </div>

            <div className="flex-none p-4 bg-gray-200">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type your question"
                  className="outline-none border-none text-lg w-full p-2 rounded-lg"
                  value={question}
                  onChange={handleInputChange} // Handle question input
                />
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
                  onClick={fetchAnswer} // Fetch the answer when button is clicked
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <button className="absolute top-4 right-4 text-gray-500" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.5-1.5l4.35 4.35z"
              />
            </svg>
          </button>
        </div>
      </dialog>
    </div>
   
    </>
  );
};

export default Homepage;
