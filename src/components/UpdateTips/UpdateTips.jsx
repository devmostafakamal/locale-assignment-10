import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

function UpdateTips() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load the tip data when component mounts
  useEffect(() => {
    const fetchTip = async () => {
      try {
        const response = await fetch(`http://localhost:3000/getTip/${id}`);
        if (!response.ok) throw new Error("Tip not found");
        const data = await response.json();
        setTip(data);
      } catch (error) {
        console.error("Error loading tip:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load tip data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updateData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`http://localhost:3000/updateTips/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update tip");
      }

      if (data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        // Redirect after successful update
        navigate(`/tip-details/${id}`);
      } else {
        Swal.fire({
          icon: "info",
          title: "No changes made",
          text: "The tip was found but no modifications were needed",
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error.message,
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!tip) return <div>Tip not found</div>;

  return (
    <div>
      <div className="px-10 md:px-40 py-8 lg:px-64 bg-[url('/src/assets/browse-tips-logo.jpg')] bg-cover bg-no-repeat">
        <form onSubmit={handleUpdate}>
          <div className="bg-[#32af43] lg:p-20 p-5 md:px-12 py-6">
            <div className="text-center">
              <h1 className="text-3xl">Update Garden Tip</h1>
            </div>
            <div className="">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Title</legend>
                <input
                  type="text"
                  name="title"
                  className="input w-full"
                  defaultValue={tip.title}
                  placeholder="e.g., How I Grow Tomatoes Indoors"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Plant Type</legend>
                <input
                  type="text"
                  name="planttype"
                  className="input w-full"
                  defaultValue={tip.planttype}
                  placeholder="Enter plant type"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">
                  Difficulty Level
                </legend>
                <select
                  name="level"
                  className="bg-white py-3 shadow-sm"
                  defaultValue={tip.level}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Description</legend>
                <textarea
                  name="description"
                  className="textarea w-full"
                  defaultValue={tip.description}
                  placeholder="Write your gardening tip here..."
                ></textarea>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Category</legend>
                <select
                  name="category"
                  className="bg-white py-3 shadow-sm"
                  defaultValue={tip.category}
                >
                  <option value="Composting">Composting</option>
                  <option value="Plant Care">Plant Care</option>
                  <option value="vertical gardening">Vertical Gardening</option>
                  <option value="Urban Gardening">Urban Gardening</option>
                  <option value="Raised Bed Gardening">
                    Raised Bed Gardening
                  </option>
                  <option value="Hydroponics">Hydroponics</option>
                  <option value="Permaculture">Permaculture</option>
                </select>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">
                  Availability
                </legend>
                <select
                  name="availability"
                  className="bg-white py-3 shadow-sm"
                  defaultValue={tip.availability}
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Photo URL</legend>
                <input
                  type="text"
                  name="photoUrl"
                  className="input w-full"
                  defaultValue={tip.photoUrl}
                  placeholder="Enter photo URL"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Name</legend>
                <input
                  type="text"
                  name="name"
                  className="input w-full"
                  defaultValue={tip.name}
                  readOnly
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg">Email</legend>
                <input
                  type="email"
                  name="email"
                  className="input w-full"
                  defaultValue={tip.email}
                  readOnly
                />
              </fieldset>
            </div>
            <button type="submit" className="btn btn-block">
              Update Garden Tip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTips;
