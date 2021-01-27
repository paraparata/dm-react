import React from "react";

interface OptProps {
  active: boolean;
}

function Led({ active }: OptProps) {
  return (
    <div
      className={`px-1 py-1 rounded-full ${
        active ? "bg-yellow-300" : ""
      } border border-yellow-500`}
      style={{ height: 5, width: 5 }}
    ></div>
  );
}

export default Led;
