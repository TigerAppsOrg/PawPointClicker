import React, { useState } from "react";
import Image from "next/image";
import { Box, Flex, Text } from "@radix-ui/themes";

export default function ProxButton(props: {
  count: number;
  setCount: (count: number) => void;
  clickMultiplier: number;
  setClickMultiplier: (clickMultiplier: number) => void;
}) {
  const [effect, setEffect] = useState(true);
  const [notifications, setNotifications] = useState<
    { id: number; offset: number }[]
  >([]);

  const handleButtonClick = () => {
    const newId = Date.now(); // Unique ID for each notification
    const offset = Math.random() * 20 - 10; // Random horizontal offset for variation

    setNotifications((prev) => [...prev, { id: newId, offset }]);
    props.setCount(props.count + props.clickMultiplier);

    // Remove notification after 1 second
    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== newId),
      );
    }, 500);
  };

  const buttonRadius = 144; // Button radius in px (from h-72/w-72)

  return (
    <Flex justify="center" className="relative h-full w-full flex-col">
      <Flex
        align="center"
        className="mb-12 h-64 flex-col bg-red-100 py-12 text-5xl font-extrabold"
      >
        <Text>Paw Points: </Text>
        <Text
          className={`${
            effect &&
            "animate-wiggle scale-105 text-8xl text-orange-900 transition"
          } relative text-7xl`}
        >
          {props.count}
        </Text>
      </Flex>

      <Flex justify="center" className="relative mx-auto">
        {/* Render notifications */}
        {notifications.map((notification) => (
          <Flex
            justify="center"
            align="center"
            key={notification.id}
            style={{
              position: "absolute",
              transform: `translate(${notification.offset * 8}px, ${notification.offset * 2}px)`,
            }}
            className={`animate-shake right-0 top-0 z-20 h-24 w-24 rounded-full border-2 border-orange-400 bg-orange-100 p-2 text-3xl font-bold text-red-600 transition duration-75`}
          >
            +{props.clickMultiplier}
          </Flex>
        ))}
        {/* Container for spinning cards */}
        <div
          className="animate-spinCards absolute inset-0 flex items-center justify-center"
          style={{ height: buttonRadius * 2, width: buttonRadius * 2 }}
        >
          {Array.from({ length: props.clickMultiplier }).map((_, index) => (
            <Box
              key={index}
              style={{
                position: "absolute",
                transform: `rotate(${index * 36}deg) translate(${buttonRadius}px)`,
                transformOrigin: `center`,
              }}
              className="h-16 w-16 rounded-lg border bg-orange-400"
            ></Box>
          ))}
        </div>

        <button
          onClick={handleButtonClick}
          className={`${
            effect && "bg-orange-100"
          } hover:animate-wiggle h-72 w-72 rounded-full bg-orange-400 text-white drop-shadow-lg transition ease-in-out`}
        >
          <Box className="">
            <Image
              src="/images/prox.svg"
              alt="Prox"
              className={`${
                effect && "animate-wiggle"
              } h-[90%] transition duration-200 ease-in-out hover:scale-105`}
              onClick={() => {
                setEffect(true);
              }}
              onAnimationEnd={() => setEffect(false)}
              height={1000}
              width={1000}
            />
          </Box>
        </button>
      </Flex>
    </Flex>
  );
}
