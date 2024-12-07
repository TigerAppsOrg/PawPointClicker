import React from "react";
import { Flex } from "@radix-ui/themes";
import ProxButton from "./proxButton";

export default function ProxMenu(props: {
  proxName: string;
  setProxName: (proxName: string) => void;
  count: number;
  oldCount: number;
  setCount: (count: number) => void;
  clickMultiplier: number;
  setClickMultiplier: (clickMultiplier: number) => void;
  lifeTimeEarnings: number;
  setLifetimeEarnings: (lifetimeEarnings: number) => void;
  passiveIncome: number;
}) {
  return (
    <Flex
      align="center"
      direction="column"
      className="relative z-20 h-screen w-full overflow-hidden bg-red-200"
    >
      <ProxButton
        proxName={props.proxName}
        setProxName={props.setProxName}
        count={props.count}
        oldCount={props.oldCount}
        setCount={props.setCount}
        clickMultiplier={props.clickMultiplier}
        setClickMultiplier={props.setClickMultiplier}
        lifeTimeEarnings={props.lifeTimeEarnings}
        setLifetimeEarnings={props.setLifetimeEarnings}
        passiveIncome={props.passiveIncome}
      />
      {/* <img
        src="/images/tiger_jacket.gif"
        alt="Prox"
        className="absolute z-10 h-1/2 w-1/2 opacity-5"
      /> */}
      <img
        src="/images/concretebackground.jpg"
        alt="Prox"
        className="absolute z-10 h-full object-cover object-center opacity-20"
      />
    </Flex>
  );
}
