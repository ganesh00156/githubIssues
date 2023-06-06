import React from "react";
import { css } from "@emotion/react";
import { BarLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div
      className="fixed top-0 left-0 w-screen flex justify-center items-center bg-white z-50 "
      style={{ height: "100vh" }}
    >
      <BarLoader
        css={css`
          display: block;
          margin: 0 auto;
          border-color: red;
        `}
        size={15}
        color={"#123abc"}
        loading={true}
      />
    </div>
  );
};

export default Spinner;
