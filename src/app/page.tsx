"use client";
import React, { useState, useEffect, useRef } from "react";
import ProxMenu from "./prox/proxMenu";
import PowerUpMenu from "./menu/powerUpMenu";

import useLocalStorage from "./utilities/useLocalStorage";

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
  const [totalEarnings, setTotalEarnings] = useLocalStorage("totalEarnings", 0);
  const [prestige, setPrestige] = useLocalStorage("prestige", 0); // New: Prestige points
  const [prestigeThreshold, setPrestigeThreshold] = useLocalStorage(
    "prestigeThreshold",
    1000000,
  ); // Set a Prestige threshold (e.g., 1,000,000 lifetime earnings)

  const [latemeal, setLatemeal] = useLocalStorage("latemeal", 0);
  const [scanner, setScanner] = useLocalStorage("scanner", 0);
  const [deliveries, setDeliveries] = useLocalStorage("frist", 0);
  const [resco, setResco] = useLocalStorage("resco", 0);
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
      setPrestigeThreshold(Math.round(Math.pow(prestigeThreshold, 1.15))); // Increase the Prestige threshold by 15%
      setCount(0);
      setTotalEarnings(0);
      setClickMultiplier(1);
      setLatemeal(0);
      setScanner(0);
      setDeliveries(0);
      setResco(0);
      setFarms(0);
      setMine(0);
      setFactories(0);
      setBank(0);
      setLab(0);
      setTemple(0);
      setSpaceStation(0);
    } else {
      alert(
        `You need ${(prestigeThreshold - count).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} more Paw Points to Prestige!`,
      );
    }
  };

  // Calculations:
  // Helper function to calculate individual income
  const calculateIncome = (amount: number, rate: number, prestige: number) =>
    Math.round(amount * rate * Math.pow(1.01, prestige));

  // Modularized calculation
  const components = [
    { amount: clickMultiplier, rate: 1 },
    { amount: latemeal, rate: 2 },
    { amount: scanner, rate: 8 },
    { amount: deliveries, rate: 47 },
    { amount: resco, rate: 260 },
    { amount: farms, rate: 1400 },
    { amount: mine, rate: 7800 },
    { amount: factories, rate: 44000 },
    { amount: bank, rate: 260000 },
    { amount: lab, rate: 1600000 },
    { amount: temple, rate: 10000000 },
    { amount: spaceStation, rate: 65000000 },
  ];

  const passiveIncome = components.reduce(
    (total, { amount, rate }) =>
      total + calculateIncome(amount, rate, prestige),
    0,
  );

  // Passive income logic (includes Prestige multiplier)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount: number) => prevCount + passiveIncome);
      setLifetimeEarnings(
        (prevLifetimeEarnings: number) => prevLifetimeEarnings + passiveIncome,
      );
      setTotalEarnings(
        (prevTotalEarnings: number) => prevTotalEarnings + passiveIncome,
      );
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [
    clickMultiplier,
    latemeal,
    farms,
    deliveries,
    resco,
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
    <div className="relative grid w-full grid-cols-1 font-sans sm:h-screen sm:grid-cols-2 sm:overflow-hidden">
      <ProxMenu
        proxName={proxName}
        setProxName={setProxName}
        count={count}
        setCount={setCount}
        oldCount={oldCountRef.current}
        clickMultiplier={clickMultiplier}
        setClickMultiplier={setClickMultiplier}
        scanner={scanner}
        totalEarnings={totalEarnings}
        setTotalEarnings={setTotalEarnings}
        lifeTimeEarnings={lifeTimeEarnings}
        setLifetimeEarnings={setLifetimeEarnings}
        passiveIncome={passiveIncome}
        prestige={prestige}
      />
      <PowerUpMenu
        count={count}
        setCount={setCount}
        lifeTimeEarnings={lifeTimeEarnings}
        totalEarnings={totalEarnings}
        clickMultiplier={clickMultiplier}
        setClickMultiplier={setClickMultiplier}
        lateMeal={latemeal}
        setLateMeal={setLatemeal}
        scanner={scanner}
        setScanner={setScanner}
        deliveries={deliveries}
        setDeliveries={setDeliveries}
        resco={resco}
        setResco={setResco}
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
        prestigeThreshold={prestigeThreshold} // Pass Prestige threshold
        passiveIncome={passiveIncome}
      />
    </div>
  );
}
