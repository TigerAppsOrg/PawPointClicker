import React from "react";
import { Flex, Text, Button, Box } from "@radix-ui/themes";

interface PowerUpButtonProps {
  label: string;
  cost: number;
  onClick: () => void;
  count: number; // Current cookie count to check affordability
  amount: number; // Amount of power-ups purchased
  icon: React.ReactNode; // Icon for each power-up
  rate: number; // Paw Points/sec for a single power-up
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
      direction="row"
      align="center"
      justify="between"
      className="h-32 w-full gap-4 rounded-xl border-b border-gray-300 bg-white p-4 shadow-sm"
    >
      {/* Power-Up Info Section */}
      <Flex
        direction="column"
        className="w-flex-shrink-0"
        style={{ minWidth: "200px" }} // Ensures constant size
      >
        <Text className="font-2xl" weight="bold">
          {label}
        </Text>
        <Text className="text-sm">Cost: {cost} Paw Points</Text>
        <Text className="text-sm">Owned: {amount}</Text>
        <Text className="text-sm">Paw Points/sec: {totalRate}</Text>
      </Flex>

      {/* Dynamic Icon Display with Background */}
      <Flex
        className="relative h-full w-full overflow-hidden rounded-lg"
        style={{
          backgroundImage: `url(${iconBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box className="absolute left-0 top-0 z-10 h-full w-full bg-gray-100 opacity-60"></Box>
        <Flex className="ml-auto h-full flex-wrap items-end gap-1 overflow-y-auto p-2 shadow-inner">
          {Array.from({ length: amount }).map((_, index) => (
            <span
              key={index}
              className="z-20 rounded-full bg-white/60 p-1 text-black"
            >
              {icon}
            </span>
          ))}
        </Flex>
      </Flex>

      {/* Buy Button */}
      <button
        onClick={onClick}
        disabled={count < cost}
        className={`ml-4 h-full text-balance rounded-lg bg-orange-400 p-4 font-bold duration-150 hover:bg-orange-500 ${count < cost ? "opacity-50" : "opacity-100"}`}
      >
        Buy
      </button>
    </Flex>
  );
}
