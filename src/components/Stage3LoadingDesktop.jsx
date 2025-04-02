import React from "react";

const Stage3LoadingDesktop = () => (
  <div className="flex items-center justify-center h-64 p-8 bg-white rounded-lg shadow">
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce [animation-delay:-.5s]"></div>
    </div>
  </div>
);

export default Stage3LoadingDesktop;
