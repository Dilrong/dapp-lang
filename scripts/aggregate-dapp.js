// scripts/aggregate-dapps.js
const fs = require("fs").promises;
const path = require("path");

async function aggregateDapps() {
  const dapps = [];
  const dataDir = path.join(__dirname, "../packages/shared/data");
  try {
    const files = await fs.readdir(dataDir);
    for (const file of files) {
      if (file.endsWith(".json") && file !== "dapps.json") {
        const filePath = path.join(dataDir, file);
        const data = JSON.parse(await fs.readFile(filePath, "utf8"));
        dapps.push(data);
      }
    }
    const outputPath = path.join(dataDir, "dapps.json");
    await fs.writeFile(outputPath, JSON.stringify(dapps, null, 2));
    console.log("Successfully aggregated dapps.json");
  } catch (err) {
    console.error("Error aggregating Dapps:", err);
    process.exit(1);
  }
}

aggregateDapps();
