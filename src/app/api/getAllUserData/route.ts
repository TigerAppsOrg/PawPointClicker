// src/app/api/getAllUserData/route.ts
import { NextResponse } from "next/server";
import firestore from "../../utilities/firestore";

export async function GET(request: Request) {
  try {
    const snapshot = await firestore.collection("users").get();
    const leaderboardData: any[] = [];

    snapshot.forEach((doc) => {
      const data = doc.data();
      // Pick only the fields needed for the leaderboard modal
      const {
        session,
        proxName,
        lifeTimeEarnings,
        prestige,
        clickMultiplier,
        latemeal,
        scanner,
        deliveries, // adjust if your stored key is different (e.g. "frist")
        resco,
        farms,
        mine,
        factories,
        bank,
        lab,
        temple,
        spaceStation,
      } = data;

      leaderboardData.push({
        id: doc.id,
        session,
        proxName,
        lifeTimeEarnings,
        prestige,
        clickMultiplier,
        latemeal,
        scanner,
        deliveries,
        resco,
        farms,
        mine,
        factories,
        bank,
        lab,
        temple,
        spaceStation,
      });
    });

    return NextResponse.json({ data: leaderboardData });
  } catch (error: any) {
    console.error("Error fetching leaderboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch all user data. " + error.message },
      { status: 500 },
    );
  }
}
