import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* An Error Boundary is a React component that catches rendering errors in its child tree, shows a fallback UI instead of crashing the whole app, and (optionally) lets you retry. */}
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/Dashboard")}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
