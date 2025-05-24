import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaEye } from "react-icons/fa";

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const handleFilterChange = (e) => {
    setDifficultyFilter(e.target.value);
  };
  const filteredTips =
    difficultyFilter === "All"
      ? tips
      : tips.filter(
          (tip) =>
            tip.level?.toLowerCase() === difficultyFilter.toLocaleLowerCase()
        );
  // console.log(tips);
  useEffect(() => {
    const fetchPublicTips = async () => {
      try {
        const response = await fetch("http://localhost:3000/garden-tips");
        const data = await response.json();
        setTips(data);
      } catch (error) {
        console.error("Error fetching tips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicTips();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading tips...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🌿 Public Gardening Tips</h1>
      <div className="text-center">
        <select onChange={handleFilterChange}>
          <option value="All">All Difficulty Levels</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Difficulty</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTips.length > 0 ? (
              filteredTips.map((tip) => (
                <tr key={tip._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    {tip.imageUrl ? (
                      <img
                        src={tip.imageUrl}
                        alt={tip.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No Image</span>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 font-medium">{tip.title}</td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      {tip.category}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-4 py-2 bg-green-300 rounded text-center">
                      {tip.level}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Link
                      to={`/tip-details/${tip._id}`}
                      className="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      <FaEye className="mr-2" />
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-500">
                  No public tips available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrowseTips;
