import { useReducer } from "react";
import type { ITShirt } from "~/types/products/t-shirt.type";

type CartItem = ITShirt & { quantity: number };

interface CartState {
  items: Map<string, CartItem>;
}

type CartAction =
  | {
      action: "add";
      payload: ITShirt;
    }
  | {
      action: "remove";
      payload: ITShirt;
    };

const initialState: CartState = { items: new Map() };

const getTShirtKey = (item: ITShirt) => {
  return `${item.title}-${item.color}-${item.size}`;
};

const reducer = (state: CartState, action: CartAction): CartState => {
  if (action.action === "add") {
    const tshirt = action.payload;

    const items = new Map(state.items);
    const key = getTShirtKey(tshirt);

    const addedItem = items.get(key);

    if (!!addedItem) {
      items.set(key, {
        ...addedItem,
        quantity: addedItem.quantity + 1,
      });
    } else {
      items.set(key, { ...tshirt, quantity: 1 });
    }

    return {
      ...state,
      items,
    };
  }

  return state;
};

export const useCartReducerHook = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    cart: state,
    dispatch,
  };
};
