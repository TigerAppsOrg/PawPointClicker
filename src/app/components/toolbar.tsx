"use client";
import { Box, Flex, Tooltip } from "@radix-ui/themes";
import {
  TrophyIcon,
  AwardIcon,
  InfoIcon,
  MessageCircleQuestionIcon,
  GithubIcon,
  LogOutIcon,
  LogInIcon,
} from "lucide-react";
import Link from "next/link";

export default function Toolbar({
  session,
  setWelcome,
  setAcheivements,
  setFaq,
  setLeaderboard,
}: {
  session: any;
  setWelcome: (welcome: boolean) => void;
  setAcheivements: (achievements: boolean) => void;
  setFaq: (faq: boolean) => void;
  setLeaderboard: (leaderboard: boolean) => void;
}) {
  //function that gets users from firebase

  //
  return (
    <>
      <Flex
        align="center"
        justify="center"
        className="fixed bottom-[0.5rem] left-[calc(50%-12.35rem)] z-30 m-4 gap-[0.42rem] rounded-xl border border-orange-500 bg-orange-400/95 p-2 sm:left-2 sm:top-[calc(100vh-6rem)]"
      >
        {/* <PawPrintIcon
          // src="/images/prox.svg"
          // alt="Prox"
          className="mx-0.5 h-10 w-auto rounded-full border border-orange-600 bg-orange-500 p-1.5 text-orange-800"
        /> */}
        <Flex className="mr-2 w-[7.5rem]">
          <Flex
            justify="center"
            align="center"
            className="absolute mt-[-4rem] h-20 w-20"
          >
            <Tooltip
              content={
                session
                  ? "You are signed in as " + session.user.name + "!"
                  : "Sign in to save your progress!"
              }
            >
              <img
                src={
                  session
                    ? "/images/avatarborders/crown.webp"
                    : "/images/avatarborders/guest.webp"
                }
                alt="avatarborder"
                className="absolute z-10 min-h-[6rem] min-w-[6rem]"
              />
            </Tooltip>
            <img
              src={session ? session?.user.image : "/images/guest.png"}
              alt={session && session.user?.name}
              className="z-5 absolute mt-[0.1rem] h-20 w-20"
            />
            <p className="absolute bottom-0 z-20 rounded-md border border-white bg-orange-500 px-2 text-center text-xs text-white">
              {session ? (
                <span className="truncate">{session.user?.name}</span>
              ) : (
                <span>Guest</span>
              )}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="z-5 absolute bottom-[-0.35rem] right-[-3rem] truncate rounded-r-lg border border-orange-700 bg-orange-500 py-2 pl-4 pr-2 text-sm font-semibold no-underline transition hover:bg-orange-300"
            >
              {session ? (
                <Tooltip content="Sign out">
                  <LogOutIcon className="size-6" />
                </Tooltip>
              ) : (
                <Tooltip content="Sign in">
                  <LogInIcon className="size-6" />
                </Tooltip>
              )}
            </Link>
          </Flex>
        </Flex>
        <Box className="h-8 border border-r-[0.025rem] border-black" />
        <Tooltip content="Info">
          <button
            onClick={() => setWelcome(true)}
            className="rounded-lg border border-orange-500 bg-orange-300 px-2.5 py-2 text-orange-600 hover:scale-[1.02] hover:bg-orange-200"
          >
            <InfoIcon />
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
        <Tooltip content="Achievements">
          <button
            onClick={() => setAcheivements(true)}
            className="rounded-lg border border-orange-500 bg-orange-300 px-2.5 py-2 text-orange-600 hover:scale-[1.02] hover:bg-orange-200"
          >
            <AwardIcon />
          </button>
        </Tooltip>
        <Tooltip content="Leaderboard">
          <button
            onClick={() => setLeaderboard(true)}
            className="relative overflow-hidden rounded-lg border border-orange-500 bg-orange-300 hover:scale-[1.02] hover:bg-orange-200"
          >
            <TrophyIcon className="relative z-10 mx-2.5 my-2 text-orange-600" />
          </button>
        </Tooltip>
        <Tooltip content="GitHub Repository">
          <a
            href="https://github.com/TigerAppsOrg/PawPointClicker/"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-[-1.65rem] hidden rounded-r-lg border border-black/40 bg-orange-100/80 px-1 py-1 text-gray-700 hover:scale-[1.02] hover:bg-orange-200/80 sm:flex"
          >
            <GithubIcon size={16} />
          </a>
        </Tooltip>
      </Flex>
    </>
  );
}
