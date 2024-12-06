"use client";
import React, { useState, useEffect } from "react";
import ProxMenu from "./prox/proxMenu";
import PowerUpMenu from "./menu/powerUpMenu";
import { Flex } from "@radix-ui/themes";

export default function HomePage() {
  const [count, setCount] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [farms, setFarms] = useState(0); // Number of farms
  const [factories, setFactories] = useState(0); // Number of factories

  // Passive income logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + farms * 2 + factories * 10);
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [farms, factories]);

  return (
    <Flex className="grid h-screen w-full grid-cols-2">
      <ProxMenu
        count={count}
        setCount={setCount}
        clickMultiplier={clickMultiplier}
        setClickMultiplier={setClickMultiplier}
      />
      <PowerUpMenu
        count={count}
        setCount={setCount}
        clickMultiplier={clickMultiplier}
        setClickMultiplier={setClickMultiplier}
        farms={farms}
        setFarms={setFarms}
        factories={factories}
        setFactories={setFactories}
      />
    </Flex>
  );
}
