import React from "react";
import { Flex, Text } from "@radix-ui/themes";
import ProxButton from "./proxButton";

export default function ProxMenu(props: {
  count: number;
  setCount: (count: number) => void;
  clickMultiplier: number;
  setClickMultiplier: (clickMultiplier: number) => void;
}) {
  return (
    <Flex
      align="center"
      justify="center"
      className="h-full w-full overflow-hidden bg-red-200 p-4"
    >
      <ProxButton
        count={props.count}
        setCount={props.setCount}
        clickMultiplier={props.clickMultiplier}
        setClickMultiplier={props.setClickMultiplier}
      />
    </Flex>
  );
}
