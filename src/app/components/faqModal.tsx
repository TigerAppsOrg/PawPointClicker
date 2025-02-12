"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Box, Flex, Text, Separator } from "@radix-ui/themes";
import { HelpCircleIcon, XIcon } from "lucide-react";

export default function FAQModal(props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const handleClose = () => {
    props.setIsOpen(false);
  };

  return (
    <Dialog.Root open={props.isOpen} onOpenChange={props.setIsOpen}>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-orange-300 p-6 shadow-2xl">
        <Dialog.Title className="flex items-center gap-2 text-lg font-semibold text-gray-800 sm:text-2xl">
          <HelpCircleIcon className="mr-2 size-8 text-orange-700" />
          FAQ & Game Rules
        </Dialog.Title>
        <Box className="mt-2 text-yellow-900">
          <Separator orientation="horizontal" size="4" className="mb-4" />
          <Box className="rounded-xl bg-orange-200 p-4 text-base font-medium sm:text-lg">
            <Text className="font-semibold">Frequently Asked Questions</Text>
            <ul className="mt-2 list-disc pl-5 text-xs sm:text-sm">
              <li>
                <strong>Are these Paw Points real?</strong> No, these are not
                real Paw Points.
              </li>
              <li>
                <strong>How do I earn Paw Points?</strong> Click the giant prox
                to earn them!
              </li>
              <li>
                <strong>What can I do with Paw Points?</strong> Spend them on
                generators and upgrades.
              </li>
              <li>
                <strong>What does Prestige do?</strong> It resets your progress
                for a permanent bonus to paw point generation.
              </li>
              <li>
                <strong>Are there leaderboards?</strong> Not yet, but stay
                tuned!
              </li>
              <li>
                <strong>Can I play on mobile?</strong> Yes, the game works on
                mobile.
              </li>
              {/* <li>
                <strong>Will there be more updates?</strong> Absolutely! More
                features coming soon.
              </li> */}
              <li>
                <strong>Who made this game?</strong> Kevin Liu '28.
              </li>
              <li>
                <strong>Is this affiliated with Princeton?</strong> No, just for
                fun!
              </li>
              <li>
                <strong>How do I report bugs?</strong> Reach out to the
                developer!
              </li>
            </ul>
          </Box>
          <Separator
            orientation="horizontal"
            size="4"
            className="my-3 sm:my-5"
          />
          <Box className="rounded-xl bg-orange-200 p-4 text-base font-medium sm:text-lg">
            <Text className="font-semibold">Game Rules</Text>
            <ul className="mt-2 list-disc pl-5 text-xs sm:text-sm">
              <li>Click the giant prox to earn Paw Points.</li>
              <li>Buy generators to automate your earnings.</li>
              <li>Upgrade your generators for faster production.</li>
              <li>Prestige to reset and gain permanent bonuses.</li>
              <li>Have fun and climb the ranks!</li>
            </ul>
          </Box>
        </Box>
        <Flex className="mt-4 items-center sm:mt-5">
          <Dialog.Close asChild>
            <button
              onClick={handleClose}
              className="ml-auto rounded-lg border-2 border-orange-500/50 bg-orange-400 px-4 py-2 font-medium text-orange-100 transition hover:bg-orange-600"
            >
              GOT IT!
            </button>
          </Dialog.Close>
        </Flex>
        <Dialog.Close asChild>
          <XIcon className="absolute right-0 top-0 m-4 h-6 w-6 cursor-pointer sm:m-7" />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  );
}
