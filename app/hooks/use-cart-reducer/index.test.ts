import type { ITShirt } from "~/types/products/t-shirt.type";
import { reducer, type CartState } from "./index.hook";

const initialState: CartState = {
  items: new Map(),
};

describe("Given an cart", () => {
  describe("When add a new item on cart", () => {
    it('Should add a "Camiseta P vermelha"', () => {
      const state = reducer(initialState, {
        action: "add",
        payload: {
          title: "Camiseta",
          color: "red",
          size: "p",
        },
      });

      const items = Array.from(state.items);
      const item = items[0][1];

      expect(items.length).toBe(1);
      expect(item).toBeTruthy();
      expect(item.title).toBe("Camiseta");
      expect(item.color).toBe("red");
      expect(item.size).toBe("p");
      expect(item.quantity).toBe(1);
    });

    describe("When add a new item identical an already added", () => {
      it('Should keep same items (merge) but increase the "quantity"', () => {
        const product: ITShirt = {
          title: "Camiseta",
          color: "red",
          size: "p",
        };

        let state = initialState;
        const itemsToAdd = 4;

        for (let i = 0; i < itemsToAdd; i++) {
          state = reducer(state, {
            action: "add",
            payload: product,
          });
        }

        const items = Array.from(state.items);
        const item = items[0][1];

        expect(items.length).toBe(1);
        expect(item).toBeTruthy();
        expect(item.title).toBe("Camiseta");
        expect(item.color).toBe("red");
        expect(item.size).toBe("p");
        expect(item.quantity).toBe(itemsToAdd);
      });
    });

    it('Should add a "Camisa M azul"', () => {
      const state = reducer(initialState, {
        action: "add",
        payload: {
          title: "Camisa",
          color: "blue",
          size: "m",
        },
      });

      const items = Array.from(state.items);
      const item = items[0][1];

      expect(items.length).toBe(1);
      expect(item).toBeTruthy();
      expect(item.title).toBe("Camisa");
      expect(item.color).toBe("blue");
      expect(item.size).toBe("m");
      expect(item.quantity).toBe(1);
    });
  });
});
