const fs = require("fs");
const path = require("path");

const MD_PATH = path.join(__dirname, "prompts", "service-images.md");
const OUT_DIR = path.join(__dirname, "..", "app", "assets", "images");
const MAX_RETRIES = 5;
const DELAY_MS = 3000;

function parsePrompts(mdPath) {
  const lines = fs.readFileSync(mdPath, "utf8").split("\n");
  const jobs = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    if (!trimmed.includes("|")) continue;
    const parts = trimmed.split("|");
    if (parts.length < 3) continue;
    const file = parts[0].trim();
    const dims = parts[1].trim();
    const prompt = parts.slice(2).join("|").trim();
    const m = dims.match(/^(\d+)x(\d+)$/);
    if (!m || !prompt) continue;
    jobs.push({ file, width: Number(m[1]), height: Number(m[2]), prompt });
  }
  return jobs;
}

function hashSeed(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function download(job) {
  const url =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(job.prompt)}` +
    `?width=${job.width}&height=${job.height}&seed=${hashSeed(job.file)}&nologo=true`;
  const outPath = path.join(OUT_DIR, job.file);
  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 5000) {
    console.log(`SKIP ${job.file} (exists)`);
    return true;
  }
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(180000) });
      if (res.status === 429) {
        const wait = 30000 * attempt;
        console.warn(`RATE-LIMIT ${job.file} — waiting ${wait / 1000}s (attempt ${attempt}/${MAX_RETRIES})`);
        await sleep(wait);
        continue;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 5000) throw new Error(`tiny payload ${buf.length}B`);
      fs.writeFileSync(outPath, buf);
      console.log(`OK ${job.file} (${(buf.length / 1024).toFixed(0)}KB)`);
      return true;
    } catch (err) {
      console.warn(`RETRY ${attempt}/${MAX_RETRIES} ${job.file}: ${err.message}`);
      await sleep(10000 * attempt);
    }
  }
  console.error(`FAIL ${job.file}`);
  return false;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const jobs = parsePrompts(MD_PATH);
  console.log(`Parsed ${jobs.length} images — sequential, ${DELAY_MS / 1000}s gap, resume-enabled`);
  let ok = 0;
  let fail = 0;
  for (const job of jobs) {
    const success = await download(job);
    if (success) ok++;
    else fail++;
    await sleep(DELAY_MS);
  }
  console.log(`\nDone: ${ok} ok, ${fail} failed, ${jobs.length} total`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
