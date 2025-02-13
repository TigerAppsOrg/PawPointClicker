import React from "react";
import { Flex, Text, Tooltip } from "@radix-ui/themes";
import {
  DollarSign,
  Star,
  Clock,
  MousePointer,
  HourglassIcon,
  TargetIcon,
  InfoIcon,
  ChevronsUpIcon,
} from "lucide-react";
import PrestigeModal from "./prestigeModal";
import formatNumberGenerators from "../utilities/formatNumberGenerators";

interface StatsBarProps {
  count: number;
  lifeTimeEarnings: number;
  totalEarnings: number;
  clickMultiplier: number;
  prestige: number;
  handlePrestige: () => void;
  prestigeThreshold: number;
  passiveIncome: number;
  userClicks: number;
  playTime: number;
}

interface StatsItemProps {
  label: string;
  value: string | number;
  tooltip?: string;
  Icon: React.ElementType;
  textColor: string;
  formatNumber: boolean;
}

const StatsItem: React.FC<StatsItemProps> = ({
  label,
  value,
  tooltip,
  Icon,
  textColor,
  formatNumber,
}) => (
  <Tooltip content={tooltip}>
    <Flex
      className={`h-full w-full items-center justify-center rounded-xl bg-gray-700 p-2 shadow-lg duration-150 ${textColor}`}
    >
      <Flex className="mr-1 flex-shrink-0 rounded-md bg-gray-600 p-2">
        <Icon className={`h-5 w-5 text-yellow-400`} />
      </Flex>
      <Flex className="flex-grow flex-col items-center text-center">
        <Text className="select-none text-[0.75rem] font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {label}
        </Text>
        <Text className="w-full truncate text-[0.75rem] font-medium text-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          {value}
        </Text>
      </Flex>
    </Flex>
  </Tooltip>
);

interface PrestigeButtonProps {
  prestige: number;
  handlePrestige: () => void;
  count: number;
  prestigeThreshold: number;
  prestigeBoost: string;
}

const PrestigeButton: React.FC<PrestigeButtonProps> = ({
  prestige,
  handlePrestige,
  count,
  prestigeThreshold,
  prestigeBoost,
}) => (
  <Flex className="relative flex-col gap-2 rounded-2xl border border-yellow-400 bg-yellow-400 p-2 transition-transform hover:scale-[1.02]">
    <Flex
      justify="center"
      align="center"
      className="relative h-full flex-row rounded-xl bg-yellow-500 px-2 py-2 font-bold text-yellow-50 shadow-inner"
    >
      <ChevronsUpIcon className="ml-[-0.70rem] mr-[-0.10rem] size-9 animate-pulse" />
      <Flex className="flex-col">
        <Text className="text-lg sm:text-xl">{prestigeBoost}%</Text>
        <Text className="mt-[-0.35rem] text-xs">Boost</Text>
      </Flex>

      <Tooltip content={`Gain a ${prestigeBoost}% multiplier on all earnings.`}>
        <InfoIcon className="absolute right-1 top-1 ml-2 size-[0.85rem] cursor-pointer text-white opacity-70 hover:opacity-100" />
      </Tooltip>
    </Flex>

    {/* Prestige Button */}
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
  prestige,
  handlePrestige,
  prestigeThreshold,
  passiveIncome,
  userClicks,
  playTime,
}: StatsBarProps) {
  const prestigeBoost = ((Math.pow(1.01, prestige) - 1) * 100).toFixed(1);

  // Format milliseconds into days, hours, minutes, and seconds
  function formatMilliseconds(milliseconds: number) {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    const timeParts = [];

    if (days > 0) {
      timeParts.push(`${days} day${days > 1 ? "s" : ""}`);
    }
    if (hours > 0) {
      timeParts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
    } else if (minutes > 0) {
      timeParts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
    } else if (seconds > 0) {
      timeParts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);
    }

    return timeParts.join(", ");
  }

  return (
    <Flex className="w-full flex-col gap-3 bg-gradient-to-tr from-blue-400 to-blue-500 p-3 shadow-lg sm:flex-row">
      <div className="grid w-full grid-cols-2 gap-2 overflow-auto rounded-2xl bg-gray-800 p-2 text-white shadow-md xl:grid-cols-3">
        <StatsItem
          label="Current Earnings"
          value={formatNumberGenerators(
            Number(totalEarnings.toString().replace(/[^0-9]/g, "")),
          )}
          tooltip="Total cookies earned for the current prestige level."
          Icon={DollarSign}
          textColor="hover:text-green-500"
          formatNumber={true}
        />
        <StatsItem
          label="Total Earnings"
          value={formatNumberGenerators(
            Number(lifeTimeEarnings.toString().replace(/[^0-9]/g, "")),
          )}
          tooltip="Total cookies earned over all prestiges."
          Icon={Star}
          textColor="hover:text-purple-400"
          formatNumber={true}
        />
        <StatsItem
          label="Passive Income"
          value={`${formatNumberGenerators(
            Number(passiveIncome.toString().replace(/[^0-9]/g, "")),
          )} / sec`}
          tooltip="Paw Points earned per second from all generators."
          Icon={Clock}
          textColor="hover:text-blue-400"
          formatNumber={false}
        />
        <StatsItem
          label="Points Per Click"
          value={`+${Math.round(clickMultiplier * Math.pow(1.01, prestige))} (Max)`}
          tooltip="Maximum Paw Points generated per click."
          Icon={MousePointer}
          textColor="hover:text-red-400"
          formatNumber={false}
        />
        <StatsItem
          label="Total Clicks"
          value={
            formatNumberGenerators(
              Number(userClicks.toString().replace(/[^0-9]/g, "")),
            ) + " clicks"
          }
          tooltip="Total times you clicked."
          Icon={TargetIcon}
          textColor="hover:text-teal-400"
          formatNumber={false}
        />
        <StatsItem
          label="Time Played"
          value={formatMilliseconds(playTime) || "0 seconds"}
          tooltip="Total time spent playing."
          Icon={HourglassIcon}
          textColor="hover:text-yellow-400"
          formatNumber={false}
        />
      </div>
      <PrestigeButton
        prestige={prestige}
        handlePrestige={handlePrestige}
        count={count}
        prestigeThreshold={prestigeThreshold}
        prestigeBoost={prestigeBoost}
      />
    </Flex>
  );
}
