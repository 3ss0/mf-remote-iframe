import React, { useEffect, useState } from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import env from "./utils/env";
import { decodeMessage, encodeMessage } from "./utils";
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    iFrameResizer: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parentIFrame: any;
  }
}
const Module = () => {
  const [localStorageReady, setLocalStorageReady] = useState(false);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    window.iFrameResizer = {
      targetOrigin: env("HOST_URL"),
      onMessage: (data: string) => {
        const eventData = decodeMessage(data);
        if (eventData.type === "SET_STORAGE_DATA") {
          localStorage.setItem(
            "_AUTH_DATA_",
            JSON.stringify(eventData.payload)
          );
          setLocalStorageReady(true);
        }
      },
      onReady: () => {
        setIsReady(true);
        window.parentIFrame.sendMessage(encodeMessage("REMOTE_READY"));
      },
    };
  }, []);
  return (
    <React.StrictMode>
      {isReady && localStorageReady ? (
        <Router basename="/">
          <App />
        </Router>
      ) : (
        <div className="App">
          <h1>loading....</h1>
        </div>
      )}
    </React.StrictMode>
  );
};
export default Module;
