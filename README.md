# ☁️ CloudHQ – CloudOps & Access Management Dashboard (Frontend-Only)

CloudHQ is a **frontend-only simulation dashboard** built using **HTML**, **CSS**, and **JavaScript**, designed for **CloudOps, DevOps, and IT security teams** to visualize and manage cloud access, provisioning, IAM roles, security hygiene, and compliance — all without a backend or live cloud data.

This dashboard provides an internal intranet-style UI that simulates what real access governance and security dashboards look like at scale, enabling teams to understand and educate around **access visibility**, **cloud hygiene**, and **policy tracking**.

---

## 🌐 Live Demo

🔗 [Try it here](https://cloudhq-demo.netlify.app/)

---

## 🧠 Overview

**CloudHQ** mimics a real-world cloud internal dashboard with:

- Simulated IAM access roles and permission matrix
- Cloud resource provisioning simulator
- Terminal-style audit logs
- Access request and approval workflow
- Security hygiene scoring system
- Compliance visibility panels
- Onboarding and learning resources for cloud users

It is designed as a **training tool**, **internal concept prototype**, or **educational reference** for cloud and DevOps enthusiasts.

---

## 🧩 Core Features

### 👥 IAM Role Matrix
- Table of users, roles, access levels, and assigned cloud providers
- Badges for risky permissions (e.g., `Admin`, `Root`)
- Search and filter by team, cloud provider, access level

### 🔐 Access Request System
- UI for requesting cloud access with duration, level, and reason
- Approver simulation: Accept or reject with fake statuses
- Tracks pending, active, and expired requests

### 📜 Audit Log Viewer
- Real-time simulated logs using JavaScript
- Logs include IAM usage, elevated access, resource deletions
- Terminal-like appearance with colored log types

### 🛠️ Resource Provisioning Simulator
- Provision fake EC2, S3, RDS, Cloud Functions, etc.
- Select cloud provider, region, size, and team
- Visual cards show provisioned items with delete simulation

### 📅 IAM Policy Expiry Calendar
- Track when access keys or policies are expiring
- Hover over a date to see user and policy info
- Reminder visuals for key rotation and audits

### 📊 Cloud Hygiene Scoreboard
- Simulated score based on best practices:
  - Public buckets
  - Long-lived credentials
  - Unused IAM roles
  - Root activity
- Health indicators (🟢 / 🟡 / 🔴)

### ✅ Compliance Status Panel
- View mock compliance alignment:
  - GDPR, HIPAA, ISO 27001, SOC 2
- Tags indicate "Compliant", "Needs Review", or "Non-Compliant"

### 📚 Learning & Knowledge Hub
- Cards linking to:
  - Internal runbooks
  - Cloud documentation
  - CLI commands and cheatsheets
  - Security best practices

### ⚡ Quick Actions Bar
- Buttons to simulate:
  - Rotate keys
  - Revoke unused access
  - Trigger audit scan
- JS-based status pop-ups

---

## 🖼️ UI Highlights

- Dashboard-style layout with responsive grid/flex cards
- Dark and light mode themes
- Clean and accessible design with cloud-native color palette
- Mobile-friendly and lightweight

---
## 🚀 Tech Stack

- **HTML5** – Semantically structured sections
- **CSS3** – CSS variables, grid/flex layout, dark mode
- **Vanilla JavaScript** – DOM manipulation, intervals, data simulation
- **Chart.js (optional)** – For compliance or resource usage graphs

No frameworks, libraries, or backend involved.

---

## 📌 Use Cases

- Educational dashboards for DevOps & Cloud engineers
- Internal mockup for IAM governance tooling
- Cloud training simulations or security hygiene demos
- UX prototyping for IT governance teams

---

## 👨‍💻 Author

**Prashant Gohel**  
Cloud & DevOps Enthusiast | Frontend Developer  
📧 [LinkedIn](www.linkedin.com/in/prashantgohel1706)  | [Portfolio](https://prashant-gohel-portfolio.netlify.app/)

---

## 📜 License

This project is open-sourced under the [MIT License](LICENSE).

---

## 🙌 Contributions

If you'd like to suggest new sections (e.g., cost tracking, multi-account view, policy diff checker), feel free to fork, enhance, and submit a pull request!

---