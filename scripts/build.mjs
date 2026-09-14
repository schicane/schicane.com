import { spawn } from "node:child_process";
import {
  mkdirSync,
  createWriteStream,
  copyFileSync,
  existsSync,
} from "node:fs";
mkdirSync("logs", { recursive: true });
mkdirSync("public", { recursive: true });
copyFileSync("CNAME", "public/CNAME");
const log = createWriteStream("logs/build.log");
const started = new Date().toISOString();
log.write(`[${started}] Production static export started\n`);
console.log(`[build] ${started} — generating static HTML for schicane.com`);
const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build", "--webpack"],
  {
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["inherit", "pipe", "pipe"],
  },
);
child.stdout.on("data", (data) => {
  process.stdout.write(data);
  log.write(data);
});
child.stderr.on("data", (data) => {
  process.stderr.write(data);
  log.write(data);
});
child.on("error", (error) => {
  log.end(`${error.stack}\n`);
  process.exitCode = 1;
});
child.on("close", (code) => {
  const valid = existsSync("out/index.html") && existsSync("out/CNAME");
  const result = code === 0 && valid ? 0 : 1;
  log.end(
    `[${new Date().toISOString()}] Export ${result === 0 ? "succeeded" : "failed"} (exit ${code})\n`,
  );
  process.exitCode = result;
});
