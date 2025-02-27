import React, { useState, useEffect } from "react";
import formatNumberGenerators from "../utilities/formatNumberGenerators";
import { Flex } from "@radix-ui/themes";

interface GoldenProxProps {
  passiveIncome: number;
  count: number;
  setCount: (count: number) => void;
  totalEarnings: number;
  lifeTimeEarnings: number;
  setTotalEarnings: (totalEarnings: number) => void;
  setLifetimeEarnings: (lifetimeEarnings: number) => void;
}

export default function GoldenProx({
  passiveIncome,
  count,
  setCount,
  totalEarnings,
  lifeTimeEarnings,
  setTotalEarnings,
  setLifetimeEarnings,
}: GoldenProxProps) {
  const [goldenProx, setGoldenProx] = useState<{
    left: number;
    top: number;
  } | null>(null);
  const [floatingText, setFloatingText] = useState<{
    left: number;
    top: number;
    points: number;
  } | null>(null);

  useEffect(() => {
    const spawnGoldenProx = () => {
      if (!goldenProx && Math.random() < 0.05) {
        setGoldenProx({
          left: Math.random() * 80 + 10, // X% position
          top: Math.random() * 80 + 10, // Y% position
        });

        setTimeout(() => setGoldenProx(null), 5000); // Auto-remove after 5s
      }
    };

    const interval = setInterval(spawnGoldenProx, 5000);
    return () => clearInterval(interval);
  }, [goldenProx]);

  const handleClick = () => {
    if (goldenProx) {
      const pointsEarned = passiveIncome * 100;
      setCount(count + pointsEarned);
      setTotalEarnings(totalEarnings + pointsEarned);
      setLifetimeEarnings(lifeTimeEarnings + pointsEarned);

      // Set floating text exactly where the Golden Prox was
      setFloatingText({
        left: goldenProx.left,
        top: goldenProx.top,
        points: pointsEarned,
      });

      setGoldenProx(null);

      // Remove floating text after animation completes
      setTimeout(() => setFloatingText(null), 1500);
    }
  };

  return (
    <>
      {goldenProx && (
        <div
          className="absolute z-50 h-20 w-20 animate-shake cursor-pointer select-none rounded-full bg-yellow-400 transition-all duration-150 hover:rotate-3 hover:scale-110"
          style={{
            left: `${goldenProx.left}%`,
            top: `${goldenProx.top}%`,
          }}
          onClick={handleClick}
        >
          <div className="absolute h-20 w-20 animate-ping rounded-full bg-yellow-400" />
          <div className="absolute h-20 w-20 animate-spin rounded-full border-2 border-dashed border-white" />

          <img
            src="/images/prox.svg"
            alt="Golden Prox"
            className="relative h-20 w-20 animate-pulse"
          />
        </div>
      )}

      {floatingText && (
        <Flex
          align="center"
          justify="center"
          className="absolute z-50 ml-[1.5rem] mt-[2rem] animate-fadeUp truncate text-xl font-bold text-orange-950 transition-all duration-1000 ease-out"
          style={{
            left: `${floatingText.left}%`,
            top: `${floatingText.top}%`,
          }}
        >
          +{formatNumberGenerators(floatingText.points)}{" "}
          <img
            src="/images/prox.svg"
            alt="Prox"
            className="ml-2 h-6 w-6 rounded-full shadow-md"
          />
        </Flex>
      )}
    </>
  );
}
