import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store.ts";
import { ToastContainer } from "react-toastify";




createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer
        theme="dark"
        toastClassName={() =>
          "bgMorphism flex text-lime-50 px-4 py-6 space-x-4 rounded-lg shadow-lg shadow-black border-2 border-black/90"
        }
        pauseOnFocusLoss
        draggable
        pauseOnHover
        autoClose={3000}
      />
      <App />
    </Provider>
  </StrictMode>
);
