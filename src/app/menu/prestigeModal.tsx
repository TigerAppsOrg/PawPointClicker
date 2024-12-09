import React from "react";
import { Box, Flex, Text, Separator } from "@radix-ui/themes";
import {
  GemIcon,
  MoveRightIcon,
  XIcon,
  OctagonAlertIcon,
  CheckIcon,
} from "lucide-react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import formatNumberGenerators from "../utilities/formatNumberGenerators";

const { arabToRoman } = require("roman-numbers");

export default function PrestigeModal({
  prestige,
  handlePrestige,
  count,
  prestigeThreshold,
}: {
  prestige: number;
  handlePrestige: () => void;
  count: number;
  prestigeThreshold: number;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="text-nowrap rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-600">
          PRESTIGE {arabToRoman(prestige)}
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50" />
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50" />
          <AlertDialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-orange-300 p-4 shadow-2xl focus:outline-none sm:p-6">
            <AlertDialog.Title className="text-2xl font-semibold text-gray-800">
              Prestige System
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-2 text-orange-900">
              <Box>
                <Separator orientation="horizontal" size="4" className="mb-4" />
                <Box className="rounded-lg bg-orange-200 p-4 text-lg font-medium">
                  Current Prestige Level:{" "}
                  <span className="text-red-600">
                    {arabToRoman(prestige)}{" "}
                    <Text className="text-sm">({prestige})</Text>
                  </span>
                  <Flex align="center" className="mt-2 text-sm text-orange-700">
                    <GemIcon className="mr-2 inline-block h-5 w-5" />
                    Bonus: {((Math.pow(1.01, prestige) - 1) * 100).toFixed(2)}%
                    Increase to Paw Point Generators
                  </Flex>
                </Box>
                <Box className="mt-3 text-sm sm:mt-4">
                  Each prestige increases overall point generation by{" "}
                  <span className="font-semibold text-blue-600">
                    1% per level.
                  </span>
                </Box>
              </Box>
              <Box className="mt-3 rounded-lg bg-orange-200 p-4 font-medium sm:mt-4">
                <Box className="text-lg">
                  Next Prestige Level:{" "}
                  <span className="text-green-600">
                    {arabToRoman(prestige + 1)}{" "}
                    <Text className="text-sm">({prestige + 1})</Text>
                  </span>
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
                <Flex align="center" className="mt-2 text-sm text-orange-700">
                  Progression: Current %{" "}
                  <MoveRightIcon className="mx-1 size-4" />
                  Next %
                </Flex>
              </Box>
              <Box className="mt-3 rounded-lg bg-orange-400 p-4 sm:mt-4">
                <Box className="text-lg font-medium">
                  Your Paw Point Balance:{" "}
                  <span className="text-orange-800">
                    {" "}
                    {formatNumberGenerators(count)}
                  </span>
                </Box>
                <Box className="mt-2 text-sm font-medium">
                  Required to prestige:{" "}
                  <span className="font-semibold text-blue-600">
                    {formatNumberGenerators(prestigeThreshold)}
                  </span>
                </Box>
                {count >= prestigeThreshold ? (
                  <Flex className="mt-3 rounded-lg border-2 border-green-500/50 bg-green-300/70 p-4 font-semibold text-green-800 sm:mt-4">
                    <CheckIcon className="my-auto mr-4 size-8 text-green-800 sm:size-6" />
                    <Box className="my-auto">You can prestige now!</Box>
                  </Flex>
                ) : (
                  <Flex className="mt-3 rounded-lg border-2 border-red-500/20 bg-red-400 p-4 text-sm font-semibold text-red-800 sm:mt-4">
                    <OctagonAlertIcon className="my-auto mr-4 size-8 text-red-800 sm:size-6" />
                    <Box className="my-auto">
                      You need{" "}
                      <span className="font-bold">
                        {formatNumberGenerators(prestigeThreshold - count)}
                      </span>{" "}
                      more Paw Points to prestige.
                    </Box>
                  </Flex>
                )}
              </Box>
            </AlertDialog.Description>
            <Separator orientation="horizontal" size="4" className="my-5" />
            <div className="flex justify-end gap-2">
              <AlertDialog.Cancel asChild>
                <Flex
                  align="center"
                  justify="center"
                  className="cursor-pointer rounded-lg border-red-500/50 bg-red-400 px-4 py-2 font-medium text-red-800 duration-150 hover:bg-red-300 focus:ring-2 focus:ring-red-300"
                >
                  CANCEL
                </Flex>
              </AlertDialog.Cancel>

              <AlertDialog.Cancel asChild>
                <XIcon className="absolute right-0 top-0 m-4 h-6 w-6 cursor-pointer sm:m-7" />
              </AlertDialog.Cancel>

              <AlertDialog.Action asChild>
                <button
                  onClick={() => handlePrestige()}
                  disabled={count < prestigeThreshold}
                  className={`rounded-lg px-4 py-2 font-medium ${
                    count >= prestigeThreshold
                      ? "cursor-pointer border-2 border-orange-500/20 bg-orange-400 text-orange-100 duration-150 hover:bg-orange-600 hover:text-orange-200 focus:ring-2 focus:ring-orange-400"
                      : "cursor-not-allowed border-2 border-gray-400/50 bg-gray-300 text-gray-500"
                  }`}
                >
                  PRESTIGE {arabToRoman(prestige + 1)}
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
