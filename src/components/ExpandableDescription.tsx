"use client";

import { useState } from "react";

interface ExpandableDescriptionProps {
  description: string;
  maxLength?: number;
}

export const ExpandableDescription = ({
  description,
  maxLength = 150,
}: ExpandableDescriptionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowMore = description.length > maxLength;
  const displayText =
    shouldShowMore && !isExpanded
      ? `${description.slice(0, maxLength)}...`
      : description;

  return (
    <p className="text-gray-700 text-[15px] leading-6 tracking-wide">
      {displayText}
      {shouldShowMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-1 text-blue-600 hover:text-blue-700 font-medium"
        >
          {isExpanded ? "Less" : "More"}
        </button>
      )}
    </p>
  );
};
