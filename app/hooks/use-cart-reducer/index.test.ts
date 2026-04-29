import { reducer, type CartState } from "./index.hook";
import {
  MOCKED_TSHIRT_BLUE_M,
  MOCKED_TSHIRT_RED_P,
} from "./mocks/products.mock";

const initialState: CartState = {
  items: new Map(),
};

describe("Given an cart", () => {
  describe("When add a new item on cart", () => {
    it('Should add a "Camiseta P vermelha"', () => {
      const state = reducer(initialState, {
        action: "add",
        payload: MOCKED_TSHIRT_RED_P,
      });

      const items = Array.from(state.items);
      const item = items[0][1];

      expect(items.length).toBe(1);
      expect(item).toBeTruthy();
      expect(item.title).toBe(MOCKED_TSHIRT_RED_P.title);
      expect(item.color).toBe(MOCKED_TSHIRT_RED_P.color);
      expect(item.size).toBe(MOCKED_TSHIRT_RED_P.size);
      expect(item.quantity).toBe(1);
    });

    describe("When add a new item identical an already added", () => {
      it('Should keep same items (merge) but increase the "quantity"', () => {
        let state = initialState;
        const itemsToAdd = 4;

        for (let i = 0; i < itemsToAdd; i++) {
          state = reducer(state, {
            action: "add",
            payload: MOCKED_TSHIRT_RED_P,
          });
        }

        const items = Array.from(state.items);
        const item = items[0][1];

        expect(items.length).toBe(1);
        expect(item).toBeTruthy();
        expect(item.title).toBe(MOCKED_TSHIRT_RED_P.title);
        expect(item.color).toBe(MOCKED_TSHIRT_RED_P.color);
        expect(item.size).toBe(MOCKED_TSHIRT_RED_P.size);
        expect(item.quantity).toBe(itemsToAdd);
      });
    });

    it('Should add a "Camisa M azul"', () => {
      const state = reducer(initialState, {
        action: "add",
        payload: MOCKED_TSHIRT_BLUE_M,
      });

      const items = Array.from(state.items);
      const item = items[0][1];

      expect(items.length).toBe(1);
      expect(item).toBeTruthy();
      expect(item.title).toBe(MOCKED_TSHIRT_BLUE_M.title);
      expect(item.color).toBe(MOCKED_TSHIRT_BLUE_M.color);
      expect(item.size).toBe(MOCKED_TSHIRT_BLUE_M.size);
      expect(item.quantity).toBe(1);
    });
  });

  describe("When remove a item from a cart", () => {
    it("Should remove the target item and keep others if there are", () => {
      let state = initialState;
      const itemsToAdd = 4;

      for (let i = 0; i < itemsToAdd; i++) {
        state = reducer(state, {
          action: "add",
          payload: MOCKED_TSHIRT_RED_P,
        });

        state = reducer(state, {
          action: "add",
          payload: MOCKED_TSHIRT_BLUE_M,
        });
      }

      expect(state.items.size).toBe(2);

      state = reducer(state, {
        action: "remove",
        payload: MOCKED_TSHIRT_BLUE_M,
      });

      const items = Array.from(state.items);
      const item = items[0][1];

      expect(items.length).toBe(1);
      expect(item).toBeTruthy();
      expect(item.title).toBe(MOCKED_TSHIRT_RED_P.title);
      expect(item.color).toBe(MOCKED_TSHIRT_RED_P.color);
      expect(item.size).toBe(MOCKED_TSHIRT_RED_P.size);
      expect(item.quantity).toBe(itemsToAdd);
    });

    it("Should set to 1 quantity if it's the only item in cart", () => {
      const tshirt = MOCKED_TSHIRT_RED_P;

      let initialState: CartState = {
        items: new Map(),
      };
      const itemsToAdd = 4;

      for (let i = 0; i < itemsToAdd; i++) {
        initialState = reducer(initialState, {
          action: "add",
          payload: tshirt,
        });
      }

      expect(initialState.items.size).toBe(1);
      expect(Array.from(initialState.items)[0][1].quantity).toBe(itemsToAdd);

      const state = reducer(initialState, {
        action: "remove",
        payload: tshirt,
      });

      const item = Array.from(state.items)[0][1];
      expect(state.items.size).toBe(1);
      expect(item.quantity).toBe(1);
      expect(item.title).toBe(tshirt.title);
      expect(item.color).toBe(tshirt.color);
      expect(item.size).toBe(tshirt.size);
    });
  });
});
