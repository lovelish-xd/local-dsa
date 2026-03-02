import fs from "fs-extra";
import path from "path";
import prompts from "prompts";

function extractSlug(url: string): string {
  const parts = url.split("/");
  return parts.filter(Boolean).pop() || "problem";
}

export async function handleFetch(url: string) {
  const slug = extractSlug(url);
  const workspacePath = path.join(process.cwd(), slug);
  const templateMap: Record<string, string> = {
    cpp: "main.cpp",
    java: "Main.java",
    py: "main.py",
    js: "main.js",
  };

  // Ask language
  const response = await prompts({
    type: "select",
    name: "language",
    message: "Choose language",
    choices: [
      { title: "C++", value: "cpp" },
      { title: "Java", value: "java" },
      { title: "Python", value: "py" },
      { title: "JavaScript", value: "js" },
    ],
  });

  if (!response.language) {
    console.log("Language selection cancelled.");
    return;
  }

  await fs.ensureDir(workspacePath);

  // Create problem.md
  await fs.writeFile(
    path.join(workspacePath, "problem.md"),
    `# ${slug}\n\nProblem description will go here.`
  );

  // Copy selected template file
  const templateFileName = templateMap[response.language];
  const templatePath = path.join(process.cwd(), "templates", templateFileName);

  if (!(await fs.pathExists(templatePath))) {
    console.error("Template not found:", templatePath);
    return;
  }

  await fs.copyFile(templatePath, path.join(workspacePath, templateFileName));
    
  // Create test files
  await fs.writeFile(
  path.join(workspacePath, "input.txt"),
  ""
  );

  await fs.writeFile(
  path.join(workspacePath, "output.txt"),
  ""
  );

  console.log("Workspace created at:", workspacePath);
}