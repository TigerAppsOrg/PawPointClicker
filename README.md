# 🐾 Paw Point Clicker

Welcome to **Paw Point Clicker** – a fun, incremental clicker game where you gain "Paw Points", level up, and unlock exciting upgrades and collectibles. Immerse yourself in a world of adorable Princeton iconography while you grow your digital empire!

---

## Table of Contents

- [Features](#features)
- [Gameplay](#gameplay)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Incremental Progression:**  
  Accumulate Paw Points by clicking and letting Paw Point **Collectors** - Proxes, Scanners, Deliveries, etc. - do the heavy lifting.

- **Prestige System:**  
  Take your prox to the next level by resetting, or "prestiging," your progress to gain bonus multipliers and unlock new content 🏆.

- **Real-Time Save:**  
  Your game progress is automatically saved every 5 seconds to prevent data loss—an essential feature for the unstoppable Prox 📥.

- **Visually Engaging Interface:**  
  Enjoy a playful interface with paw-themed icons, progress indicators, and a modern responsive design 🐾🎨.

  - **Advanced Data Migration:**  
    PawPointClicker has changed a lot since Day 1. Don't worry--PawPointClicker is completely backwards compatible, with seamless migration of guest data to your account on login, ensuring your progress is safe across devices and sessions 🔄.

---

## Gameplay

In **Paw Point Clicker**, you start as a guest, clicking to earn points and progress. When you decide to sign up or log in, your guest progress is seamlessly imported into your account (if no progress already exists), so you never lose your paw-some achievements! The game features passive income generators like **LateMeal**, **Scanner**, and more—each symbolized with custom Princeton-based backgrounds.

### How to Play

1. **Click Your Way to Victory:**  
   Earn points by clicking on the main area. Watch your Paw Points pile up!
2. **Upgrade Collectors:**  
   Invest your points in collectors (LateMeal, Scanner, etc.) to generate passive income.
3. **Prestige and Power Up:**  
   Reach new thresholds to prestige, resetting your progress but multiplying your earning potential.
4. **Compete with Others:**  
   You're not alone! Your prox is matched up against others in a global leaderboard. See who's earned the most paw points!

---

## Installation

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **yarn**

### Clone and Install

```bash
git clone https://github.com/yourusername/paw-point-clicker.git
cd paw-point-clicker
npm install
```

### Running the App

Start your development server:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to start clicking!

---

## Usage

- **Guest Mode:**  
  Upon opening the app, your progress is tracked as a guest. All data is stored under `guest_` keys until you log in.

- **User Mode:**  
  Once logged in, if no previous account data exists, your guest progress is moved to your new account. Subsequent logins will load your previously saved user data.

- **Automatic Save:**  
  The system saves your game data every 5 seconds, ensuring your progress is always up-to-date.

---

## Development

### Code Structure

- **Components:**  
  Organized components include the toolbar, modal windows (Welcome, Achievements, Leaderboard, FAQ), and the main game interface (ProxMenu, PowerUpMenu).

- **State Management:**  
  The app leverages React hooks for state management and `useLocalStorage` for persisting progress across sessions.

- **Data Migration:**  
  The migration system ensures a smooth transition from guest data to user data with minimal disruption.

### Contributing

We welcome contributions from the community. To get started, please fork the repository and submit a pull request with your improvements.

---

## License

This project is licensed under the MIT License.

---

## Contact

For any questions or feedback, feel free to [create an issue](https://github.com/yourusername/paw-point-clicker/issues) or email the maintainer at **your-email@example.com**.

---

Embrace the paw-sitive spirit of incremental gains in **Paw Point Clicker** and have a blast building your paw-some empire! 🐾

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
