// src/app/api/saveGameData/route.ts

import { NextResponse } from "next/server";
import firestore from "../../utilities/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, gameData } = body;

    if (!userId || !gameData) {
      return NextResponse.json(
        { error: "Missing user ID or game data" },
        { status: 400 },
      );
    }

    // Access the document based on the user ID (for example, using the email)
    const userDoc = firestore.collection("users").doc(userId);

    // Set or merge the game data
    await userDoc.set(gameData, { merge: true });

    return NextResponse.json({ message: "Game data saved successfully" });
  } catch (error: any) {
    console.error("Error saving game data:", error);
    return NextResponse.json(
      { error: "Failed to save game data. " + error.message },
      { status: 500 },
    );
  }
}
