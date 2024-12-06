import React from "react";
import { Flex } from "@radix-ui/themes";
import ProxButton from "./proxButton";

export default function ProxMenu(props: {
  count: number;
  oldCount: number;
  setCount: (count: number) => void;
  clickMultiplier: number;
  setClickMultiplier: (clickMultiplier: number) => void;
  lifeTimeEarnings: number;
  setLifetimeEarnings: (lifetimeEarnings: number) => void;
}) {
  return (
    <Flex align="center" className="h-full w-full overflow-hidden bg-red-200">
      <ProxButton
        count={props.count}
        oldCount={props.oldCount}
        setCount={props.setCount}
        clickMultiplier={props.clickMultiplier}
        setClickMultiplier={props.setClickMultiplier}
        lifeTimeEarnings={props.lifeTimeEarnings}
        setLifetimeEarnings={props.setLifetimeEarnings}
      />
      {/* <img
        src="/images/tiger_jacket.gif"
        alt="Prox"
        className="absolute z-10 h-1/2 w-1/2 opacity-5"
      /> */}
    </Flex>
  );
}
