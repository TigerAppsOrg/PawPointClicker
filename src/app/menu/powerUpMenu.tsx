import React from "react";
import { Flex, Text } from "@radix-ui/themes";
import PowerUpButton from "./powerUpButton";
import {
  PointerIcon,
  Building2Icon,
  FactoryIcon,
  ScanBarcodeIcon,
} from "lucide-react";
import StatsBar from "./statsBar";

interface PowerUpMenuProps {
  count: number;
  setCount: (count: number) => void;
  lifeTimeEarnings: number;
  clickMultiplier: number;
  setClickMultiplier: (clickMultiplier: number) => void;
  scanner: number;
  setScanner: (scanner: number) => void;
  farms: number;
  setFarms: (farms: number) => void;
  mine: number;
  setMine: (mine: number) => void;
  factories: number;
  setFactories: (factories: number) => void;
  bank: number;
  setBank: (bank: number) => void;
  lab: number;
  setLab: (lab: number) => void;
  temple: number;
  setTemple: (temple: number) => void;
  spaceStation: number;
  setSpaceStation: (spaceStation: number) => void;
}

export default function PowerUpMenu({
  count,
  setCount,
  lifeTimeEarnings,
  clickMultiplier,
  setClickMultiplier,
  scanner,
  setScanner,
  farms,
  setFarms,
  mine,
  setMine,
  factories,
  setFactories,
  bank,
  setBank,
  lab,
  setLab,
  temple,
  setTemple,
  spaceStation,
  setSpaceStation,
}: PowerUpMenuProps) {
  // Scaling function to increase costs with each purchase
  const getScaledCost = (baseCost: number, multiplier: number) => {
    return Math.floor(baseCost * Math.pow(1.15, multiplier)); // Increase by 15% per unit
  };

  // Generic handler for purchasing power-ups
  const handlePurchase = (
    cost: number,
    currentAmount: number,
    setAmount: (newAmount: number) => void,
  ) => {
    if (count >= cost) {
      setCount(count - cost);
      setAmount(currentAmount + 1);
    }
  };

  // Costs for various power-ups
  const clickMultiplierCost = getScaledCost(5, clickMultiplier);
  const scannerCost = getScaledCost(15, scanner);
  const farmCost = getScaledCost(50, farms);
  const mineCost = getScaledCost(100, mine);
  const factoryCost = getScaledCost(1000, factories);
  const bankCost = getScaledCost(5000, bank);
  const labCost = getScaledCost(20000, lab);
  const templeCost = getScaledCost(75000, temple);
  const spaceStationCost = getScaledCost(130000, spaceStation);

  return (
    <Flex
      direction="column"
      align="center"
      className="h-full w-full overflow-hidden bg-blue-200 p-6"
    >
      <StatsBar
        count={count}
        lifeTimeEarnings={lifeTimeEarnings}
        clickMultiplier={clickMultiplier}
        scanner={scanner}
        farms={farms}
        mine={mine}
        factories={factories}
        bank={bank}
        lab={lab}
        temple={temple}
        spaceStation={spaceStation}
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
            label="Prox Multiplier"
            cost={clickMultiplierCost}
            count={count}
            amount={clickMultiplier}
            onClick={() =>
              handlePurchase(
                clickMultiplierCost,
                clickMultiplier,
                setClickMultiplier,
              )
            }
            icon="/images/generators/idcard.svg"
            rate={1}
            iconBackground="./images/banners/pointers.svg"
          />
          <PowerUpButton
            label="Prox Scanner"
            cost={scannerCost}
            count={count}
            amount={scanner}
            onClick={() => handlePurchase(scannerCost, scanner, setScanner)}
            rate={5}
            icon="/images/generators/prox_scanner.gif"
            iconBackground="./images/banners/proxscanner.jpg"
          />
          <PowerUpButton
            label="Point Farm"
            cost={farmCost}
            count={count}
            amount={farms}
            onClick={() => handlePurchase(farmCost, farms, setFarms)}
            icon="/images/generators/farm.png"
            rate={100}
            iconBackground="./images/banners/farm.avif"
          />
          <PowerUpButton
            label="McCosh Mines"
            cost={mineCost}
            count={count}
            amount={mine}
            onClick={() => handlePurchase(mineCost, mine, setMine)}
            icon="/images/generators/mines.webp"
            rate={200}
            iconBackground="./images/banners/mines.jpg"
          />
          <PowerUpButton
            label="Frist Factories"
            cost={factoryCost}
            count={count}
            amount={factories}
            onClick={() => handlePurchase(factoryCost, factories, setFactories)}
            icon="/images/generators/factories.png"
            rate={500}
            iconBackground="./images/banners/factory.jpg"
          />
          <PowerUpButton
            label="Point Bank"
            cost={bankCost}
            count={count}
            amount={bank}
            onClick={() => handlePurchase(bankCost, bank, setBank)}
            icon="/images/generators/bank.png"
            rate={1000}
            iconBackground="./images/banners/bank.webp"
          />
          <PowerUpButton
            label="Plasma Lab"
            cost={labCost}
            count={count}
            amount={lab}
            onClick={() => handlePurchase(labCost, lab, setLab)}
            icon="/images/generators/lab.png"
            rate={20000}
            iconBackground="./images/banners/lab.avif"
          />
          <PowerUpButton
            label="Temple"
            cost={templeCost}
            count={count}
            amount={temple}
            onClick={() => handlePurchase(templeCost, temple, setTemple)}
            icon="/images/generators/temple.png"
            rate={500000}
            iconBackground="./images/banners/forest.jpg"
          />
          <PowerUpButton
            label="Space Station"
            cost={spaceStationCost}
            count={count}
            amount={spaceStation}
            onClick={() =>
              handlePurchase(spaceStationCost, spaceStation, setSpaceStation)
            }
            icon="/images/generators/spacestation.png"
            rate={1000000}
            iconBackground="./images/banners/space.webp"
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
