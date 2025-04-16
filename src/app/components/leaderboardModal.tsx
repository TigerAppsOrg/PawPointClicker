"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon, TrophyIcon, Loader2Icon } from "lucide-react";
import { Box, Flex, Separator, Text } from "@radix-ui/themes";
import formatNumberExtended from "../utilities/formatNumberExtended";
const { arabToRoman } = require("roman-numbers");
import { profanity } from "@2toad/profanity";

// LeaderboardModal component.
// open: controls modal visibility, setOpen: toggles modal visibility.
export default function LeaderboardModal({
  players,
  isOpen,
  setIsOpen,
}: {
  players: any[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  //DEPRECATED: now imported from toolbar
  // Fetch leaderboard data from API when modal is opened
  // useEffect(() => {
  //   async function fetchLeaderboard() {
  //     try {
  //       const res = await fetch("/api/getAllUserData");
  //       const { data, error } = await res.json();
  //       if (error) {
  //         console.error("Error fetching leaderboard data:", error);
  //         return;
  //       }
  //       // Sort players by total earnings (descending) -- adjust as needed.
  //       const sortedPlayers = data.sort(
  //         (a: any, b: any) => b.lifeTimeEarnings - a.lifeTimeEarnings,
  //       );
  //       setPlayers(sortedPlayers);
  //     } catch (err) {
  //       console.error("Error fetching leaderboard data:", err);
  //     }
  //   }
  //   if (isOpen) {
  //     fetchLeaderboard();
  //   }
  // }, [isOpen]);

  // Determine border image for each rank.
  function getBorderImage(rank: number) {
    switch (rank) {
      case 1:
        return "/images/avatarborders/scales.webp";
      case 2:
        return "/images/avatarborders/fire.webp";
      case 3:
        return "/images/avatarborders/regal.webp";
      case 4:
        return "/images/avatarborders/galaxy.webp";
      case 5:
        return "/images/avatarborders/bluegem.webp";
      case 6:
        return "/images/avatarborders/redgem.webp";
      case 7:
        return "/images/avatarborders/crown.webp";
      case 8:
        return "/images/avatarborders/royal.webp";
      case 9:
        return "/images/avatarborders/diamond.webp";
      case 10:
        return "/images/avatarborders/gemstone.webp";
      default:
        return "/images/avatarborders/circle.webp";
    }
  }

  // Helper: sum collectors. Adjust the keys if necessary.
  function sumCollectors(player: any) {
    return (
      (player.clickMultiplier || 0) +
      (player.latemeal || 0) +
      (player.scanner || 0) +
      (player.deliveries || 0) +
      (player.resco || 0) +
      (player.farms || 0) +
      (player.mine || 0) +
      (player.factories || 0) +
      (player.bank || 0) +
      (player.lab || 0) +
      (player.temple || 0) +
      (player.spaceStation || 0)
    );
  }

  // Calculate total pawpoints collected from all players.
  const totalPawPoints =
    players?.reduce((acc, player) => acc + (player.lifeTimeEarnings || 0), 0) ||
    0;

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-orange-300 p-4 shadow-2xl sm:p-5">
        <Dialog.Title className="flex items-center gap-2 text-lg font-semibold text-gray-800 sm:text-2xl">
          <TrophyIcon className="mr-2 size-8 text-orange-700" />
          Leaderboard
        </Dialog.Title>
        <Box className="mt-4">
          <Separator
            orientation="horizontal"
            size="4"
            className="mb-4 border-gray-700"
          />
          {/* Statbar dashboard replacing "Top Players" */}
          <Flex className="mb-4 flex-col gap-2 text-xs sm:flex-row sm:gap-4 sm:text-sm">
            <Flex
              align="center"
              justify="center"
              className="w-full rounded-xl bg-orange-100 p-1 text-center sm:p-2"
            >
              {players?.length !== 0 ? (
                <>
                  <div className="mr-2 h-3 w-3 animate-pulse rounded-full bg-green-500" />
                  <Text className="font-semibold text-gray-800">
                    Updating LIVE
                  </Text>
                </>
              ) : (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin text-orange-500" />

                  <Text className="font-semibold text-gray-800">
                    Connecting...
                  </Text>
                </>
              )}
            </Flex>
            <Flex
              align="center"
              justify="center"
              className="w-full rounded-xl bg-orange-100 p-1 text-center sm:p-2"
            >
              <Text className="font-semibold text-gray-800">
                Total Players: {players?.length || 0}
              </Text>
            </Flex>
            <Flex
              align="center"
              justify="center"
              className="w-full rounded-xl bg-orange-100 p-1 text-center sm:p-2"
            >
              <Text className="font-semibold text-gray-800">
                Total Paw Points: {formatNumberExtended(totalPawPoints, 0)}
              </Text>
            </Flex>
          </Flex>

          {/* Leaderboard Players List */}
          <div className="space-y-2 sm:space-y-3">
            {players?.length != 0 ? (
              players?.map((player, index) => (
                <Flex
                  align="center"
                  key={player.id}
                  className="relative rounded-xl bg-gradient-to-l from-orange-400 to-orange-500 p-2 shadow-sm transition-all duration-150 hover:scale-[1.01] hover:to-orange-400"
                >
                  <div className="relative flex-shrink-0">
                    <Flex
                      justify="center"
                      align="center"
                      className="z-10 size-16 text-center sm:size-32"
                    >
                      <img
                        src={getBorderImage(index + 1)}
                        alt={player.session?.user?.name || "Anonymous"}
                        className="absolute h-full w-full"
                      />
                      <img
                        src={player.session?.user?.image || "/images/guest.png"}
                        alt={player.session?.user?.name || "Anonymous"}
                        className="h-[80%] w-[80%] bg-orange-700"
                      />

                      <Text className="absolute bottom-0 z-20 truncate rounded-md border border-orange-200 bg-orange-500 px-2 text-center text-[0.5rem] font-semibold text-orange-50 sm:text-xs">
                        {profanity.censor(player.session?.user?.name) ||
                          "Anonymous"}{" "}
                      </Text>
                    </Flex>
                    {index < 5 && (
                      <div className="absolute right-[-0.5rem] top-[0.25rem]">
                        <img
                          src={"/images/fire.gif"}
                          alt="fire"
                          className="z-5 absolute left-[0.25rem] top-[-1.5rem] z-10 h-[2rem] w-auto rotate-6 opacity-80 sm:left-[0.5rem] sm:top-[-2rem]"
                        />
                        <Text className="relative z-10 rounded-full border-2 border-orange-600 bg-orange-500 p-1 text-xs font-bold text-yellow-100 sm:p-2 sm:text-xl">
                          #{index + 1}
                        </Text>
                      </div>
                    )}
                  </div>
                  <Flex className="ml-5 flex-col sm:ml-6">
                    <Text>
                      <Text className="text-xs font-extrabold sm:text-xl">
                        {profanity.censor(player.proxName || "Random Prox")}
                      </Text>
                    </Text>
                    <Flex className="text-sm font-extrabold text-white sm:text-3xl">
                      <Text className="max-w-full animate-pulse truncate">
                        {formatNumberExtended(player.lifeTimeEarnings, 0)}
                      </Text>
                      <img
                        src="/images/prox.svg"
                        alt="Prox"
                        className="ml-2 size-5 rounded-full sm:size-10"
                      />
                    </Flex>

                    {/* <span className="text-lg font-semibold">
                      Prestige: {player.prestige || 0}
                    </span>
                    <span className="text-lg font-semibold">
                      Collectors: {sumCollectors(player)}
                    </span> */}
                    <Flex align="center" className="mt-1 gap-2 sm:gap-4">
                      <Flex className="z-20 w-min truncate rounded-md border-2 border-yellow-400 bg-red-600 px-2 text-center text-xs font-semibold text-yellow-300 sm:text-lg">
                        {"PRESTIGE " + (arabToRoman(player.prestige) || 0)}
                      </Flex>
                      <Text className="text-xs font-semibold sm:text-lg">
                        Collectors:{" "}
                        {formatNumberExtended(sumCollectors(player), 0)}
                      </Text>
                    </Flex>
                    <Text
                      className={`absolute right-4 top-[0rem] animate-pulse text-[4rem] font-extrabold sm:top-[-1.4rem] sm:text-[8rem] ${index >= 5 ? "text-orange-800/20 sm:text-orange-800/30" : "text-white/30"}`}
                    >
                      #{index + 1}
                    </Text>
                  </Flex>
                </Flex>
              ))
            ) : (
              <Flex justify="center" align="center" className="flex-row">
                <Loader2Icon className="h-8 w-8 animate-spin text-orange-500" />
                <Text className="ml-2 animate-pulse text-sm font-semibold text-gray-800 sm:text-xl">
                  Loading...
                </Text>
              </Flex>
            )}
          </div>
        </Box>
        <Dialog.Close asChild>
          <XIcon className="absolute right-0 top-0 m-4 h-6 w-6 cursor-pointer sm:m-7" />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
