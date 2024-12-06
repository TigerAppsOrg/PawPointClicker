import React from "react";
import { Flex, Text, Button } from "@radix-ui/themes";

interface PowerUpButtonProps {
  label: string;
  cost: number;
  onClick: () => void;
  count: number; // Current cookie count to check affordability
}

export default function PowerUpButton({
  label,
  cost,
  onClick,
  count,
}: PowerUpButtonProps) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="m-2 rounded-lg border border-gray-300 bg-white p-4 shadow-md"
    >
      <Text className="font-2xl" weight="bold">
        {label}
      </Text>
      <Text className="mb-2">Cost: {cost} Cookies</Text>
      <Button
        onClick={onClick}
        disabled={count < cost}
        className={`w-full ${count < cost ? "opacity-50" : "opacity-100"}`}
      >
        Buy
      </Button>
    </Flex>
  );
}
