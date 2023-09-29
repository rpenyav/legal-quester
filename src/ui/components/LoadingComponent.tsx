import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingComponent: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="border" role="status">
        <span className="sr-only">Cargando...</span>
      </Spinner>
    </div>
  );
};

export default LoadingComponent;
