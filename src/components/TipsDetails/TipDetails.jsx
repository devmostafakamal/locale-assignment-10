import { useLoaderData, Link } from "react-router";
import { FaHeart, FaArrowLeft } from "react-icons/fa";
import { useState } from "react";

export default function TipDetails() {
  const initialTip = useLoaderData();
  const [tip, setTip] = useState(initialTip);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/garden-tips/like/${tip._id}`,
        {
          method: "PATCH",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update like");
      }

      const updatedTip = await response.json();

      // Update both the tip data and like state
      setTip(updatedTip);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Like error:", error);
      // Optionally show error to user
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link
        to="/browse"
        className="flex items-center text-green-600 mb-6 hover:underline"
      >
        <FaArrowLeft className="mr-2" /> Back to Tips
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tip Image */}
        <img
          src={tip.photoUrl || "/placeholder-garden.jpg"}
          alt={tip.title}
          className="w-full h-64 object-cover"
        />

        {/* Tip Content */}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800">{tip.title}</h1>
            <div className="flex items-center">
              <button
                onClick={handleLike}
                className={`p-2 rounded-full ${
                  isLiked ? "text-red-500" : "text-gray-400"
                }`}
              >
                <FaHeart size={24} />
              </button>
              <span className="ml-2 text-gray-600">{tip.likes || 0} likes</span>
            </div>
          </div>

          <div className="flex items-center mt-2 mb-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              {tip.planttype}
            </span>
            <span className="ml-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {tip.level}
            </span>
          </div>

          <p className="text-gray-600 mb-4">{tip.description}</p>

          <div className="border-t pt-4">
            <h3 className="font-semibold text-gray-800">Category:</h3>
            <p className="text-gray-600">{tip.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
