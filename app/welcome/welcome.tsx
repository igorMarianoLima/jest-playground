import { Box, Stack, Typography } from "@mui/material";
import { colorLabels, sizeLabels, TShirtCard } from "~/components/t-shirt-card";
import { useCartReducerHook } from "~/hooks/use-cart-reducer/index.hook";
import type { ITShirt } from "~/types/products/t-shirt.type";

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
              {item.quantity}x {item.title} {colorLabels[item.color]}{" "}
              {sizeLabels[item.size]}
            </Typography>
          </Box>
        ))}
      </Stack>
    </main>
  );
}
