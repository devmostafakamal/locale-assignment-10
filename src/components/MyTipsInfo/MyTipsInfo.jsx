import React from "react";
import { FcLike } from "react-icons/fc";
import { NavLink } from "react-router";
import Swal from "sweetalert2";

const MyTipsInfo = ({ mytip, handleDeleteUI }) => {
  const { _id, title, photoUrl, category, level, name, availability, likes } =
    mytip;
  //   console.log(mytip);

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/my-tips/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              handleDeleteUI(id);
            }
          });
      }
    });
  };

  return (
    <tr className="border-b border-[#15d35e]">
      <td className="p-3 min-w-[120px]">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              {photoUrl && <img src={photoUrl} alt="Avatar" />}
            </div>
          </div>
        </div>
      </td>
      <td className="p-3 min-w-[100px] text-sm text-gray-600">{name}</td>
      <td className="p-3 min-w-[160px]">
        <span className="block text-sm font-medium text-gray-800">{title}</span>
      </td>

      <td className="p-3 min-w-[120px] text-sm text-gray-600">{category}</td>

      <td className="p-3 min-w-[100px] text-sm text-gray-600">{level}</td>
      <td className="p-3 min-w-[100px] text-sm text-gray-600">
        {availability}
      </td>
      <td className="p-3 min-w-[100px] text-sm text-gray-600">
        <span className="flex">
          {" "}
          <FcLike size={20} /> {likes}
        </span>
      </td>

      <td className="p-3 min-w-[120px]">
        <NavLink to={`/update-tips/${_id}`}>
          <button className="btn btn-xs bg-[#15d35e] text-white w-full md:w-20 h-7">
            Update
          </button>
        </NavLink>

        <button
          onClick={() => deleteHandler(_id)}
          className="btn btn-xs bg-[#15d35e] text-white w-full md:w-20 h-7"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MyTipsInfo;
