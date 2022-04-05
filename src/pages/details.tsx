import React, { useEffect, useState } from "react";
import "./details.css";
import apiInstance from "../api";
import { encodeMessage } from "../utils";

const USER_ATTRIBUTES = ["name", "email", "phone", "role"];
function Details() {
  const [userData, setUserData] = useState();
  function getData() {
    const protected_service = "";
    apiInstance.get(`${protected_service}`).then((response) => {
      setUserData(response.data);
    });
  }
  useEffect(() => {
    getData();
    window.parentIFrame.sendMessage(
      encodeMessage("PAGE_TRANSITION", { data: "details" })
    );
  }, []);
  return (
    <section>
      <h1>User Details</h1>
      {userData &&
        USER_ATTRIBUTES.map((attribute: string, index: number) => {
          return (
            <div key={index}>
              <h3>
                {attribute} :{" "}
                <span className="value">{(userData || {})[attribute]}</span>
              </h3>
            </div>
          );
        })}
    </section>
  );
}

export default Details;
