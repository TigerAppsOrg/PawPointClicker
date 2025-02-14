import React from "react";
import { Flex } from "@radix-ui/themes";
import PowerUpButton from "./powerUpButton";
import StatsBar from "./statsBar";

interface PowerUpMenuProps {
  count: number;
  setCount: (count: number) => void;
  lifeTimeEarnings: number;
  totalEarnings: number;
  clickMultiplier: number;
  setClickMultiplier: (clickMultiplier: number) => void;
  lateMeal: number;
  setLateMeal: (lateMeal: number) => void;
  scanner: number;
  setScanner: (scanner: number) => void;
  deliveries: number;
  setDeliveries: (deliveries: number) => void;
  resco: number;
  setResco: (resco: number) => void;
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
  prestige: number;
  handlePrestige: () => void;
  prestigeThreshold: number;
  passiveIncome: number;
  userClicks: number;
  playTime: number;
}

export default function PowerUpMenu({
  count,
  setCount,
  lifeTimeEarnings,
  totalEarnings,
  clickMultiplier,
  setClickMultiplier,
  lateMeal,
  setLateMeal,
  scanner,
  setScanner,
  deliveries,
  setDeliveries,
  resco,
  setResco,
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
  prestige,
  handlePrestige,
  prestigeThreshold,
  passiveIncome,
  userClicks,
  playTime,
}: PowerUpMenuProps) {
  // Calculate total power-ups
  const totalPowerUps =
    clickMultiplier +
    lateMeal +
    scanner +
    deliveries +
    resco +
    farms +
    factories +
    mine +
    bank +
    lab +
    temple +
    spaceStation;

  // Check if each power-up is unlocked
  const unlocked =
    (clickMultiplier > 0 ? 1 : 0) +
    (lateMeal > 0 ? 1 : 0) +
    (scanner > 0 ? 1 : 0) +
    (deliveries > 0 ? 1 : 0) +
    (resco > 0 ? 1 : 0) +
    (farms > 0 ? 1 : 0) +
    (mine > 0 ? 1 : 0) +
    (factories > 0 ? 1 : 0) +
    (bank > 0 ? 1 : 0) +
    (lab > 0 ? 1 : 0) +
    (temple > 0 ? 1 : 0) +
    (spaceStation > 0 ? 1 : 0);

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

  // Scaling function to increase costs with each purchase
  const getScaledCost = (baseCost: number, multiplier: number) => {
    return Math.floor(baseCost * Math.pow(1.15, multiplier)); // Increase by 15% per unit
  };

  // Costs for various power-ups
  const clickMultiplierCost = getScaledCost(15, clickMultiplier);
  const lateMealCost = getScaledCost(100, lateMeal);
  const scannerCost = getScaledCost(1100, scanner);
  const deliveriesCost = getScaledCost(12000, deliveries);
  const rescoCost = getScaledCost(130000, resco);
  const farmCost = getScaledCost(1400000, farms);
  const mineCost = getScaledCost(20000000, mine);
  const factoryCost = getScaledCost(330000000, factories);
  const bankCost = getScaledCost(5100000000, bank);
  const labCost = getScaledCost(75000000000, lab);
  const templeCost = getScaledCost(1000000000000, temple);
  const spaceStationCost = getScaledCost(14000000000000, spaceStation);

  return (
    <Flex
      direction="column"
      align="center"
      className="relative z-20 h-full w-full overflow-hidden bg-blue-200"
    >
      <StatsBar
        count={count}
        lifeTimeEarnings={lifeTimeEarnings}
        totalEarnings={totalEarnings}
        clickMultiplier={clickMultiplier}
        prestige={prestige}
        handlePrestige={handlePrestige}
        prestigeThreshold={prestigeThreshold}
        passiveIncome={passiveIncome}
        userClicks={userClicks}
        playTime={playTime}
      />

      <Flex
        align="center"
        direction="column"
        className="relative m-3 h-full w-auto overflow-hidden rounded-2xl border border-blue-500/30 bg-blue-300/90 backdrop-blur-md"
      >
        <Flex className="flex w-full flex-col gap-3 border-b border-white/20 border-b-blue-500/30 bg-blue-400 p-3 text-white sm:flex-row">
          <Flex
            align="center"
            justify="center"
            className="ml-1 text-center text-xl font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          >
            Paw Point Generators
          </Flex>
          <Flex className="gap-2 font-semibold sm:ml-auto sm:mt-0 sm:h-full sm:gap-4">
            <Flex
              justify="center"
              className="w-full rounded-lg bg-blue-500/70 p-2 text-center text-sm text-white shadow-inner sm:w-auto"
            >
              Owned: {totalPowerUps}
            </Flex>
            <Flex
              justify="center"
              className="w-full rounded-lg bg-blue-500/70 p-2 text-center text-sm text-white shadow-inner sm:w-auto"
            >
              Unlocked: {unlocked}/12
            </Flex>
          </Flex>
        </Flex>

        <Flex
          direction="row"
          wrap="wrap"
          justify="center"
          className="z-10 h-full w-full gap-3 overflow-y-auto p-3 shadow-inner"
        >
          <PowerUpButton
            label="Click Multiplier"
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
            iconBackground="./images/banners/pointers.jpg"
            prestige={prestige}
            tooltip="Adds a multiplier to Paw Points generated per click AND swipes extra proxes for you!"
          />
          <PowerUpButton
            label="Late Meal Swipe"
            cost={lateMealCost}
            count={count}
            amount={lateMeal}
            onClick={() => handlePurchase(lateMealCost, lateMeal, setLateMeal)}
            icon="/images/generators/latemeal.png"
            rate={2}
            iconBackground="./images/banners/latemeal.jpg"
            prestige={prestige}
            tooltip="Exchanges your unused Late Meals for Paw Points."
          />
          <PowerUpButton
            label="Prox Scanner"
            cost={scannerCost}
            count={count}
            amount={scanner}
            onClick={() => handlePurchase(scannerCost, scanner, setScanner)}
            rate={8}
            icon="/images/generators/prox_scanner.gif"
            iconBackground="./images/banners/proxscanner.jpg"
            prestige={prestige}
            tooltip="Scans Proxes for extra Paw Points."
          />
          <PowerUpButton
            label="Frist Delivery"
            cost={deliveriesCost}
            count={count}
            amount={deliveries}
            onClick={() =>
              handlePurchase(deliveriesCost, deliveries, setDeliveries)
            }
            icon="/images/generators/delivery.png"
            rate={47}
            iconBackground="./images/banners/delivery.jpg"
            prestige={prestige}
            tooltip="Your package TBA123456789123 is ready for collection."
          />
          <PowerUpButton
            label="Residential College"
            cost={rescoCost}
            count={count}
            amount={resco}
            onClick={() => handlePurchase(rescoCost, resco, setResco)}
            icon="/images/generators/dorm.webp"
            rate={260}
            iconBackground="./images/banners/resco.jpg"
            prestige={prestige}
            tooltip="Harvests Paw Points from every dorm."
          />
          <PowerUpButton
            label="Farmer's Market"
            cost={farmCost}
            count={count}
            amount={farms}
            onClick={() => handlePurchase(farmCost, farms, setFarms)}
            icon="/images/generators/farm.png"
            rate={1400}
            iconBackground="./images/banners/farm.jpg"
            prestige={prestige}
            tooltip="Grows Paw Points straight from the fields."
          />
          <PowerUpButton
            label="McCosh Mines"
            cost={mineCost}
            count={count}
            amount={mine}
            onClick={() => handlePurchase(mineCost, mine, setMine)}
            icon="/images/generators/mines.webp"
            rate={7800}
            iconBackground="./images/banners/mines.jpg"
            prestige={prestige}
            tooltip="Digs deep for those hidden Paw Points."
          />
          <PowerUpButton
            label="Prox Factory"
            cost={factoryCost}
            count={count}
            amount={factories}
            onClick={() => handlePurchase(factoryCost, factories, setFactories)}
            icon="/images/generators/factories.png"
            rate={44000}
            iconBackground="./images/banners/factory.jpg"
            prestige={prestige}
            tooltip="Manufactures Paw Points for the masses."
          />
          <PowerUpButton
            label="Endowment Bank"
            cost={bankCost}
            count={count}
            amount={bank}
            onClick={() => handlePurchase(bankCost, bank, setBank)}
            icon="/images/generators/bank.png"
            rate={260000}
            iconBackground="./images/banners/bank.jpg"
            prestige={prestige}
            tooltip="Invests your Paw Points for future growth."
          />
          <PowerUpButton
            label="Plasma Physics Lab"
            cost={labCost}
            count={count}
            amount={lab}
            onClick={() => handlePurchase(labCost, lab, setLab)}
            icon="/images/generators/lab.png"
            rate={1600000}
            iconBackground="./images/banners/lab.jpg"
            prestige={prestige}
            tooltip="Conducts experiments to generate Paw Points."
          />
          <PowerUpButton
            label="Prox Temple"
            cost={templeCost}
            count={count}
            amount={temple}
            onClick={() => handlePurchase(templeCost, temple, setTemple)}
            icon="/images/generators/temple.png"
            rate={10000000}
            iconBackground="./images/banners/forest.jpg"
            prestige={prestige}
            tooltip="Worships the Paw Points for blessings."
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
            rate={65000000}
            iconBackground="./images/banners/space.webp"
            prestige={prestige}
            tooltip="Orbits the Earth collecting Paw Points."
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
