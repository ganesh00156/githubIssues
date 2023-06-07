import React from "react";

const Label = ({ issue }) => {
  return (
    <>
      {" "}
      {issue.labels.map((label) => (
        <span
          className="ml-2 rounded-lg font-thin pl-1 pr-1 text-sm"
          key={label.id}
          style={{
            backgroundColor: `#${label.color}`,
            color:
              label.color === "9149d1" || label.color === "b60205"
                ? "white"
                : "inherit",
          }}
        >
          {" "}
          {label.name}{" "}
        </span>
      ))}
    </>
  );
};

export default Label;
