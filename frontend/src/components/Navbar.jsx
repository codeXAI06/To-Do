import React from 'react'

/**
 * Navbar component for the To-Do List application.
 * Displays the application title.
 */
const Navbar = () => {
  return (
    <div className="bg-[#101010] h-20 flex items-center justify-center shadow-xl ">
      <div>
        <h1 className="flex item-center mt-3 text-white title text-4xl title-style hover:transform hover:scale-110 transition-all duration-300">
          To-Do List
        </h1>
      </div>
    </div>
  );
}

export default Navbar