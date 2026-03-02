# 🚀 Local-DSA

Solve Data Structures & Algorithms problems offline — anytime, anywhere.

Local-DSA is a CLI tool that allows developers to download coding problems from platforms like LeetCode and solve them offline without requiring an internet connection for compilation and testing.

Perfect for travel, poor network areas, or distraction-free coding.

---

## 📌 Problem Statement

When solving DSA problems on platforms like:

- LeetCode  

You need a stable internet connection to:

- Write code  
- Compile  
- Run test cases  
- Submit solutions  

But what if:

- You're traveling by train or flight?  
- Your internet is unstable?  
- You want a distraction-free environment?  

Local-DSA solves this problem.

---

## ✨ Features

- 📥 Download problem using problem link  
- 🗂 Auto-generate project structure  
- 🧪 Create test case files automatically  
- 💻 Support for multiple languages (C++, Java, Python)  
- ⚡ Local compilation & execution  
- 🌐 No internet required after download  

---

## 🛠 Tech Stack

- Node.js (CLI)  
- File System (fs module)  
- Child Process (for compiling & running code)  
- Possibly Puppeteer / Scraper (future scope)  

---

## 📂 Project Structure

After running:

ldsa fetch <problem-link>

It generates:

Two-Sum/
│
├── main.cpp
├── input.txt
├── output.txt
└── problem.md

---

## 🚀 Installation

### Clone the repository

git clone https://github.com/lovelish-xd/local-dsa.git  
cd local-dsa  

### Install dependencies

npm install  

### Link globally (for CLI usage)

npm link  

Now you can run:

ldsa --help  

---

## 🧑‍💻 Usage

### 1️⃣ Initialize a problem

ldsa fetch <problem-link>   

### 2️⃣ Run solution

ldsa run  

### 3️⃣ Add custom test cases

Edit testcases.txt and run:

local-dsa test  

---

## 🧠 How It Works

1. Fetches problem metadata from the given link  
2. Creates a structured local folder  
3. Generates language-specific boilerplate  
4. Compiles and runs locally  
5. Validates output with provided test cases  

---

## 🎯 Vision

Local-DSA aims to become:

- The VS Code of offline DSA solving  
- A productivity tool for serious developers  
- A CLI companion for coding interview preparation  

Future plans:

- Offline question bank  
- Custom question importer  
- VS Code extension  
- AI-based solution hints (offline model)  

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo  
2. Create a new branch  
3. Make your changes  
4. Submit a PR  

---

## 📜 License

MIT License

---

⭐ If you like this project, consider giving it a star!
