import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
};

export default Loader;
