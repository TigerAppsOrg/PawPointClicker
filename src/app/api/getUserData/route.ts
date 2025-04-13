// src/app/api/getUserData/route.ts

import { NextResponse } from "next/server";
import firestore from "../../utilities/firestore";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const userDoc = await firestore.collection("users").doc(userId).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { error: "User data not found" },
        { status: 404 },
      );
    }

    // Return the document data exactly as it is in Firestore
    const data = userDoc.data();
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data. " + error.message },
      { status: 500 },
    );
  }
}
