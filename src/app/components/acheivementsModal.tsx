import React, { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Dialog from "@radix-ui/react-dialog";
import { Box, Flex, Separator, Tooltip } from "@radix-ui/themes";

import useLocalStorage from "../utilities/useLocalStorage";
import { achievementsData, categoryColors } from "../utilities/achievements";
import { CheckCircle2Icon, TrophyIcon, XIcon } from "lucide-react";

type StatsType = {
  totalEfficiencyBoost: number;
  upgradesUnlocked: number; //number of upgrades for all collectors
  count: number;
  prestigeLevel: number;
  lifeTimeEarnings: number;
  clickMultiplier: number;
  latemeal: number;
  farms: number;
  deliveries: number;
  resco: number;
  factories: number;
  scanner: number;
  mine: number;
  bank: number;
  lab: number;
  temple: number;
  spaceStation: number;
  totalEarnings: number;
  passiveIncome: number;
  collectors: number; //number of unique collectors
  playTime: number;

  // Not yet implemented
  hiddenFeaturesUnlocked: number;
};

export default function Achievements({
  stats,
  achievements,
  setAchievements,
}: {
  stats: StatsType;
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
        toast.success(`Achievement Unlocked: ${achievement.name}! 🏆`);
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
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[90vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-scroll rounded-2xl bg-orange-300 p-6 shadow-lg">
          <Dialog.Title className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
            <TrophyIcon className="mr-2 size-8 text-orange-700" />
            Hall of Achievements
          </Dialog.Title>
          <Box className="mt-2">
            <Separator orientation="horizontal" size="4" className="mb-4" />

            <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
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
                      className={`relative rounded-xl border p-3 text-center font-medium ${isUnlocked ? `${border} ${bg} ${text}` : "border-gray-400 bg-gray-200 text-gray-600 opacity-50"}`}
                    >
                      {isUnlocked && (
                        <CheckCircle2Icon className="absolute right-1 top-1 rotate-6 text-2xl text-green-500" />
                      )}
                      {achievement.name}
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
