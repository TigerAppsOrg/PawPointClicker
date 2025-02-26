import React, { useState, useEffect, useRef } from "react";
import { Flex } from "@radix-ui/themes";
import ProxButton from "./proxButton";
import GoldenProx from "../components/goldenprox";

export default function ProxMenu(props: {
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
  collectors: {
    latemeal: number;
    farms: number;
    deliveries: number;
    resco: number;
    factories: number;
    scanner: number;
    mine: number;
    bank: number;
    lab: number;
    temple: number;
    spaceStation: number;
  };
  userClicks: number;
  setUserClicks: (userClicks: number) => void;
}) {
  const { collectors } = props;
  const [fallingImages, setFallingImages] = useState<
    { id: string; src: string; left: number; delay: number; speed: number }[]
  >([]);
  const [backgroundImage, setBackgroundImage] = useState(
    "/images/backgrounds/concretebackground.jpg",
  );
  const fallingImagesRef = useRef(fallingImages);

  useEffect(() => {
    fallingImagesRef.current = fallingImages;
  }, [fallingImages]);

  //reset background image when collectors
  useEffect(() => {
    setBackgroundImage(getBackgroundImage()); // Reset background image
  }, [props.collectors]);

  //reset background image when prestige
  useEffect(() => {
    setFallingImages([]); // Remove falling images
  }, [props.prestige]);

  const addFallingImages = (
    type: "latemeal" | "deliveries",
    count: number,
    src: string,
  ) => {
    setFallingImages((prev) => {
      const existingImages = prev.filter((img) => img.id.startsWith(type));
      const newImages = [];

      for (let i = existingImages.length; i < Math.min(count, 30); i++) {
        newImages.push({
          id: `${type}-${i}`,
          src,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          speed: 5 + Math.random() * 10, // Speed between 5s and 15s
        });
      }

      return [...prev, ...newImages];
    });
  };

  useEffect(() => {
    addFallingImages(
      "latemeal",
      collectors.latemeal,
      "/images/generators/latemeal.png",
    );
  }, [collectors.latemeal]);

  useEffect(() => {
    addFallingImages(
      "deliveries",
      collectors.deliveries,
      "/images/generators/delivery.png",
    );
  }, [collectors.deliveries]);

  const getBackgroundImage = () => {
    const {
      spaceStation,
      temple,
      latemeal,
      lab,
      bank,
      mine,
      factories,
      resco,
      deliveries,
      farms,
    } = props.collectors;
    if (spaceStation > 0) return "/images/backgrounds/station.jpg";
    if (temple > 0) return "/images/backgrounds/temple.gif";
    if (lab > 0) return "/images/backgrounds/lab.webp";
    if (bank > 0) return "/images/backgrounds/bank.jpeg";
    if (factories > 0) return "/images/backgrounds/factories.jpg";
    if (mine > 0) return "/images/backgrounds/mines.jpg";
    if (farms > 0) return "/images/backgrounds/farm.jpg";
    if (resco > 0) return "/images/backgrounds/resco.jpg";
    if (deliveries > 0) return "/images/backgrounds/delivery.jpg";
    if (latemeal > 0) return "/images/backgrounds/latemeal.jpg";
    return "/images/backgrounds/concretebackground.jpg"; // Default background
  };

  return (
    <Flex
      align="center"
      direction="column"
      className="relative z-20 h-screen w-full overflow-hidden bg-red-200"
    >
      <ProxButton
        proxName={props.proxName}
        setProxName={props.setProxName}
        count={props.count}
        oldCount={props.oldCount}
        setCount={props.setCount}
        clickMultiplier={props.clickMultiplier}
        setClickMultiplier={props.setClickMultiplier}
        scanner={props.scanner}
        lifeTimeEarnings={props.lifeTimeEarnings}
        setLifetimeEarnings={props.setLifetimeEarnings}
        totalEarnings={props.totalEarnings}
        setTotalEarnings={props.setTotalEarnings}
        passiveIncome={props.passiveIncome}
        prestige={props.prestige}
        lab={collectors.lab}
        userClicks={props.userClicks}
        setUserClicks={props.setUserClicks}
      />
      <img
        src={backgroundImage}
        alt="Prox"
        className="absolute z-10 h-full select-none object-cover object-center opacity-30"
      />

      {collectors.farms > 0 && (
        <img
          src="/images/tractor.gif"
          alt="tractor"
          className="absolute bottom-6 left-32 z-40 h-auto max-h-[4rem] w-auto scale-[5] select-none"
        />
      )}

      {collectors.factories > 0 && (
        <>
          <img
            src="/images/robot_arm2.gif"
            alt="robotarm"
            className="absolute right-[-15%] top-[-20%] z-[31] size-[32rem] -scale-100 select-none"
          />
        </>
      )}

      {fallingImages.map((image) => (
        <div
          key={image.id}
          className="absolute z-[24] h-16 w-16 select-none"
          style={{
            left: `${image.left}%`,
            top: "-10%",
            animation: `falling-animation ${image.speed}s linear ${image.delay}s infinite`,
          }}
        >
          <img
            src={image.src}
            alt="falling"
            className="absolute z-30 h-16 w-16"
            style={{
              rotate: `${Math.random() * 180 - 90}deg`,
            }}
          />
        </div>
      ))}

      {/* Prox Scanners */}
      {collectors.scanner > 0 && (
        <Flex className="absolute bottom-[-2rem] z-30 w-max select-none">
          {Array.from({ length: Math.min(props.scanner, 30) }).map(
            (_, index) => (
              <Flex
                className="relative w-full"
                key={"bottomscanner" + index}
                style={{
                  width: `${100 / Math.min(props.scanner, 10)}%`, // Dynamically adjust width to fit all scanners
                }}
              >
                <img
                  key={index}
                  src="/images/generators/prox_scanner.gif"
                  alt={`Scanner ${index + 1}`}
                  className="h-[4rem] w-auto rotate-12 scale-[5]"
                />
              </Flex>
            ),
          )}
        </Flex>
      )}

      {collectors.mine > 0 && (
        <Flex className="absolute bottom-[7rem] z-[25] w-max select-none">
          {Array.from({ length: Math.min(collectors.mine, 8) }).map(
            (_, index) => (
              <Flex
                style={{
                  width: `${100 / Math.min(collectors.mine, 8)}%`, // Dynamically adjust width to fit all scanners
                }}
                key={`miner-${index}`}
                className="relative mx-8 w-full"
              >
                <img
                  src="/images/miner.gif"
                  alt="miner"
                  className="h-[4rem] w-auto rotate-12 scale-[5]"
                />
              </Flex>
            ),
          )}{" "}
        </Flex>
      )}
      <GoldenProx
        passiveIncome={props.passiveIncome}
        count={props.count}
        setCount={props.setCount}
      />
    </Flex>
  );
}
