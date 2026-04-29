import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { TShirtCard } from "~/components/t-shirt-card";
import { useCartReducerHook } from "~/hooks/use-cart-reducer.hook";
import type { ITShirt } from "~/types/products/t-shirt.type";

type TShirtsCart = (ITShirt & { amount: number })[];

export function Welcome() {
  const { cart, dispatch } = useCartReducerHook();

  const handleAddToCart = (item: ITShirt) => {
    dispatch({
      action: "add",
      payload: item,
    });
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <Stack>
        <TShirtCard onAddToCart={handleAddToCart} />

        {Array.from(cart.items).map(([key, item]) => (
          <Box key={key}>
            <Typography>
              {item.quantity}x {item.title} {item.color} {item.size}
            </Typography>
          </Box>
        ))}
      </Stack>
    </main>
  );
}
