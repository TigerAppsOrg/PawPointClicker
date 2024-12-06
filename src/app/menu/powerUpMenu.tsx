import React from "react";
import { Flex, Text } from "@radix-ui/themes";
import PowerUpButton from "./powerUpButton";
import { PointerIcon, Building2Icon, FactoryIcon } from "lucide-react";
import StatsBar from "./statsBar";

export default function PowerUpMenu(props: {
  count: number;
  setCount: (count: number) => void;
  lifeTimeEarnings: number;
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
    return Math.floor(baseCost * Math.pow(1.15, multiplier)); // Increase by 15% per unit
  };

  const clickMultiplierCost = getScaledCost(1, clickMultiplier);
  const farmCost = getScaledCost(15, farms);
  const factoryCost = getScaledCost(100, factories);

  return (
    <Flex
      direction="column"
      align="center"
      className="h-full w-full overflow-hidden bg-blue-200 p-6"
    >
      <StatsBar
        count={count}
        lifeTimeEarnings={props.lifeTimeEarnings}
        clickMultiplier={clickMultiplier}
        farms={farms}
        factories={factories}
      />

      <Flex
        align="center"
        direction="column"
        className="mt-4 h-full overflow-y-auto rounded-xl bg-blue-300 p-4"
      >
        <Text weight="bold" className="mb-4 text-2xl">
          Power-Up Menu
        </Text>
        <Flex
          direction="row"
          wrap="wrap"
          justify="center"
          className="w-full gap-4"
        >
          <PowerUpButton
            label="Point Multiplier"
            cost={clickMultiplierCost}
            count={count}
            amount={clickMultiplier} // Show amount of Click Multipliers
            onClick={() => {
              if (count >= clickMultiplierCost) {
                setCount(count - clickMultiplierCost);
                setClickMultiplier(clickMultiplier + 1);
              }
            }}
            icon={<PointerIcon />}
            rate={1}
            iconBackground="./images/banners/pointers.svg"
          />
          <PowerUpButton
            label="Point Farm"
            cost={farmCost}
            count={count}
            amount={farms} // Show amount of Farms
            onClick={() => {
              if (count >= farmCost) {
                setCount(count - farmCost);
                setFarms(farms + 1);
              }
            }}
            icon={<Building2Icon />}
            rate={5}
            iconBackground="./images/banners/farm.avif"
          />
          <PowerUpButton
            label="Point Factory"
            cost={factoryCost}
            count={count}
            amount={factories} // Show amount of Factories
            onClick={() => {
              if (count >= factoryCost) {
                setCount(count - factoryCost);
                setFactories(factories + 1);
              }
            }}
            icon={<FactoryIcon />}
            rate={10}
            iconBackground="./images/banners/factory.jpg"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
