import React from "react";
import { Flex, Box, Text } from "@radix-ui/themes";

interface StatsBarProps {
  count: number; // Current cookie count
  lifeTimeEarnings: number; // Total cookies earned over time
  totalEarnings: number; // Total cookies earned
  clickMultiplier: number; // Current click multiplier
  scanner: number; // Number of scanners
  farms: number;
  mine: number;
  factories: number;
  bank: number;
  lab: number;
  temple: number;
  spaceStation: number;
  prestige: number;
  handlePrestige: () => void;
  passiveIncome: number; // Passive income per second
}

// Reusable component for each stat item
interface StatsItemProps {
  label: string;
  value: string | number;
}

const StatsItem: React.FC<StatsItemProps> = ({ label, value }) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    className="h-full w-full overflow-auto rounded-xl bg-gray-700 p-2 hover:text-green-400"
  >
    <Text weight="bold" className="text-center text-sm">
      {label}
    </Text>
    <Text className="text-base">{value}</Text>
  </Flex>
);

// Separate Prestige Button component
interface PrestigeButtonProps {
  prestige: number;
  handlePrestige: () => void;
}

const PrestigeButton: React.FC<PrestigeButtonProps> = ({
  prestige,
  handlePrestige,
}) => (
  <Flex className="flex-col gap-2 rounded-xl bg-yellow-400 p-2">
    <Flex
      justify="center"
      align="center"
      className="h-full rounded-xl bg-yellow-500 px-2 py-2 text-sm font-bold"
    >
      x{Math.pow(1.01, prestige).toFixed(2)} Pts
    </Flex>
    <button
      onClick={handlePrestige}
      className="rounded-xl bg-red-500 px-3 py-2 text-sm text-white transition hover:bg-red-600"
    >
      PRESTIGE
    </button>
  </Flex>
);

export default function StatsBar({
  count,
  lifeTimeEarnings,
  totalEarnings,
  clickMultiplier,
  scanner,
  farms,
  mine,
  factories,
  bank,
  lab,
  temple,
  spaceStation,
  prestige,
  handlePrestige,
  passiveIncome,
}: StatsBarProps) {
  // Calculate total power-ups
  // const totalPowerUps =
  //   clickMultiplier +
  //   scanner +
  //   farms +
  //   factories +
  //   mine +
  //   bank +
  //   lab +
  //   temple +
  //   spaceStation;

  return (
    <Flex className="w-full flex-col gap-2 bg-blue-400 p-2 sm:flex-row">
      <div className="grid w-full grid-cols-2 gap-2 overflow-auto rounded-xl bg-gray-800 p-2 text-white shadow-md sm:grid-cols-4">
        {/* <StatsItem label="Points" value={count} /> */}
        <StatsItem
          label="Total Earnings"
          value={totalEarnings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        />
        <StatsItem
          label="Lifetime Earnings"
          value={lifeTimeEarnings
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        />
        <StatsItem
          label="Passive Income"
          value={`${passiveIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} /sec`}
        />
        <StatsItem label="Points per Click" value={`x${clickMultiplier}`} />
        {/* <StatsItem label="Upgrades" value={totalPowerUps} /> */}
      </div>
      <PrestigeButton prestige={prestige} handlePrestige={handlePrestige} />
    </Flex>
  );
}
