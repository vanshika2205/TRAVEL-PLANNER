const fs = require('fs');
const path = require('path');

const filePath = path.resolve('/Users/vanshika/Downloads/VANSHIKA./CODING/html project/travel planner/.next/server/chunks/ssr/html project_travel planner_src_app_page_07a1jel.js');

try {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  console.log("Total lines:", lines.length);
  const targetLine = lines[3]; // Line 4 (0-indexed 3)
  if (targetLine) {
    console.log("Line 4 length:", targetLine.length);
    const start = Math.max(0, 295 - 150);
    const end = Math.min(targetLine.length, 295 + 150);
    console.log("Snippet around 295:\n", targetLine.slice(start, end));
  } else {
    console.log("Line 4 not found");
  }
} catch (e) {
  console.error("Error reading file:", e.message);
}
