import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Homepage = () => {
  // Function to open the modal using the dialog element
  const openModal = () => {
    document.getElementById("my_modal_4").showModal();
  };

  // Set up the keyboard shortcut for Ctrl + K
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        openModal(); // Open modal when Ctrl + K is pressed
      }
    };

    // Attach the event listener to handle the keypress
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Navbar />
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
          <Link
            to="/multistep-processing"
            className="bg-purple-500 text-white w-44 py-3 px-6 rounded-lg shadow-lg hover:bg-purple-700"
          >
            Get started
          </Link>
          <input
            type="text"
            placeholder="Quick search..."
            className="border w-80 border-gray-300 rounded-lg p-2 max-w-md outline-none"
            onClick={openModal} // Opens the modal when the input is clicked
          />
        </footer>

        {/* Modal Structure */}
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box w-11/12 h-96 max-w-5xl">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 111.5-1.5l4.35 4.35z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search documentation"
                  className="outline-none border-none text-lg w-full"
                />
              </div>
            </div>
            <div className="text-center text-gray-400">
              <p>No recent searches</p>
            </div>
            <div className="absolute bottom-4 right-4 text-sm text-gray-500">
              <button
                className="text-gray-500"
                onClick={() => document.getElementById("my_modal_4").close()}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Homepage;
