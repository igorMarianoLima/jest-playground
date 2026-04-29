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
    });
  });
});
