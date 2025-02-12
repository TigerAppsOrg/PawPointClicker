import React from "react";
import { Flex, Text, Tooltip } from "@radix-ui/themes";
import PrestigeModal from "./prestigeModal";

interface StatsBarProps {
  count: number; // Current cookie count
  lifeTimeEarnings: number; // Total cookies earned over time
  totalEarnings: number; // Total cookies earned
  clickMultiplier: number; // Current click multiplier
  // scanner: number; // Number of scanners
  // farms: number;
  // mine: number;
  // factories: number;
  // bank: number;
  // lab: number;
  // temple: number;
  // spaceStation: number;
  prestige: number;
  handlePrestige: () => void;
  prestigeThreshold: number;
  passiveIncome: number; // Passive income per second
}

// Reusable component for each stat item
interface StatsItemProps {
  label: string;
  value: string | number;
  tooltip?: string;
}

const StatsItem: React.FC<StatsItemProps> = ({ label, value, tooltip }) => (
  <Tooltip content={tooltip}>
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="h-full w-full overflow-auto rounded-xl bg-gray-700 p-2 duration-150 hover:text-green-400"
    >
      <Text weight="bold" className="select-none text-center text-sm">
        {label}
      </Text>
      <Text className="text-center text-base font-medium">{value}</Text>
    </Flex>
  </Tooltip>
);

// Separate Prestige Button component
interface PrestigeButtonProps {
  prestige: number;
  handlePrestige: () => void;
  count: number;
  prestigeThreshold: number;
}

const PrestigeButton: React.FC<PrestigeButtonProps> = ({
  prestige,
  handlePrestige,
  count,
  prestigeThreshold,
}) => (
  <Flex className="relative flex-col gap-2 rounded-2xl bg-yellow-400 p-2">
    <Flex
      justify="center"
      align="center"
      className="h-full text-nowrap rounded-xl bg-yellow-500 px-2 py-2 text-sm font-bold"
    >
      {((Math.pow(1.01, prestige) - 1) * 100).toFixed(1)}% Boost
    </Flex>
    <PrestigeModal
      prestige={prestige}
      prestigeThreshold={prestigeThreshold}
      count={count}
      handlePrestige={handlePrestige}
    />
  </Flex>
);

export default function StatsBar({
  count,
  lifeTimeEarnings,
  totalEarnings,
  clickMultiplier,
  // scanner,
  // farms,
  // mine,
  // factories,
  // bank,
  // lab,
  // temple,
  // spaceStation,
  prestige,
  handlePrestige,
  prestigeThreshold,
  passiveIncome,
}: StatsBarProps) {
  return (
    <Flex className="w-full flex-col gap-2 bg-blue-400 p-3 sm:flex-row">
      <div className="grid w-full grid-cols-2 gap-2 overflow-auto rounded-2xl bg-gray-800 p-2 text-white shadow-md xl:grid-cols-4">
        {/* <StatsItem label="Points" value={count} /> */}
        <StatsItem
          label="Total Earnings"
          value={totalEarnings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          tooltip="Total cookies earned for the current prestige level."
        />
        <StatsItem
          label="Lifetime Earnings"
          value={lifeTimeEarnings
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          tooltip="Total cookies earned over all prestiges."
        />
        <StatsItem
          label="Passive Income"
          value={`${passiveIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} / sec`}
          tooltip="Paw Points earned per second from all generators."
        />
        <StatsItem
          label="Points Per Click"
          value={`+${Math.round(clickMultiplier * Math.pow(1.01, prestige))}`}
          tooltip="Paw Points generated per click."
        />
        {/* <StatsItem label="Upgrades" value={totalPowerUps} /> */}
      </div>
      <PrestigeButton
        prestige={prestige}
        handlePrestige={handlePrestige}
        count={count}
        prestigeThreshold={prestigeThreshold}
      />
    </Flex>
  );
}
