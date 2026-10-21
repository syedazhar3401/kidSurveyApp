# Little Techies: Kid-Friendly Survey Web App 🤖🎈

An interactive, engaging, and child-friendly survey web application built for the **"Little Techies"** kindergarten community event at **Brainy Bunch Playschool** (in partnership with U.N.I. MART).

Designed specifically for 6-year-old children and group facilitators to capture feedback, measure learning outcomes, and collect data 100% offline.

---

## ✨ Features

- **Kid-Friendly Interface:**
  - Giant touch-friendly 3D buttons with vibrant colors and animations.
  - Huge emojis for intuitive understanding without requiring advanced reading skills.
  - Friendly animated robot mascot welcoming each child.
- **Tailored Survey Questions:**
  1. *"Do robots do what we tell them?"* (👍 Yes! / 👎 No! / 🤔 Not sure)
  2. *"Can a computer guess what you draw?"* (👍 Yes! / 👎 No! / 🤔 Not sure)
  3. *"Do you like learning about computers?"* (😃 Love it! / 😐 It's okay / 🙁 Not really)
  4. *"Which booth was your favourite?"* (🤖 Shape Robot / 🎨 Guess My Drawing / 🎤 Voice Changer / 🚦 Red Light Game)
- **Celebration Screen:**
  - Multi-stage confetti celebration upon completion.
  - Congratulates the child by name and reminds them to collect their passport sticker.
  - "Start Next Survey" quick reset button for facilitators.
- **Facilitator Reviews & Management Portal:**
  - **Review All Submissions:** Inspect all responses with timestamps, child names, and badge answers.
  - **Accidental Submission Deletion (🗑️):** Delete individual duplicate or accidental entries with one tap.
  - **Live Visual Analytics:** Real-time percentage bar charts for each question (ready for screenshots in report presentations).
  - **1-Click CSV Export:** Export clean data ready for Microsoft Excel or Google Sheets.
  - **100% Offline Safe:** Uses browser `localStorage`—no internet connection or server required on event day.

---

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS + custom playful animations & 3D button effects
- **Icons & Delight:** Lucide React + Canvas Confetti
- **Fonts:** Fredoka & Nunito (Google Fonts)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/syedazhar3401/kidSurveyApp.git
cd kidSurveyApp
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
```
The static production files will be in the `dist/` directory.

---

## 📄 License
MIT
