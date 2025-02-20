"use client";
import React, { useEffect, useRef } from "react";
import ProxMenu from "./prox/proxMenu";
import PowerUpMenu from "./menu/powerUpMenu";
import WelcomeModal from "./components/welcomeModal";
import Achievements from "./components/acheivementsModal";
import FAQ from "./components/faqModal";

import useLocalStorage from "./utilities/useLocalStorage";
import { Box, Flex, Tooltip } from "@radix-ui/themes";
import {
  GithubIcon,
  InfoIcon,
  MessageCircleQuestionIcon,
  PawPrintIcon,
  TrophyIcon,
} from "lucide-react";

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

  // Counting clicks
  const [userClicks, setUserClicks] = useLocalStorage("userClicks", 0);

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
  // For tracking first launch
  const [isFirstLaunch, setIsFirstLaunch] = useLocalStorage(
    "isFirstLaunch",
    true,
  );

  //For Modal Accession
  const [welcome, setWelcome] = useLocalStorage("welcome", false);
  const [acheivements, setAcheivements] = useLocalStorage(
    "achievements",
    false,
  );
  const [faq, setFaq] = useLocalStorage("faq", false);

  // Game start time
  const [gameStartTime, setGameStartTime] = useLocalStorage("time", "");

  // Initialize game start time if this is the first launch
  useEffect(() => {
    if (isFirstLaunch && !gameStartTime) {
      const startTime = new Date();
      setGameStartTime(startTime.toISOString()); // Store as string
      setIsFirstLaunch(false); // Update isFirstLaunch to false after setting the time
    }
  }, [isFirstLaunch, gameStartTime, setGameStartTime, setIsFirstLaunch]);

  // Function to calculate play time
  const calculatePlayTime = () => {
    if (gameStartTime) {
      const storedStartTime = new Date(gameStartTime); // Parse the string back into a Date
      const elapsed = new Date().getTime() - storedStartTime.getTime();
      return elapsed; // Return milliseconds
    }
    return 0;
  };

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
    Math.round(amount * rate * Math.pow(1.05, prestige));

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

  const totalPowerUps =
    clickMultiplier +
    latemeal +
    scanner +
    deliveries +
    resco +
    farms +
    factories +
    mine +
    bank +
    lab +
    temple +
    spaceStation;

  const unlocked =
    (clickMultiplier > 0 ? 1 : 0) +
    (latemeal > 0 ? 1 : 0) +
    (scanner > 0 ? 1 : 0) +
    (deliveries > 0 ? 1 : 0) +
    (resco > 0 ? 1 : 0) +
    (farms > 0 ? 1 : 0) +
    (mine > 0 ? 1 : 0) +
    (factories > 0 ? 1 : 0) +
    (bank > 0 ? 1 : 0) +
    (lab > 0 ? 1 : 0) +
    (temple > 0 ? 1 : 0) +
    (spaceStation > 0 ? 1 : 0);

  return (
    <div className="relative grid w-full grid-cols-1 font-sans sm:h-screen sm:grid-cols-2 sm:overflow-hidden">
      <WelcomeModal isOpen={welcome} setIsOpen={setWelcome} />
      <Achievements
        stats={{
          count: count,
          prestigeLevel: prestige,
          lifeTimeEarnings,
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
          totalEarnings,
          totalEfficiencyBoost: Math.round(Math.pow(1.05, prestige) * 100),
          passiveIncome: passiveIncome,
          upgradesUnlocked: unlocked,
          collectors: totalPowerUps,
          playTime: calculatePlayTime(),
          userClicks: userClicks,
          hiddenFeaturesUnlocked: 0,
        }}
        achievements={acheivements}
        setAchievements={setAcheivements}
      />
      <FAQ isOpen={faq} setIsOpen={setFaq} />
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
        collectors={{
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
        }}
        userClicks={userClicks}
        setUserClicks={setUserClicks}
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
        userClicks={userClicks}
        playTime={calculatePlayTime()}
      />
      <Flex
        align="center"
        justify="center"
        className="fixed bottom-[0.5rem] left-[calc(50%-10rem)] z-30 m-4 gap-2 rounded-xl border border-orange-500 bg-orange-400/95 p-2 sm:left-2 sm:top-[calc(100vh-6rem)]"
      >
        <PawPrintIcon
          // src="/images/prox.svg"
          // alt="Prox"
          className="mx-0.5 h-10 w-auto rounded-full border border-orange-600 bg-orange-500 p-1.5 text-orange-800"
        />

        <Box className="h-8 border border-r-[0.025rem] border-black" />
        <Tooltip content="Info">
          <button
            onClick={() => setWelcome(true)}
            className="rounded-lg border border-orange-500 bg-orange-300 px-2.5 py-2 text-orange-600 hover:scale-[1.02] hover:bg-orange-200"
          >
            <InfoIcon />
          </button>
        </Tooltip>
        <Tooltip content="Achievements">
          <button
            onClick={() => setAcheivements(true)}
            className="rounded-lg border border-orange-500 bg-orange-300 px-2.5 py-2 text-orange-600 hover:scale-[1.02] hover:bg-orange-200"
          >
            <TrophyIcon />
          </button>
        </Tooltip>
        <Tooltip content="FAQ">
          <button
            onClick={() => setFaq(true)}
            className="rounded-lg border border-orange-500 bg-orange-300 px-2.5 py-2 text-orange-600 hover:scale-[1.02] hover:bg-orange-200"
          >
            <MessageCircleQuestionIcon />
          </button>
        </Tooltip>
        <Tooltip content="GitHub Repository">
          <a
            href="https://github.com/TigerAppsOrg/PawPointClicker/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-orange-500 bg-orange-300 px-2.5 py-2 text-gray-700 hover:scale-[1.02] hover:bg-orange-200"
          >
            <GithubIcon size={24} />
          </a>
        </Tooltip>
      </Flex>
    </div>
  );
}
