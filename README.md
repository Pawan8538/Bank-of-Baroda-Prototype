# Bank of Baroda: Identity Trust Platform 

**Live Demo:** [https://pawan8538.github.io/Bank-of-Baroda-Prototype/](https://pawan8538.github.io/Bank-of-Baroda-Prototype/)

## About the Project
Traditional security relies heavily on passwords and OTPs, which are vulnerable to phishing and SIM swapping. The **Identity Trust Platform** is a next-generation, AI-driven security architecture designed for the Bank of Baroda. 

Instead of blocking users outright, it continuously analyzes device, behavioral, and biometric signals in the background to generate a dynamic **Trust Score**. If an attacker attempts to hijack an account, the system instantly detects the anomalies and seamlessly routes the attacker into a **Shadow Honeypot**—securing the real funds while gathering threat intelligence, completely invisible to the hacker.

## Core Features
- **Real-Time Signal Collection:** Analyzes Device Fingerprinting, Geo-Velocity (Impossible Travel), Behavioral Biometrics, and Telecom SIM Integrity.
- **ICE Engine (Explainable AI):** Evaluates risk in under 50ms, producing a transparent Trust Score that determines the authentication path.
- **Shadow Honeypot Routing:** Silently isolates attackers in a simulated banking environment instead of alerting them with a block screen.
- **Automated Fraud Ops Center:** Provides security teams with a unified incident timeline, instant session revocation, and forensic tracking.

## How to Use It (Local Setup)
If you want to run the prototype locally for testing or development:

1. Clone the repository and navigate into the folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

 
