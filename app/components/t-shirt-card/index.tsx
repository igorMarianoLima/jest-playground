import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useState } from "react";
import type {
  ITShirt,
  TShirtColor,
  TShirtSize,
} from "~/types/products/t-shirt.type";

interface TShirtCardProps {
  onAddToCart: (item: ITShirt) => void;
}

export const colorLabels: Record<TShirtColor, string> = {
  blue: "azul",
  red: "vermelha",
};

export const sizeLabels: Record<TShirtSize, string> = {
  g: "G",
  m: "M",
  p: "P",
};

export const TShirtCard: React.FC<TShirtCardProps> = ({ onAddToCart }) => {
  const [attributes, setAttributes] = useState<ITShirt>({
    title: "Camiseta",
    color: "blue",
    size: "p",
  });

  const handleChangeColor = (color: TShirtColor) => {
    setAttributes((prev) => ({
      ...prev,
      color,
    }));
  };

  const handleChangeSize = (size: TShirtSize) => {
    setAttributes((prev) => ({
      ...prev,
      size,
    }));
  };

  return (
    <Card>
      <CardHeader title="Personalize sua camiseta" />
      <CardContent>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Cor</FormLabel>
            <RadioGroup>
              {Object.entries(colorLabels).map(([color, label]) => (
                <FormControlLabel
                  key={color}
                  checked={attributes.color === color}
                  value={label}
                  control={<Radio />}
                  label={label}
                  onChange={() => handleChangeColor(color as TShirtColor)}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Tamanho</FormLabel>
            <RadioGroup>
              {Object.entries(sizeLabels).map(([size, label]) => (
                <FormControlLabel
                  key={size}
                  checked={attributes.size === size}
                  value={label}
                  control={<Radio />}
                  label={label}
                  onChange={() => handleChangeSize(size as TShirtSize)}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Stack>
      </CardContent>

      <CardActions>
        <Button onClick={() => onAddToCart(attributes)}>Adicionar</Button>
      </CardActions>
    </Card>
  );
};
