"use client";
import React, { useEffect } from "react";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Dialog from "@radix-ui/react-dialog";
import { Box, Flex, Separator, Text, Tooltip } from "@radix-ui/themes";

import useLocalStorage from "../utilities/useLocalStorage";
import { achievementsData, categoryColors } from "../utilities/achievements";
import {
  CheckCircle2Icon,
  AwardIcon,
  XIcon,
  DollarSignIcon,
  StarIcon,
  PackageIcon,
  ZapIcon,
  EyeOffIcon,
  HelpCircleIcon,
  LockKeyholeIcon,
  TrophyIcon,
} from "lucide-react";

type Stats = {
  [key: string]: number; // Adjust based on actual structure
};

const categoryIcons = {
  Wealth: <DollarSignIcon className="size-5 text-green-500" />,
  Prestige: <StarIcon className="size-5 text-purple-500" />,
  Collector: <PackageIcon className="size-5 text-blue-500" />,
  Efficiency: <ZapIcon className="size-5 text-yellow-500" />,
  Hidden: <EyeOffIcon className="size-5 text-gray-500" />,
  Default: <HelpCircleIcon className="size-5 text-gray-400" />,
};

export default function Achievements({
  stats,
  achievements,
  setAchievements,
}: {
  stats: Stats;
  achievements: boolean;
  setAchievements: (achievements: boolean) => void;
}) {
  const [unlockedAchievements, setUnlockedAchievements] = useLocalStorage(
    "unlockedAchievements",
    [],
  );

  useEffect(() => {
    achievementsData.forEach((achievement) => {
      if (
        achievement.condition(stats) &&
        !unlockedAchievements.includes(achievement.id)
      ) {
        const newAchievements = [...unlockedAchievements, achievement.id];
        setUnlockedAchievements(newAchievements);
        toast.success(
          <Flex
            onClick={() => setAchievements(true)}
            className="flex items-center gap-3 font-sans"
          >
            <TrophyIcon className="size-8 text-yellow-400" />
            <span className="font-semibold text-orange-400">
              Achievement Unlocked: {achievement.name} 🎉
            </span>
          </Flex>,
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Slide,
            className:
              "bg-gray-900 text-white shadow-lg shadow-orange-500/30 rounded-xl p-4",
          },
        );
      }
    });
  }, [stats, unlockedAchievements, setUnlockedAchievements]);

  return (
    <div className="absolute z-50">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnHover
      />
      <Dialog.Root open={achievements} onOpenChange={setAchievements}>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-orange-300 p-4 shadow-lg sm:p-6">
          <Dialog.Title className="flex items-center gap-2 text-lg font-semibold text-gray-800 sm:text-2xl">
            <AwardIcon className="mr-2 size-8 text-orange-700" />
            Hall of Achievements
          </Dialog.Title>
          <Box className="mt-2">
            <Separator orientation="horizontal" size="4" className="mb-4" />

            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 md:gap-3">
              {achievementsData.map((achievement) => {
                const { bg, border, text } =
                  categoryColors[achievement.category] ||
                  categoryColors["Default"];
                const isUnlocked = unlockedAchievements.includes(
                  achievement.id,
                );

                return (
                  <Tooltip
                    key={achievement.id}
                    content={achievement.description}
                  >
                    <Flex
                      align="center"
                      justify="center"
                      className={`relative flex-col rounded-xl border p-3 text-center text-sm font-medium hover:scale-105 sm:text-base ${isUnlocked ? `${border} ${bg} ${text}` : "border-gray-400 bg-gray-200 text-gray-600 opacity-50"}`}
                    >
                      {/* Category Icon in Top Left */}
                      <div
                        className={`absolute border-l border-t p-0.5 ${bg} ${border} left-[-0.25rem] top-[-0.25rem] rounded-full`}
                      >
                        {categoryIcons[achievement.category] ||
                          categoryIcons.Default}
                      </div>

                      {isUnlocked ? (
                        <CheckCircle2Icon className="absolute right-1 top-1 size-4 rotate-6 text-2xl text-green-500 sm:size-6" />
                      ) : (
                        <LockKeyholeIcon className="absolute right-1 top-1 size-4 rotate-6 text-2xl text-red-700 sm:size-6" />
                      )}
                      {achievement.name}

                      <Text className="mt-1 text-[0.5rem]">
                        {achievement.description}
                      </Text>
                    </Flex>
                  </Tooltip>
                );
              })}
            </div>
          </Box>
          <Dialog.Close asChild>
            <XIcon className="absolute right-0 top-0 m-4 h-6 w-6 cursor-pointer sm:m-7" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
