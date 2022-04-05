import React from "react";
import { Route, Link, Routes } from "react-router-dom";
import Details from "./pages/details";
import "./App.css";
function App() {
  return (
    <div className="App">
      <React.Suspense fallback="Loading">
        <Routes>
          <Route
            path="*"
            element={
              <nav>
                <header className="App-header">
                  Users App
                  <Link to="details">Click here for Details</Link>
                </header>
              </nav>
            }
          />
          <Route path="details" element={<Details />} />
          <Route path="404" element={<h1>404 page</h1>} />
        </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
