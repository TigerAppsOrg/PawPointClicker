import React from "react";
import { Flex, Text } from "@radix-ui/themes";
import PowerUpButton from "./powerUpButton";

export default function PowerUpMenu(props: {
  count: number;
  setCount: (count: number) => void;
  clickMultiplier: number;
  setClickMultiplier: (clickMultiplier: number) => void;
  farms: number;
  setFarms: (farms: number) => void;
  factories: number;
  setFactories: (factories: number) => void;
}) {
  const {
    count,
    setCount,
    clickMultiplier,
    setClickMultiplier,
    farms,
    setFarms,
    factories,
    setFactories,
  } = props;

  // Scaling function to increase costs with each purchase
  const getScaledCost = (baseCost: number, multiplier: number) => {
    return Math.floor(baseCost * Math.pow(1.2, multiplier)); // Increase by 20% per unit
  };

  const clickMultiplierCost = getScaledCost(5, clickMultiplier);
  const farmCost = getScaledCost(50, farms);
  const factoryCost = getScaledCost(200, factories);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="h-full w-full overflow-hidden bg-blue-200 p-6"
    >
      <Text className="font-4xl mb-4">Power-Up Menu</Text>
      <Flex direction="column" wrap="wrap" justify="center" className="gap-4">
        <PowerUpButton
          label="Click Multiplier"
          cost={clickMultiplierCost}
          count={count}
          onClick={() => {
            if (count >= clickMultiplierCost) {
              setCount(count - clickMultiplierCost);
              setClickMultiplier(clickMultiplier + 1);
            }
          }}
        />
        <PowerUpButton
          label="Farm"
          cost={farmCost}
          count={count}
          onClick={() => {
            if (count >= farmCost) {
              setCount(count - farmCost);
              setFarms(farms + 1);
            }
          }}
        />
        <PowerUpButton
          label="Factory"
          cost={factoryCost}
          count={count}
          onClick={() => {
            if (count >= factoryCost) {
              setCount(count - factoryCost);
              setFactories(factories + 1);
            }
          }}
        />
      </Flex>
    </Flex>
  );
}
