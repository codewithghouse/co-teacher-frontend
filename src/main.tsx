import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import ErrorBoundary from "./components/ErrorBoundary";

createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
);
// Register Service Worker for PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((reg) => console.log("SW Registered", reg))
            .catch((err) => console.log("SW Reg Error", err));
    });
}
