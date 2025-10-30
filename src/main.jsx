import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./app.css";
import { CartProvider } from "./Pages/context/cartContext";

createRoot(document.getElementById("root")).render(
     <BrowserRouter>
          <CartProvider>
               <App />
          </CartProvider>
     </BrowserRouter>
);
