import React from "react";

function FeatureGardenrs({ active }) {
  console.log(active);

  return <div>{active.name}</div>;
}

export default FeatureGardenrs;
