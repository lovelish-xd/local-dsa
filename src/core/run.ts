import fs from "fs";
import path from "path";
import { execa } from "execa";

async function isCommandAvailable(command: string): Promise<boolean> {
  try {
    await execa(command, ["--version"], { stdio: "ignore" });
    return true;
  } catch {
    if (process.platform === "win32") {
      try {
        await execa("where.exe", [command], { stdio: "ignore" });
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}

async function resolveCppCompiler(): Promise<string | null> {
  const candidates = ["g++", "clang++"];

  for (const cmd of candidates) {
    if (await isCommandAvailable(cmd)) return cmd;
  }

  // Windows fallback: common MSYS2 install path
  if (process.platform === "win32") {
    const msysGpp = "C:\\msys64\\ucrt64\\bin\\g++.exe";
    if (fs.existsSync(msysGpp)) return msysGpp;
  }

  return null;
}

export async function handleRun(testMode: boolean) {
  const files = fs.readdirSync(process.cwd());
  const cwd = process.cwd();
const inputPath = path.join(cwd, "input.txt");
const expectedPath = path.join(cwd, "output.txt");

let inputData = "";
let expectedData = "";

if (testMode) {
  if (!fs.existsSync(inputPath) || !fs.existsSync(expectedPath)) {
    console.log("input.txt or output.txt not found.");
    return;
  }

  inputData = fs.readFileSync(inputPath, "utf-8");
  expectedData = fs.readFileSync(expectedPath, "utf-8").trim();
}

  try {
    if (files.includes("main.cpp")) {
      console.log("Running C++...");

      const cppCompiler = await resolveCppCompiler();
      if (!cppCompiler) {
        console.log(
          "C++ compiler not found. Install g++ (MSYS2/MinGW) and ensure PATH includes C:\\msys64\\ucrt64\\bin."
        );
        return;
      }

      const output = process.platform === "win32" ? "main.exe" : "main";
      const runTarget =
        process.platform === "win32"
          ? path.join(process.cwd(), "main.exe")
          : "./main";
      const compilerDir = path.dirname(cppCompiler);
      const envPath = process.env.PATH || "";
      const mergedPath = envPath.includes(compilerDir)
        ? envPath
        : `${compilerDir}${path.delimiter}${envPath}`;
      const commandEnv = { ...process.env, PATH: mergedPath };

      await execa(cppCompiler, ["main.cpp", "-o", output], {
        stdio: "inherit",
        env: commandEnv,
      });
      if (!testMode) {
    await execa(runTarget, [], {
        stdio: "inherit",
        env: commandEnv,
    });
    } else {
    const result = await execa(runTarget, [], {
        input: inputData,
        env: commandEnv,
    });

    const output = result.stdout.trim();

    if (output === expectedData) {
        console.log("✅ Test Passed");
    } else {
        console.log("❌ Test Failed");
        console.log("Expected:", expectedData);
        console.log("Received:", output);
    }
    }
      return;
    }

    if (files.includes("main.py")) {
      console.log("Running Python...");
      const pythonCommand =
        (await isCommandAvailable("python"))
          ? "python"
          : (await isCommandAvailable("py"))
          ? "py"
          : null;

      if (!pythonCommand) {
        console.log("Python not found. Install Python and add it to PATH.");
        return;
      }

      await execa(pythonCommand, ["main.py"], { stdio: "inherit" });
      return;
    }

    if (files.includes("main.js")) {
      console.log("Running JavaScript...");
      await execa("node", ["main.js"], { stdio: "inherit" });
      return;
    }

    if (files.includes("Main.java")) {
      console.log("Running Java...");
      const hasJavac = await isCommandAvailable("javac");
      const hasJava = await isCommandAvailable("java");

      if (!hasJavac || !hasJava) {
        console.log("Java JDK not found. Install JDK and add java/javac to PATH.");
        return;
      }

      await execa("javac", ["Main.java"], { stdio: "inherit" });
      await execa("java", ["Main"], { stdio: "inherit" });
      return;
    }

    console.log("No supported language file found in this directory.");
  } catch (error) {
    console.log("Execution failed.");

    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}