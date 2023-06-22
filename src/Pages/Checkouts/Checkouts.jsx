import React from "react";
import "./checkouts.css";
import { Link } from "react-router-dom";

const Checkouts = () => {
  return (
    <>
      <section>
        <div className="content">
          <h2>OrderPlaced</h2>
          <h2>OrderPlaced</h2>
        </div>
        <Link
          to="/"
          style={{
            boxSizing: "border-box",
            textDecoration: "none",
            color: "#33c9eb",
            position: "absolute",
            bottom: 50,
            left: 100,
            fontFamily: "Poppins",
            fontSize: "1.5rem",
            border: "2px solid #33c9eb",
            padding: "8px",
          }}
        >
          SHOP MORE
        </Link>
        <Link
          to="/myorders"
          style={{
            boxSizing: "border-box",
            textDecoration: "none",
            color: "#33c9eb",
            position: "absolute",
            bottom: 50,
            right: 100,
            fontFamily: "Poppins",
            fontSize: "1.5rem",
            border: "2px solid #33c9eb",
            padding: "8px",
          }}
        >
          Your Orders
        </Link>
      </section>
    </>
  );
};

export default Checkouts;
