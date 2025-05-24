import React, { use } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";

const ShareGardenTip = () => {
  const { user, shareTipsData, setShareTipsData } = use(AuthContext);
  console.log(user);
  const { displayName, email } = user;

  const ShareTipsHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const newShareTips = Object.fromEntries(formData.entries());

    fetch("http://localhost:3000/garden-tips", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newShareTips),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          console.log("after post ", data);

          Swal.fire({
            title: "You have succesfully shared data ",
            icon: "success",
            draggable: true,
          });
          form.reset();
        }
      });

    // setShareTipsData([...shareTipsData, newShareTips]);
  };

  return (
    <div className="px-10 md:px-40 py-8 lg:px-64 bg-[url('/src/assets/browse-tips-logo.jpg')] bg-cover bg-no-repeat ">
      <form onSubmit={ShareTipsHandler}>
        <div className="bg-[#32af43] lg:p-20 p-5 md:px-12 py-6">
          <div className="text-center">
            <h1 className="text-3xl ">Share a Garden Tip</h1>
          </div>
          <div className="">
            <fieldset className="fieldset ">
              <legend className="fieldset-legend text-lg">Title </legend>
              <input
                type="text"
                name="title"
                className="input w-full"
                placeholder="e.g., “How I Grow Tomatoes Indoors"
              />
            </fieldset>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend  text-lg">Plant Type</legend>
              <input
                type="text"
                name="planttype"
                className="input w-full"
                placeholder="Enter coffe Plant Type"
              />
            </fieldset>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend  text-lg">
                Difficulty Level{" "}
              </legend>
              <select name="level" className="bg-white py-3 shadow-sm">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend  text-lg">Description</legend>
              <textarea
                name="description"
                className="textarea w-full"
                placeholder="Write your gardening tip here..."
              ></textarea>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend  text-lg">Category </legend>
              <select name="category" className="bg-white py-3 shadow-sm">
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
            <fieldset className="fieldset ">
              <legend className="fieldset-legend  text-lg">
                Availability{" "}
              </legend>
              <select name="availability" className="bg-white py-3 shadow-sm">
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>
            </fieldset>

            <fieldset className="fieldset ">
              <legend className="fieldset-legend  text-lg">Photo URL</legend>
              <input
                type="text"
                name="photoUrl"
                className="input w-full"
                placeholder="Enter photoUrl"
              />
            </fieldset>

            <fieldset className="fieldset ">
              <legend className="fieldset-legend  text-lg">Name</legend>
              <input
                type="text"
                name="name"
                className="input w-full"
                value={displayName}
                readOnly
              />
            </fieldset>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend  text-lg">Email</legend>
              <input
                type="email"
                name="email"
                className="input w-full"
                value={email}
                readOnly
              />
            </fieldset>
          </div>
          {/* 2nd part */}
          <button type="submit" className="btn btn-block">
            Share garden tips{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShareGardenTip;
