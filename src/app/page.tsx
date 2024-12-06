"use client";
import React, { useState, useEffect, useRef } from "react";
import ProxMenu from "./prox/proxMenu";
import PowerUpMenu from "./menu/powerUpMenu";
import { Flex } from "@radix-ui/themes";

export default function HomePage() {
  const [count, setCount] = useState(0);
  const [lifeTimeEarnings, setLifetimeEarnings] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [farms, setFarms] = useState(0); // Number of farms
  const [factories, setFactories] = useState(0); // Number of factories

  // Ref to track previous count
  const oldCountRef = useRef(count);

  // Passive income logic
  useEffect(() => {
    const interval = setInterval(() => {
      // Update count with passive income logic
      setCount(
        (prevCount) => prevCount + clickMultiplier + farms * 5 + factories * 10,
      );
      setLifetimeEarnings(
        (prevLifetimeEarnings) =>
          prevLifetimeEarnings + clickMultiplier + farms * 5 + factories * 10,
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [clickMultiplier, farms, factories]);

  // Track previous count
  useEffect(() => {
    // Store the previous count before updating it
    oldCountRef.current = count;
  }, [count]); // Only update when `count` changes

  return (
    <Flex className="grid h-screen w-full grid-cols-2">
      <ProxMenu
        count={count}
        setCount={setCount}
        oldCount={oldCountRef.current} // Pass previous count from ref
        clickMultiplier={clickMultiplier}
        setClickMultiplier={setClickMultiplier}
        lifeTimeEarnings={lifeTimeEarnings}
        setLifetimeEarnings={setLifetimeEarnings}
      />
      <PowerUpMenu
        count={count}
        setCount={setCount}
        lifeTimeEarnings={lifeTimeEarnings}
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
