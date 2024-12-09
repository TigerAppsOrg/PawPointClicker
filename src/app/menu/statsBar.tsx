import React from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import {
  GemIcon,
  MoveRightIcon,
  XIcon,
  OctagonAlertIcon,
  CheckIcon,
} from "lucide-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const { arabToRoman } = require("roman-numbers");

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
  prestigeThreshold: number;
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
  count: number;
  prestigeThreshold: number;
}

const PrestigeButton: React.FC<PrestigeButtonProps> = ({
  prestige,
  handlePrestige,
  count,
  prestigeThreshold,
}) => (
  <Flex className="relative flex-col gap-2 rounded-xl bg-yellow-400 p-2">
    <Flex
      justify="center"
      align="center"
      className="h-full rounded-lg bg-yellow-500 px-2 py-2 text-sm font-bold"
    >
      {prestige}% Boost
    </Flex>
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="text-nowrap rounded-lg bg-red-500 px-3 py-2 text-sm text-white transition hover:bg-red-600">
          PRESTIGE {arabToRoman(prestige)}
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50" />
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50" />
          <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-orange-300 p-4 shadow-2xl focus:outline-none sm:p-8">
            <AlertDialog.Title className="text-2xl font-extrabold text-gray-800">
              Prestige System
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-4 text-gray-600">
              <Box>
                <Box className="rounded-lg bg-orange-200 p-4 text-lg font-medium">
                  Current Prestige Level:{" "}
                  <span className="text-red-600">{prestige}</span>
                  <Flex align="center" className="mt-2 text-sm text-gray-500">
                    <GemIcon className="mr-2 inline-block h-5 w-5" />
                    Bonus: {((Math.pow(1.01, prestige) - 1) * 100).toFixed(2)}%
                    Increase to Paw Point Generators
                  </Flex>
                </Box>
                <Box className="mt-4">
                  Each prestige increases overall paw point generation by{" "}
                  <span className="font-semibold text-blue-600">
                    1% per level.
                  </span>
                </Box>
              </Box>
              <Box className="mt-4 rounded-lg bg-orange-200 p-4">
                <Box className="text-lg font-medium">
                  Next Prestige Level:{" "}
                  <span className="text-green-600">{prestige + 1}</span>
                </Box>
                <Flex align="center" className="mt-2 flex">
                  <span className="font-semibold text-red-600">
                    {((Math.pow(1.01, prestige) - 1) * 100).toFixed(2)}%
                  </span>
                  <MoveRightIcon className="mx-2 text-gray-600" />
                  <span className="font-semibold text-green-600">
                    {((Math.pow(1.01, prestige + 1) - 1) * 100).toFixed(2)}%
                  </span>
                </Flex>
                <Flex align="center" className="mt-2 text-sm text-gray-500">
                  Boost progression: Current %{" "}
                  <MoveRightIcon className="mx-1 size-4 text-gray-600" />
                  Next %
                </Flex>
              </Box>
              <Box className="mt-4 rounded-lg bg-orange-400 p-4">
                <Box className="text-lg font-medium">
                  Your current Paw Point Balance:{" "}
                  <span className="text-gray-800">{count}</span>
                </Box>
                <Box className="mt-2">
                  Required to prestige:{" "}
                  <span className="font-semibold text-blue-600">
                    {prestigeThreshold}
                  </span>
                </Box>
              </Box>
              {count >= prestigeThreshold ? (
                <Flex className="mt-4 rounded-lg bg-green-300 p-4 font-extrabold text-green-800">
                  <CheckIcon className="my-auto mr-4 size-8 text-green-800 sm:size-6" />
                  <Box className="">You can prestige now!</Box>
                </Flex>
              ) : (
                <Flex className="mt-4 rounded-lg bg-red-400 p-4 font-extrabold text-red-800">
                  <OctagonAlertIcon className="my-auto mr-4 size-8 text-red-800 sm:size-6" />
                  <Box className="">
                    You need{" "}
                    <span className="font-bold">
                      {prestigeThreshold - count}
                    </span>{" "}
                    more Paw Points to prestige.
                  </Box>
                </Flex>
              )}
            </AlertDialog.Description>
            <div className="mt-8 flex justify-end gap-2">
              <AlertDialog.Cancel asChild>
                <Flex
                  align="center"
                  justify="center"
                  className="select-none rounded-lg bg-red-400 px-4 py-2 font-medium text-red-800 duration-150 hover:bg-red-300 focus:ring-2 focus:ring-red-300"
                >
                  CANCEL
                </Flex>
              </AlertDialog.Cancel>
              <AlertDialog.Cancel asChild>
                <XIcon className="absolute right-0 top-0 m-4 h-6 w-6 cursor-pointer sm:m-8" />
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Flex
                  align="center"
                  justify="center"
                  onClick={() => handlePrestige()}
                  className={`rounded-lg px-4 py-2 font-medium ${
                    count >= prestigeThreshold
                      ? "cursor-pointer bg-orange-500 text-orange-200 duration-150 hover:bg-orange-600 hover:text-orange-200 focus:ring-2 focus:ring-orange-400"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
                >
                  PRESTIGE {arabToRoman(prestige + 1)}
                </Flex>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Portal>
    </AlertDialog.Root>
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
  prestigeThreshold,
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
      <PrestigeButton
        prestige={prestige}
        handlePrestige={handlePrestige}
        count={count}
        prestigeThreshold={prestigeThreshold}
      />
    </Flex>
  );
}
