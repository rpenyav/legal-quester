import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingComponentSmall: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px",
        width: "100px",
      }}
    >
      <Spinner animation="border" role="status"></Spinner>
    </div>
  );
};

export default LoadingComponentSmall;
