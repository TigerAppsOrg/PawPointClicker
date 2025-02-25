import * as Dialog from "@radix-ui/react-dialog";
import { Box, Flex, Separator, Text } from "@radix-ui/themes";
import { HelpCircleIcon, XIcon } from "lucide-react";
import { useState } from "react";

interface OneTimeBonusModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  count: number;
  setCount: (count: number) => void;
}

const OneTimeBonusModal: React.FC<OneTimeBonusModalProps> = ({
  isOpen,
  setIsOpen,
  count,
  setCount,
}) => {
  const [firstClick, setFirstClick] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const claimBonus = () => {
    if (firstClick) {
      setShowWarning(true);
      setFirstClick(false);
      return;
    }
    setShowWarning(false);
    setIsOpen(false);
    setCount(count + 10_000_000_000); // Add 10 billion Paw Points
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-orange-300 p-4 shadow-2xl sm:p-6">
        <Dialog.Title className="flex items-center gap-2 text-lg font-semibold text-gray-800 sm:text-2xl">
          <HelpCircleIcon className="mr-2 size-8 text-orange-700" />
          🎉 Welcome Bonus! 🎉
        </Dialog.Title>
        <Box className="mt-2 text-yellow-900">
          <Separator orientation="horizontal" size="4" className="mb-4" />
          <Box className="rounded-xl bg-orange-200 p-4 text-base font-medium sm:text-lg">
            <p className="text-lg text-gray-700">
              You’ve received a one-time bonus of{" "}
              <span className="font-bold text-green-600">
                10 BILLION Paw Points
              </span>
              ! Spend it wisely!
            </p>
            <button
              className="mt-4 w-full rounded-lg bg-orange-500 py-2 font-bold text-white transition-all hover:bg-orange-600"
              onClick={claimBonus}
            >
              GIVE IT TO ME
            </button>
          </Box>
        </Box>
      </Dialog.Content>
      {showWarning && (
        <Dialog.Root open={showWarning} onOpenChange={setShowWarning}>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-orange-300 p-4 shadow-xl">
            <Dialog.Title className="text-center font-semibold text-gray-800">
              You better stay in the game though...
            </Dialog.Title>
            <button
              className="mt-4 w-full rounded-md bg-orange-600 py-2 font-semibold text-white transition-all hover:bg-orange-700"
              onClick={claimBonus}
            >
              I’LL STAY!
            </button>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </Dialog.Root>
  );
};

export default OneTimeBonusModal;
