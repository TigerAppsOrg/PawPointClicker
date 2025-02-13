import React from "react";
import { Flex, Text, Box, Tooltip } from "@radix-ui/themes";
import formatNumberGenerators from "../utilities/formatNumberGenerators";

interface PowerUpButtonProps {
  label: string;
  cost: number;
  onClick: () => void;
  count: number; // Current cookie count to check affordability
  amount: number; // Amount of power-ups purchased
  rate: number; // Paw Points/sec for a single power-up
  icon: string; // Icon for each power-up
  iconBackground: string; // Background color for icon
  prestige: number; // Prestige level
  tooltip: string;
}

export default function PowerUpButton({
  label,
  cost,
  onClick,
  count,
  amount,
  icon,
  rate,
  iconBackground,
  prestige,
  tooltip,
}: PowerUpButtonProps) {
  const individualRate = rate * Math.pow(1.01, prestige);

  const totalRate = Math.round(amount * rate * Math.pow(1.01, prestige))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Calculate total Paw Points/sec

  return (
    <Tooltip content={tooltip}>
      <Flex
        justify="between"
        className="w-full flex-col gap-3 rounded-[0.85rem] border border-blue-400/70 bg-white/95 p-3 shadow-lg sm:h-32 sm:flex-row sm:items-center"
      >
        {/* Power-Up Info Section */}
        <Flex
          direction="column"
          className="sm:w-flex-shrink-0"
          style={{ minWidth: "190px" }} // Ensures constant size
        >
          <Text className="font-2xl" weight="bold">
            {label}
          </Text>

          <Text className="text-sm">
            Cost: {formatNumberGenerators(cost)} Points
          </Text>
          <Text className="text-sm">Owned: {amount}</Text>
          <Text className="text-sm font-semibold">
            {formatNumberGenerators(
              Number(totalRate.toString().replace(/[^0-9]/g, "")),
            )}{" "}
            Points/sec{" "}
          </Text>
          <Text className="text-[0.6rem] text-gray-500">
            {formatNumberGenerators(individualRate)} Points/collector
          </Text>
        </Flex>

        {/* <Separator size="4" orientation="vertical" /> */}

        {/* Dynamic Icon Display with Background */}
        <Flex
          className="relative h-full w-full overflow-hidden rounded-lg border border-gray-300"
          style={{
            backgroundImage: `url(${iconBackground})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box className="absolute left-0 top-0 z-10 h-full w-full bg-orange-200 opacity-70"></Box>
          <Flex
            justify="start"
            align="center"
            className="h-24 w-full flex-wrap gap-1 overflow-y-scroll p-[0.65rem] shadow-inner sm:h-full"
          >
            {Array.from({ length: amount }).map((_, index) => (
              <span
                key={index}
                className="z-20 h-min rotate-6 animate-wiggle rounded-full bg-white/30 p-[0.1rem] text-black duration-150 hover:rotate-12 hover:scale-105"
              >
                <img src={icon} className="h-9 w-auto" />
              </span>
            ))}
          </Flex>
        </Flex>
        {/* <Separator size="4" orientation="vertical" /> */}

        {/* Buy Button */}
        <button
          onClick={onClick}
          disabled={count < cost}
          className={`h-auto w-full text-balance rounded-lg bg-orange-400 p-2 font-bold text-orange-950 shadow-sm duration-150 hover:bg-orange-500 sm:h-full sm:w-auto sm:p-4 ${count < cost ? "opacity-50" : "opacity-100"}`}
        >
          Buy
        </button>
      </Flex>
    </Tooltip>
  );
}
