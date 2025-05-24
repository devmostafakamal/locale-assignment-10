import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import MyTipsInfo from "../MyTipsInfo/MyTipsInfo";

function MyTips() {
  const { user } = useContext(AuthContext);
  const [myTips, setMyTips] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/my-tips")
      .then((res) => res.json())
      .then((data) =>
        setMyTips(data.filter((tip) => tip.email === user.email))
      );
  }, []);
  const handleDeleteUI = (deleteId) => {
    setMyTips(myTips.filter((tips) => tips._id !== deleteId));
  };

  return (
    <div>
      <div className="overflow-scroll">
        <table className="table w-full border border-[#15d35e]">
          <thead>
            <tr className="border-b-2 border-[#15d35e] bg-[#caebaf] text-[#226e1d]">
              <th className="p-3 min-w-[120px] text-left text-xl font-bold">
                Image
              </th>
              <th className="p-3 min-w-[160px] text-left text-xl font-bold">
                Name
              </th>
              <th className="p-3 min-w-[160px] text-left text-xl font-bold">
                Title
              </th>
              <th className="p-3 min-w-[120px] text-left text-xl font-bold">
                Category
              </th>
              <th className="p-3 min-w-[100px] text-left text-xl font-bold">
                Level
              </th>
              <th className="p-3 min-w-[100px] text-left text-xl font-bold">
                Avaibality
              </th>
              <th className="p-3 min-w-[100px] text-left text-xl font-bold">
                Likes
              </th>
              <th className="p-3 min-w-[120px] text-left text-xl font-bold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {myTips.map((mytip, i) => (
              <MyTipsInfo
                key={i}
                mytip={mytip}
                handleDeleteUI={handleDeleteUI}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyTips;
