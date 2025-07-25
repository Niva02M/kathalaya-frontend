import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // MongoDB client utility
import bcrypt from "bcrypt";

// POST handler for /api/login
export async function POST(req: NextRequest) {
  try {
    // 1. Parse request body
    const { identifier, password } = await req.json();

    // 2. Basic validation
    if (!identifier || !password) {
      return NextResponse.json(
        { error: "Missing email/username or password." },
        { status: 400 }
      );
    }

    // 3. Connect to MongoDB and select the database
    const client = await clientPromise;
    const db = client.db("kathalaya");

    // 4. Search for user using either email or username
    const user = await db.collection("users").findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    // 5. If user not found, return 404
    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please check your credentials." },
        { status: 404 }
      );
    }

    // 6. Check password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    // 7. If password does not match, return 401
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid password. Please try again." },
        { status: 401 }
      );
    }

    // 8. Login successful – return basic user info (omit password)
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          email: user.email,
          username: user.username,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Login error:", err);

    // 9. Catch unexpected errors
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
