import React from "react";
import { css } from "@emotion/react";
import { BeatLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div
      className="fixed top-0 left-0 right-0 flex justify-center items-center bg-white z-50"
      style={{ height: "100vh" }}
    >
      <BeatLoader
        css={css`
          display: block;
          margin: 0 auto;
        `}
        size={15}
        color={"#123abc"}
        loading={true}
      />
    </div>
  );
};

export default LoadingSpinner;
