import React from "react";
import CountUp from "react-countup";

interface FormatNumberProps {
  count: number;
  oldCount: number;
}

export default function formatNumberExtended(count: number, oldCount: number) {
  const suffixes = [
    "",
    "",
    "million",
    "billion",
    "trillion",
    "quadrillion",
    "quintillion",
    "sextillion",
    "septillion",
    "octillion",
    "nonillion",
    "decillion",
    "undecillion",
    "duodecillion",
    "tredecillion",
    "quattuordecillion",
    "quindecillion",
    "sexdecillion",
    "septendecillion",
    "octodecillion",
    "novemdecillion",
    "vigintillion",
    "unvigintillion",
  ];

  let suffixIndex = 0;
  let animatedCount = count;

  while (animatedCount >= 1000 && suffixIndex < suffixes.length - 1) {
    animatedCount /= 1000;
    suffixIndex++;
  }

  // Animation for numbers below 1 million (no suffix)
  if (count < 1_000_000) {
    return <CountUp start={oldCount} end={count} duration={1} separator="," />;
  }

  // Animation with suffixes
  return (
    <>
      <CountUp
        start={oldCount / Math.pow(1000, suffixIndex)}
        end={animatedCount}
        duration={1}
        decimals={2}
      />
      {` ${suffixes[suffixIndex]}`}
    </>
  );
}
