// pages/api/saveGameData.ts

import type { NextApiRequest, NextApiResponse } from "next";
import firestore from "../utilities/firestore";

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  console.log("Received request to save game data");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Destructure the incoming body
  const { userId, gameData } = req.body;

  if (!userId || !gameData) {
    return res.status(400).json({ error: "Missing user ID or game data" });
  }

  try {
    // Access the document based on the user ID (in this example, using the email)
    const userDoc = firestore.collection("users").doc(userId);

    // Set or merge the game data
    await userDoc.set(gameData, { merge: true });

    return res.status(200).json({ message: "Game data saved successfully" });
  } catch (error: any) {
    console.error("Error saving game data:", error);
    return res
      .status(500)
      .json({ error: "Failed to save game data. " + error.message });
  }
}
