import React from "react";
export default function PriceList() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Price List</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li>Course 1: Introduction to React - $99</li>
        <li>Course 2: Advanced React Patterns - $149</li>
        <li>Course 3: State Management with Redux - $129</li>
      </ul>
    </div>
  );
}