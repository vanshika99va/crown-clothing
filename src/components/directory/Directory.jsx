import React from "react";
import DirectoryItem from "../directory-item/DirectoryItem";
import "./Directory.scss";

function Directory({ categories }) {
  return (
    <div className="directory-container">
      {categories.map(({ title, id, imageUrl, route }) => (
        <DirectoryItem
          key={id}
          title={title}
          imageUrl={imageUrl}
          route={route}
        />
      ))}
    </div>
  );
}

export default Directory;
