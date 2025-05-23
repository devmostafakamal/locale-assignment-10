import { useLoaderData } from "react-router";

function ExploreGardeners() {
  const gardeners = useLoaderData();
  console.log(gardeners);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        🔍 Explore Gardeners
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gardeners.map((gardener) => (
          <div
            key={gardener._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Gardener Image */}
            <div className="h-48 bg-gray-200 overflow-hidden">
              {gardener.profileImage ? (
                <img
                  src={gardener.profileImage}
                  alt={gardener.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Image Available
                </div>
              )}
            </div>

            {/* Gardener Info */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold">{gardener.name}</h2>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    gardener.status === "active"
                      ? "bg-green-100 text-green-800"
                      : gardener.status === "new"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {gardener.status}
                </span>
              </div>

              <div className="mt-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Age:</span> {gardener.age}
                </p>
                <p>
                  <span className="font-medium">Gender:</span> {gardener.gender}
                </p>
              </div>

              <div className="mt-3">
                <h3 className="font-medium">Experience:</h3>
                <p className="text-sm">
                  {gardener.experience || "Not specified"}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm font-medium">
                  Shared Tips: {gardener.totalTips || 0}
                </span>
                {/* Add any action buttons here */}
                <button className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {gardeners.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No gardeners found</p>
        </div>
      )}
    </div>
  );
}

export default ExploreGardeners;
