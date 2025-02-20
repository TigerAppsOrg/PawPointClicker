import React from "react";
import { Flex, Text, Box, Tooltip, Separator } from "@radix-ui/themes";
import formatNumberGenerators from "../utilities/formatNumberGenerators";
import {
  BoxIcon,
  DollarSignIcon,
  LockKeyholeIcon,
  PawPrintIcon,
  PlusCircleIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "lucide-react";

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
  const totalRate = amount * rate * Math.pow(1.01, prestige); // Calculate total Paw Points/sec

  const individualRate = rate * Math.pow(1.01, prestige);

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
          style={{ minWidth: "180px" }} // Ensures constant size
        >
          <Text className="text-[0.95rem] font-bold">{label}</Text>
          <Flex
            align="center"
            className="my-0.5 justify-start truncate text-[0.77rem] font-semibold"
          >
            <img
              src="/images/prox.svg"
              alt="Prox"
              className="mr-1 size-4 rounded-full border-[0.5px] border-orange-800"
            />{" "}
            {formatNumberGenerators(Number(totalRate))} Points/sec{" "}
          </Flex>
          <Tooltip
            content={`Each ${label} has a base paw point production rate of ${rate.toFixed(1)} Points/sec, which is being multiplied by ${Math.pow(1.01, prestige).toFixed(2)} from your Prestige ${prestige} boost.`}
          >
            <Text className="cursor-pointer truncate text-[0.6rem] text-gray-500">
              *Each produces {formatNumberGenerators(Number(individualRate))}{" "}
              Points/sec
            </Text>
          </Tooltip>
          <Flex align="center" className="mt-1 truncate text-[0.7rem]">
            <ShoppingCartIcon className="mr-2 size-3" />
            <Text className="font-semibold">Cost</Text>:{" "}
            {formatNumberGenerators(cost)} Points
          </Flex>
          <Flex align="center" className="text-[0.7rem]">
            <BoxIcon className="mr-2 size-3" />
            <Text className="font-semibold">Owned</Text>: {amount}
          </Flex>
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
                className="z-20 h-min rotate-3 animate-wiggle rounded-full bg-white/30 p-[0.1rem] text-black duration-150 hover:rotate-6 hover:scale-105"
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
          className={`flex h-auto w-full flex-row items-center justify-center gap-1 text-balance rounded-lg bg-orange-400 p-2 font-bold text-orange-950 shadow-sm duration-150 hover:bg-orange-500 hover:text-orange-900 sm:h-full sm:w-auto sm:flex-col sm:p-4 ${count < cost ? "opacity-50" : "opacity-100"}`}
        >
          {count < cost ? (
            <LockKeyholeIcon className="size-4 sm:mx-auto" />
          ) : (
            <PlusCircleIcon className="size-4 sm:mx-auto" />
          )}
          Buy
        </button>
      </Flex>
    </Tooltip>
  );
}
