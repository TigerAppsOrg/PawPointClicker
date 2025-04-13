// src/app/api/getAllUserData/route.ts
import { NextResponse } from "next/server";
import firestore from "../../utilities/firestore";

export async function GET(request: Request) {
  try {
    const snapshot = await firestore.collection("users").get();
    const allUserData: any[] = [];

    snapshot.forEach((doc) => {
      allUserData.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ data: allUserData });
  } catch (error: any) {
    console.error("Error fetching all user data:", error);
    return NextResponse.json(
      { error: "Failed to fetch all user data. " + error.message },
      { status: 500 },
    );
  }
}
