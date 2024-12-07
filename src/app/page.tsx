"use client";
import React, { useState, useEffect, useRef } from "react";
import ProxMenu from "./prox/proxMenu";
import PowerUpMenu from "./menu/powerUpMenu";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useIsClient } from "@uidotdev/usehooks";

export default function HomePage() {
  const isClient = useIsClient();

  if (isClient) {
    return <div>Loading...</div>;
  } else {
    const [proxName, setProxName] = useLocalStorage("proxName", "Random Prox");
    const [count, setCount] = useLocalStorage("count", 0);
    const [lifeTimeEarnings, setLifetimeEarnings] = useLocalStorage(
      "lifeTimeEarnings",
      0,
    );
    const [clickMultiplier, setClickMultiplier] = useLocalStorage(
      "clickMultiplier",
      1,
    );
    const [prestige, setPrestige] = useLocalStorage("prestige", 0); // New: Prestige points
    const [prestigeThreshold, setPrestigeThreshold] = useState(1000000); // Set a Prestige threshold (e.g., 1,000,000 lifetime earnings)

    const [scanner, setScanner] = useLocalStorage("scanner", 0);
    const [farms, setFarms] = useLocalStorage("farms", 0);
    const [mine, setMine] = useLocalStorage("mine", 0);
    const [factories, setFactories] = useLocalStorage("factories", 0);
    const [bank, setBank] = useLocalStorage("bank", 0);
    const [lab, setLab] = useLocalStorage("lab", 0);
    const [temple, setTemple] = useLocalStorage("temple", 0);
    const [spaceStation, setSpaceStation] = useLocalStorage("spaceStation", 0);

    // Prestige function: Resets progress and increments prestige points
    const handlePrestige = () => {
      if (lifeTimeEarnings >= prestigeThreshold) {
        setPrestige((prev) => prev + 1); // Increment Prestige points
        setPrestigeThreshold((prev) => prev ^ 1.5); // Double the Prestige threshold
        setCount(0);
        setLifetimeEarnings(0);
        setClickMultiplier(1);
        setScanner(0);
        setFarms(0);
        setMine(0);
        setFactories(0);
        setBank(0);
        setLab(0);
        setTemple(0);
        setSpaceStation(0);
      } else {
        alert(
          `You need ${prestigeThreshold - lifeTimeEarnings} more Paw Points to Prestige!`,
        );
      }
    };

    // Passive income logic (includes Prestige multiplier)
    useEffect(() => {
      const interval = setInterval(() => {
        const passiveIncome =
          (clickMultiplier +
            scanner * 5 +
            farms * 100 +
            mine * 200 +
            factories * 500 +
            bank * 1000 +
            lab * 20000 +
            temple * 500000 +
            spaceStation * 1000000) *
          (1 + prestige); // Prestige multiplier

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
      prestige, // Recalculate on Prestige point changes
      setCount,
      setLifetimeEarnings,
    ]);

    // Ref to track previous count
    const oldCountRef = useRef(count);
    // Track previous count
    useEffect(() => {
      oldCountRef.current = count; // Store the previous count
    }, [count]);

    // Calculations:
    const passiveIncome =
      (clickMultiplier +
        scanner * 5 +
        farms * 100 +
        mine * 200 +
        factories * 500 +
        bank * 1000 +
        lab * 20000 +
        temple * 500000 +
        spaceStation * 1000000) *
      (1 + prestige); // Prestige multiplier

    return (
      <div className="relative grid w-full grid-cols-1 sm:h-screen sm:grid-cols-2 sm:overflow-hidden">
        <ProxMenu
          proxName={proxName}
          setProxName={setProxName}
          count={count}
          setCount={setCount}
          oldCount={oldCountRef.current}
          clickMultiplier={clickMultiplier}
          setClickMultiplier={setClickMultiplier}
          lifeTimeEarnings={lifeTimeEarnings}
          setLifetimeEarnings={setLifetimeEarnings}
          passiveIncome={passiveIncome}
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
          prestige={prestige} // Pass Prestige Points
          handlePrestige={handlePrestige} // Pass Prestige
          passiveIncome={passiveIncome}
        />
      </div>
    );
  }
}
