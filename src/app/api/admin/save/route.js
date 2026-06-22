import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const body = await req.json();
    const { destinations, curatedDestinations } = body;

    if (!destinations || !curatedDestinations) {
      return NextResponse.json(
        { success: false, error: "Missing destinations or curatedDestinations in payload." },
        { status: 400 }
      );
    }

    // Resolve the path to src/lib/destinations.js
    const filePath = path.join(process.cwd(), "src", "lib", "destinations.js");

    // Construct the Javascript code file contents
    const newContent = `export const destinations = ${JSON.stringify(destinations, null, 2)};\n\nexport const curatedDestinations = ${JSON.stringify(curatedDestinations, null, 2)};\n`;

    // Write back to the file system
    fs.writeFileSync(filePath, newContent, "utf-8");

    return NextResponse.json({
      success: true,
      message: "Database updated successfully on the server."
    });
  } catch (error) {
    console.error("Error in admin save API route:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save updates to database." },
      { status: 500 }
    );
  }
}
