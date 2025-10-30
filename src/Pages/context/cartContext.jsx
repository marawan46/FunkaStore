// src/context/CartContext.jsx
import React, { createContext, useContext, useReducer } from "react";

/* Why: central cart state for add/remove/update across components */
const CartStateContext = createContext();
const CartDispatchContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(i => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { id: action.product.id, product: action.product, qty: 1 }]
      };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map(i => i.id === action.id ? { ...i, qty: action.qty } : i)
      };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      throw new Error("Unknown action: " + action.type);
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const actions = {
    addItem: (product) => dispatch({ type: "ADD_ITEM", product }),
    removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
    updateQty: (id, qty) => dispatch({ type: "UPDATE_QTY", id, qty }),
    clear: () => dispatch({ type: "CLEAR" }),
    itemCount: () => state.items.reduce((s, i) => s + i.qty, 0),
    total: () => state.items.reduce((s, i) => s + i.qty * (i.product.isOffer ? Number(i.product.offer_price):Number(i.product.price)), 0)
  };

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={actions}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCartState() {
  return useContext(CartStateContext);
}
export function useCart() {
  return useContext(CartDispatchContext);
}
