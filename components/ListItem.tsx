import { useState } from "react";
import type { IListItem } from "models/books";
import { READ_STATUS, COLLECTION_STATUS } from "constants/books";

interface Props {
  listItem: IListItem;
}

export const ListItem = ({ listItem }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  const shouldShowMore = listItem.description.length > maxLength;
  const displayText =
    shouldShowMore && !isExpanded
      ? `${listItem.description.slice(0, maxLength)}...`
      : listItem.description;

  const [readStatus, setReadStatus] = useState("");
  const [collectionStatus, setCollectionStatus] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [price, setPrice] = useState("");

  const handleReadStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReadStatus(e.target.value);
    console.log("Read Status:", e.target.value);
  };

  const handleCollectionStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCollectionStatus(e.target.value);
    console.log("Collection Status:", e.target.value);
  };

  const handleUserRatingChange = (rating: number) => {
    setUserRating(rating);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const clearReadStatus = () => {
    setReadStatus("");
  };

  const clearCollectionStatus = () => {
    setCollectionStatus("");
  };

  const clearIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-blue-600 hover:text-blue-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  return (
    <div className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex gap-6 bg-white max-w-3xl">
      <div className="flex flex-col">
        <div className="mb-3 text-base font-bold bg-gray-100 px-3 py-1.5 rounded-md text-gray-700 self-start">
          Book #{listItem.id}
        </div>
        <img
          src={listItem.imageUrl}
          alt={listItem.title}
          className="w-[160px] h-[240px] object-cover rounded-md shadow-sm"
        />
        <div className="mt-4 space-y-2">
          <div>
            <select
              className="w-32 p-2 mb-2 border rounded-md text-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={readStatus}
              onChange={handleReadStatusChange}
            >
              <option value="">Read Status</option>
              {READ_STATUS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {readStatus && (
              <>
                <button onClick={clearReadStatus} className="ml-2">
                  {clearIcon}
                </button>
                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      onClick={() => handleUserRatingChange(star)}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 cursor-pointer ${
                        userRating >= star ? "text-yellow-400" : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                  ))}
                </div>
              </>
            )}
          </div>
          <div>
            <select
              className="w-32 p-2 mb-2 border rounded-md text-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={collectionStatus}
              onChange={handleCollectionStatusChange}
            >
              <option value="">Collection</option>
              {COLLECTION_STATUS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {collectionStatus && (
              <>
                <button onClick={clearCollectionStatus} className="ml-2">
                  {clearIcon}
                </button>
                {collectionStatus === "Have" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={price}
                      onChange={handlePriceChange}
                      placeholder="Enter price"
                      className="w-32 p-2 border rounded-md text-sm bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {listItem.title}
          </h2>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="font-medium mr-4">
              Author : {listItem.author.map((author) => author.name).join(", ")}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <span className="font-medium">
              Illustrator :{" "}
              {listItem.illustrator
                .map((illustrator) => illustrator.name)
                .join(", ")}{" "}
            </span>
          </div>

          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400 text-2xl">
              {"★".repeat(Math.floor(listItem.rating))}
              {"☆".repeat(5 - Math.floor(listItem.rating))}
            </div>
            <span className="mx-1 ">{listItem.rating.toFixed(1)}</span>
            <span className="mx-1 text-sm text-gray-600">•</span>
            <span className="mx-1">
              {listItem.noOfRatings.toLocaleString()} ratings
            </span>
          </div>

          {listItem.collects && listItem.collects.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-700 font-semibold text-lg mb-3">
                Collects:
              </p>
              <ul className="bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2">
                {listItem.collects.map((item, index) => (
                  <li key={index} className="text-gray-700 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {item.title} #{item.issues}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-4">
            <p className="text-gray-600 text-[15px] leading-6 tracking-wide">
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
          </div>
        </div>

        <div className="text-sm space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <p className="text-gray-600">
              Published:{" "}
              <span className="font-medium">{listItem.published}</span>
            </p>
            <p className="text-gray-600">
              Latest Republish:{" "}
              <span className="font-medium">{listItem.latestRepublished}</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-gray-600">
              Pages: <span className="font-medium">{listItem.pageCount}</span>
            </p>
            {listItem.averagePrice && (
              <p className="text-gray-600">
                Mostly Traded at:{" "}
                <span className="font-medium">
                  ₹{listItem.averagePrice.toFixed(2)}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
