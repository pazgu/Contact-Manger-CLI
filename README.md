# 📇 Robust Contact Manager CLI

A production-ready, command-line interface (CLI) application for managing contacts, designed with a strong emphasis on architectural clean code, error recovery, and comprehensive testing.

## ✨ Key Features
- **Strict MVC Architecture:** Complete separation of concerns (CLI View -> Command Controller -> Contact Service Model).
- **High-Performance Async I/O:** Utilizes Node.js `fs/promises` for non-blocking file operations.
- **Resilient Error Recovery:** Gracefully handles corrupted JSON files, missing data, and file-system failures.
- **Input Validation:** Bulletproof validation layers catching improper formats before hitting the data tier.

## 🧪 Testing & Quality Assurance
- **Framework:** Jest
- **Methodology:** Unit Testing with extensive Mocking of the File System to isolate business logic.
- **Code Coverage:** ~90% coverage across statements, branches, and functions.

## 🛠️ Tech Stack
- Node.js (CommonJS)
- Jest (Testing & Coverage)
- JSON (Data Persistence)

## 🚀 How to Run
1. Clone the repo: `git clone https://github.com/pazgu/contact-manger.git`
2. Install dependencies: `npm install`
3. View available commands: `node contacts.js help`
4. Run tests with coverage: `npm test -- --coverage`
