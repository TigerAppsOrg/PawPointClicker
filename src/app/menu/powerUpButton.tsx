import React from "react";
import { Flex, Text, Box, Separator } from "@radix-ui/themes";

interface PowerUpButtonProps {
  label: string;
  cost: number;
  onClick: () => void;
  count: number; // Current cookie count to check affordability
  amount: number; // Amount of power-ups purchased
  rate: number; // Paw Points/sec for a single power-up
  icon: string; // Icon for each power-up
  iconBackground: string; // Background color for icon
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
}: PowerUpButtonProps) {
  const totalRate = amount * rate; // Calculate total Paw Points/sec

  return (
    <Flex
      justify="between"
      className="w-full flex-col gap-4 rounded-xl border-b border-gray-300 bg-white p-4 shadow-lg sm:h-32 sm:flex-row sm:items-center"
    >
      {/* Power-Up Info Section */}
      <Flex
        direction="column"
        className="sm:w-flex-shrink-0"
        style={{ minWidth: "160px" }} // Ensures constant size
      >
        <Text className="font-2xl" weight="bold">
          {label}
        </Text>
        <Text className="text-sm">Cost: {cost} Paw Points</Text>
        <Text className="text-sm">Owned: {amount}</Text>
        <Text className="text-sm font-semibold">{totalRate} Points/sec</Text>
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
          justify="center"
          className="ml-auto h-24 flex-wrap gap-1 overflow-y-scroll p-2 shadow-inner sm:h-full"
        >
          {Array.from({ length: amount }).map((_, index) => (
            <span
              key={index}
              className="z-20 h-min overflow-hidden rounded-full bg-white/30 p-[0.1rem] text-black"
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
        className={`h-auto w-full text-balance rounded-lg bg-orange-400 p-4 font-bold shadow-sm duration-150 hover:bg-orange-500 sm:h-full sm:w-auto ${count < cost ? "opacity-50" : "opacity-100"}`}
      >
        Buy
      </button>
    </Flex>
  );
}
