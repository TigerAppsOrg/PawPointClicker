import React from "react";
import { Flex, Text } from "@radix-ui/themes";

interface StatsBarProps {
  count: number; // Current cookie count
  lifeTimeEarnings: number; // Total cookies earned over time
  clickMultiplier: number; // Current click multiplier
  farms: number; // Number of farms owned
  factories: number; // Number of factories owned
}

export default function StatsBar({
  count,
  lifeTimeEarnings,
  clickMultiplier,
  farms,
  factories,
}: StatsBarProps) {
  // Calculations:
  const passiveIncome = clickMultiplier + farms * 5 + factories * 10; // Passive cookies per second
  const totalMultiplier = clickMultiplier; // Total multiplier applied to clicks

  return (
    <Flex
      direction="row"
      justify="between"
      align="center"
      className="w-full rounded-xl bg-gray-800 p-4 text-white shadow-md"
    >
      {/* Current Paw Points */}
      <Flex direction="column" align="center">
        <Text weight="bold" className="text-base">
          Paw Points
        </Text>
        <Text className="text-xl">{count}</Text>
      </Flex>

      {/* Lifetime Earnings */}
      <Flex direction="column" align="center">
        <Text weight="bold" className="text-base">
          Lifetime Earnings
        </Text>
        <Text className="text-xl">{lifeTimeEarnings}</Text>
      </Flex>

      {/* Passive Income */}
      <Flex direction="column" align="center">
        <Text weight="bold" className="text-base">
          Passive Income
        </Text>
        <Text className="text-xl">{passiveIncome} / sec</Text>
      </Flex>

      {/* Click Multiplier */}
      <Flex direction="column" align="center">
        <Text weight="bold" className="text-base">
          Click Multiplier
        </Text>
        <Text className="text-xl">x{totalMultiplier}</Text>
      </Flex>

      {/* Owned Power-Ups */}
      <Flex direction="column" align="center">
        <Text weight="bold" className="text-base">
          Power-Ups
        </Text>
        <Text className="text-xl">{clickMultiplier + farms + factories}</Text>
      </Flex>
    </Flex>
  );
}
