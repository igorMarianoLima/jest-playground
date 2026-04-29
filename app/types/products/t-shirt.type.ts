import type { IProduct } from "./product.type";

export type TShirtColor = "red" | "blue";
export type TShirtSize = "p" | "m" | "g";

export interface ITShirt extends IProduct {
  color: TShirtColor;
  size: TShirtSize;
}
