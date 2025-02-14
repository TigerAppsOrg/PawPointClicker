import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Box, Flex, Text, Tooltip } from "@radix-ui/themes";
import CountUp from "react-countup";

import RenderCards from "./renderCards";
import formatNumberExtended from "../utilities/formatNumberExtended";

export default function ProxButton(props: {
  proxName: string;
  setProxName: (proxName: string) => void;
  count: number;
  oldCount: number;
  setCount: (count: number) => void;
  clickMultiplier: number;
  setClickMultiplier: (clickMultiplier: number) => void;
  scanner: number;
  lifeTimeEarnings: number;
  setLifetimeEarnings: (lifetimeEarnings: number) => void;
  totalEarnings: number;
  setTotalEarnings: (totalEarnings: number) => void;
  passiveIncome: number;
  prestige: number;
  lab: number;
  userClicks: number;
  setUserClicks: (userClicks: number) => void;
}) {
  const [effect, setEffect] = useState(true);
  const [notifications, setNotifications] = useState<
    { id: number; offset: number }[]
  >([]);
  const [numberStyle, setNumberStyle] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [clickTimestamps, setClickTimestamps] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setClickTimestamps(
        (timestamps) => timestamps.filter((t) => now - t <= 1000), // Keep only clicks within the last second
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  //return time interval based on count
  function timeInterval() {
    if (props.lifeTimeEarnings < 10) {
      return 500;
    } else if (props.lifeTimeEarnings < 100) {
      return 400;
    } else if (props.lifeTimeEarnings < 1000) {
      return 300;
    } else {
      return 200;
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlashing((prev) => !prev); // Toggle the flashing state every second
    }, timeInterval()); // Flash every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Multiplier state logic
  const [trueMultiplier, setTrueMultiplier] = useState(1);
  const [clickQueue, setClickQueue] = useState<number[]>([]);

  const MAX_MULTIPLIER = Math.round(
    props.clickMultiplier * Math.pow(1.01, props.prestige),
  ); // Maximum multiplier value
  const RESET_DELAY = 1000 + 150 * MAX_MULTIPLIER; // Start at 1000ms but scale with more multipliers purchased. Delay in milliseconds to reset the queue

  // Handle multiplier logic - increases as user spam clicks, resets after a delay. Max multiplier is the amount of click multipliers purchased
  useEffect(() => {
    if (clickQueue.length === 0) return;

    const now = Date.now();
    const lastClickTime = clickQueue[clickQueue.length - 1];

    if (lastClickTime !== undefined && now - lastClickTime > RESET_DELAY) {
      setClickQueue([]);
      setTrueMultiplier(1);
    }

    // Cleanup interval
    const interval = setInterval(() => {
      const now = Date.now();
      const updatedQueue = clickQueue.filter(
        (time) => now - time <= RESET_DELAY,
      );
      setClickQueue(updatedQueue);
      setTrueMultiplier(updatedQueue.length || 1);
    }, 100);

    return () => clearInterval(interval);
  }, [clickQueue]);

  // Handle main prox button click
  const handleButtonClick = () => {
    const newId = Date.now();
    setClickTimestamps((prev) => [...prev, newId]); // Track click times

    const offset = Math.random() * 20 - 10;

    setClickQueue((prevQueue) => {
      const now = Date.now();
      const updatedQueue = [...prevQueue, now].slice(-MAX_MULTIPLIER);
      setTrueMultiplier(updatedQueue.length);
      return updatedQueue;
    });

    setNotifications((prev) => [...prev, { id: newId, offset }]);

    let totalAdjustedMultiplier = Math.round(
      trueMultiplier * Math.pow(1.01, props.prestige),
    );

    props.setUserClicks(props.userClicks + 1);

    props.setCount(props.count + totalAdjustedMultiplier);
    props.setLifetimeEarnings(props.lifeTimeEarnings + totalAdjustedMultiplier);
    props.setTotalEarnings(props.totalEarnings + totalAdjustedMultiplier);

    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== newId),
      );
    }, 500);
  };

  return (
    <Flex align="center" className="relative z-40 h-full w-full flex-col">
      {/* Prox Name Input Section */}
      <Flex className="absolute z-50 w-full flex-col">
        <Flex
          align="center"
          justify="center"
          className="w-full bg-gradient-to-br from-red-400/80 to-orange-500/80 py-3 shadow-lg"
        >
          <img
            src="/images/prox.svg"
            alt="Prox"
            className="mx-4 h-9 w-9 rounded-full shadow-md"
          />
          <input
            type="text"
            value={props.proxName}
            onChange={(e) => props.setProxName(e.target.value)}
            className="mr-8 w-full rounded-xl border-none bg-gray-800/30 py-0.5 text-center text-xl font-semibold text-white placeholder-gray-300 outline-none backdrop-blur-md"
            placeholder="Enter Prox Name..."
          />
        </Flex>

        {/* Paw Points Display */}
        <Flex
          align="center"
          className="w-full flex-col bg-gradient-to-br from-red-300/70 to-orange-300/70 pb-3 pt-2 text-2xl font-extrabold shadow-md"
        >
          <Text className="font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Paw Points:
          </Text>
          <Flex align="center" justify="center" className="h-[3rem] text-white">
            <button
              className={`${
                effect &&
                "scale-105 animate-wiggle text-5xl text-yellow-200 transition"
              } absolute mt-[-0.4rem] text-4xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]`}
              onClick={() => setNumberStyle(!numberStyle)}
            >
              {numberStyle ? (
                <CountUp
                  start={props.oldCount}
                  end={props.count}
                  duration={1}
                  separator=","
                />
              ) : (
                formatNumberExtended(props.count, props.oldCount)
              )}
            </button>
          </Flex>

          <Text className="text-sm font-bold text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            per second:{" "}
            {props.passiveIncome +
              clickTimestamps.length *
                trueMultiplier *
                Number(Math.pow(1.01, props.prestige).toFixed(1))}
          </Text>
        </Flex>
      </Flex>

      <Flex
        align="center"
        justify="center"
        className="relative z-20 mx-auto h-full w-full select-none"
      >
        <RenderCards clickMultiplier={props.clickMultiplier} />

        <Box className="relative">
          {props.lab > 0 && (
            <img
              src="/images/robot_arm.gif"
              alt="robotarm"
              className="z--5 absolute left-[-4rem] top-[-4rem]"
            />
          )}
          {notifications.map((notification) => (
            <Flex
              justify="center"
              align="center"
              key={notification.id}
              style={{
                position: "absolute",
                transform: `translate(${notification.offset * 8}px, ${notification.offset * 2}px)`,
              }}
              className={`absolute right-0 top--5 z-50 h-16 w-16 animate-shake select-none rounded-full border-2 border-orange-400 bg-orange-100 text-2xl font-bold text-red-600`}
            >
              +{trueMultiplier}
            </Flex>
          ))}
          <button
            onClick={handleButtonClick}
            className={`${
              effect && "bg-green-300"
            } h-48 w-48 select-none rounded-full bg-orange-400 text-white drop-shadow-lg transition ease-in-out hover:animate-wiggle`}
          >
            <Flex
              justify="center"
              className={`${
                effect && "animate-wiggle"
              } select-none transition duration-200 ease-in-out hover:scale-105`}
            >
              <Image
                src="/images/prox.svg"
                alt="Prox"
                onClick={() => {
                  setEffect(true);
                }}
                onAnimationEnd={() => setEffect(false)}
                height={1000}
                width={1000}
                className={`${
                  effect && "animate-wiggle"
                } h-[90%] select-none transition duration-200 ease-in-out hover:scale-105`}
              />
              <Tooltip content="Click Multiplier">
                <Flex
                  align="center"
                  justify="center"
                  className={`absolute bottom-[-1rem] z-20 h-10 w-10 rounded-full border-4 border-orange-400 font-extrabold text-black transition-colors ${
                    isFlashing ? "bg-red-400/80" : "bg-green-400/80"
                  }`}
                >
                  x{trueMultiplier}
                </Flex>
              </Tooltip>
            </Flex>
          </button>
        </Box>
      </Flex>
    </Flex>
  );
}
