"use client";
import React, { useState, useEffect, useRef } from "react";
import ProxMenu from "./prox/proxMenu";
import PowerUpMenu from "./menu/powerUpMenu";
import { Flex } from "@radix-ui/themes";

export default function HomePage() {
  const [count, setCount] = useState(0);
  const [lifeTimeEarnings, setLifetimeEarnings] = useState(0);
  const [clickMultiplier, setClickMultiplier] = useState(1);
  const [scanner, setScanner] = useState(0);
  const [farms, setFarms] = useState(0); // Number of farms
  const [mine, setMine] = useState(0);
  const [factories, setFactories] = useState(0); // Number of factories
  const [bank, setBank] = useState(0);
  const [lab, setLab] = useState(0);
  const [temple, setTemple] = useState(0);
  const [spaceStation, setSpaceStation] = useState(0);

  // Ref to track previous count
  const oldCountRef = useRef(count);

  // Passive income logic
  useEffect(() => {
    const interval = setInterval(() => {
      const passiveIncome =
        clickMultiplier +
        scanner * 5 +
        farms * 100 +
        mine * 200 +
        factories * 500 +
        bank * 1000 +
        lab * 20000 +
        temple * 500000 +
        spaceStation * 1000000;

      // Update count and lifetime earnings with the calculated passive income
      setCount((prevCount) => prevCount + passiveIncome);
      setLifetimeEarnings(
        (prevLifetimeEarnings) => prevLifetimeEarnings + passiveIncome,
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [
    clickMultiplier,
    farms,
    factories,
    scanner,
    mine,
    bank,
    lab,
    temple,
    spaceStation,
    setCount,
    setLifetimeEarnings,
  ]);

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
        scanner={scanner}
        setScanner={setScanner}
        farms={farms}
        setFarms={setFarms}
        mine={mine}
        setMine={setMine}
        factories={factories}
        setFactories={setFactories}
        bank={bank}
        setBank={setBank}
        lab={lab}
        setLab={setLab}
        temple={temple}
        setTemple={setTemple}
        spaceStation={spaceStation}
        setSpaceStation={setSpaceStation}
      />
    </Flex>
  );
}
