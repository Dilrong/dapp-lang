const fs = require("fs").promises;
const path = require("path");

async function aggregateDapps() {
  const dapps = [];
  const files = await fs.readdir("shard/data");
  for (const file of files) {
    if (file.endsWith(".json") && file !== "dapps.json") {
      const data = JSON.parse(await fs.readFile(`shard/data/${file}`));
      dapps.push(data);
    }
  }
  await fs.writeFile("shard/data/dapps.json", JSON.stringify(dapps, null, 2));
}

aggregateDapps();
