This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Start
# 📊 ADmyBRAND Insights Dashboard

A modern, responsive, and real-time analytics dashboard for digital marketing agencies. Built with **Next.js 14 (App Router)**, **TypeScript**, and **shadcn/ui**.

---

## ✨ Features

| Category         | Description |
|------------------|-------------|
| 📈 Analytics UI   | Overview cards, interactive charts (line, bar, pie), and exportable tables |
| 🌓 Theming        | Dark/Light mode toggle using `Switch` component |
| 📱 Responsive     | Mobile-first design, fully responsive |
| 🔄 Real-time Data | Simulated chart updates every 3s using `setInterval()` |
| 📤 Export Options | Export table to **PDF** (via jsPDF) or **CSV** (via react-csv) |
| 📅 Date Filters   | Advanced filtering with `<DatePicker />` for start and end date |
| 🧱 Reusable Components | Cards, ChartBlock, StatCard, DataTable |
| 💀 Skeletons      | Beautiful loading states while fetching data |

---

## 🧩 Component Architecture

| Component         | Role |
|-------------------|------|
| `ClientOnly`      | Prevents hydration mismatch between SSR and client rendering |
| `ChartBlock`      | Unified chart component (pie, bar, line) using `recharts` |
| `StatCard`        | Compact KPI cards with loading skeleton support |
| `DataTable`       | Paginated, sortable table with export (CSV/PDF) |
| `DatePicker`      | Custom calendar picker using `react-day-picker` |
| `Calendar`        | Tailwind-styled wrapper for `react-day-picker` |
| `Skeleton`        | Used across cards, charts, and tables for placeholder loading |

---

## 📦 Tech Stack

- [Next.js 14+ (App Router)](https://nextjs.org/docs)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [jsPDF](https://github.com/parallax/jsPDF) & `jspdf-autotable`
- [react-csv](https://github.com/react-csv/react-csv)
- [react-day-picker](https://react-day-picker.js.org/)

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/admybrand-dashboard.git
cd admybrand-dashboard
npm install
npm run dev
```
---

## 🌐 Deployment
This project is optimized for deployment on Vercel.

To deploy:
```bash
# First push to GitHub:
git push origin main

# Then connect your repo to Vercel and deploy!
```
---

## 📂 Project Structure
|Pages                   |Folders
|------------------------|-----------------|
|/app/page.tsx           |# Dashboard entry|
|/components/dashboard/  |# Reusable dashboard components|
|/components/ui/         |# Shadcn UI components (button, table, skeleton...)|
|/components/common/     |# ClientOnly wrapper|

---

## 📸 Preview
https://admybrand-dashboard-six.vercel.app/

---

## 🛡 License

MIT © 2025 Nejamul Haque
