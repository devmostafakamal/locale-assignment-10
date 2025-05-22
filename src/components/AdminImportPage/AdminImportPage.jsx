// import React from "react";
// import gardeners from "../data/gardeners.json";
// import tips from "../data/tips.json";

// function AdminImportPage() {
//   const handleImportGardeners = async () => {
//     try {
//       const res = await fetch(
//         "http:http://localhost:5173/api/gardeners/import",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(gardeners),
//         }
//       );
//       const result = await res.json();
//       alert(`Imported ${result.inserted} gardeners`);
//     } catch (err) {
//       console.error("Import gardeners failed", err);
//     }
//   };

//   const handleImportTips = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/tips/import", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(tips),
//       });
//       const result = await res.json();
//       alert(`Imported ${result.inserted} tips`);
//     } catch (err) {
//       console.error("Import tips failed", err);
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Import</h2>
//       <button onClick={handleImportGardeners}>Import Gardeners</button>
//       <button onClick={handleImportTips}>Import Tips</button>
//     </div>
//   );
// }

// export default AdminImportPage;
