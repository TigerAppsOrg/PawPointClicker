"use client";
import React, { useState, useEffect, useRef } from "react";
import ProxMenu from "./prox/proxMenu";
import PowerUpMenu from "./menu/powerUpMenu";

export default function HomePage() {
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
  const [prestige, setPrestige] = useLocalStorage("prestige", 1); // New: Prestige points
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
      setPrestige((prev: number) => prev + 1); // Increment Prestige points
      setPrestigeThreshold(Math.round(Math.pow(prestigeThreshold, 1.5))); // Double the Prestige threshold
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
    prestige; // Prestige multiplier

  // Passive income logic (includes Prestige multiplier)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount: number) => prevCount + passiveIncome);
      setLifetimeEarnings(
        (prevLifetimeEarnings: number) => prevLifetimeEarnings + passiveIncome,
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

const useLocalStorage = (key: string, defaultValue: string | number) => {
  const [value, setValue] = useState(() => {
    let currentValue;

    try {
      currentValue = JSON.parse(
        localStorage.getItem(key) || String(defaultValue),
      );
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};
