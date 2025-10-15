# 📊 Real-Time Server Performance Dashboard

A student-friendly demo project showing **Real-Time Server Monitoring** with **Chart.js** using **MVC Architecture**.

## 🎯 What This Project Does

This dashboard displays **server performance metrics** (CPU, Memory, Disk, Network, Active Users) with beautiful real-time visualizations using Chart.js!

## 🏗️ MVC Architecture Explained (معمارية MVC)

### **Model** (Data Layer - طبقة البيانات)
- **Files:** Simulated data generation in chart components
- **Job:** Generates server metrics (CPU, RAM, Disk, Network, Users)
- **In Real App:** Would connect to actual server monitoring APIs (like Prometheus, Grafana, or system APIs)

### **View** (Presentation Layer - طبقة العرض)
- **Files:** `components/server/*.tsx`
- **Job:** Displays the UI - metric cards and charts
- **Uses:** Chart.js for beautiful visualizations

### **Controller** (Logic Layer - طبقة المنطق)
- **File:** `components/server-dashboard.tsx`
- **Job:** Orchestrates all components and manages real-time updates
- **How:** Combines all views and simulates real-time data updates every 3 seconds

## 🚀 Technologies Used

1. **Next.js 15** - React framework for building the app
2. **Chart.js 4.4** - JavaScript library for creating charts
3. **TypeScript** - Type-safe JavaScript
4. **Tailwind CSS v4** - Modern styling framework
5. **Lucide React** - Beautiful icons

## 📦 How to Run

### Option 1: Using v0 (Easiest!)
1. Click the **"Publish"** button in the top right
2. Your app will be deployed to Vercel automatically!

### Option 2: Download and Run Locally
1. Click the three dots (⋯) → "Download ZIP"
2. Extract the files
3. Open terminal in the folder
4. Run these commands:
\`\`\`bash
npm install
npm run dev
\`\`\`
5. Open http://localhost:3000 in your browser

### Option 3: Push to GitHub
1. Click the GitHub logo button in the top right
2. Connect your GitHub account
3. The code will be pushed to a new repository

## 🎓 How It Works (Simple Explanation)

1. **Model (Data)** simulates server metrics with random values in realistic ranges
2. **View (Components)** render different chart types using Chart.js
3. **Controller (Dashboard)** combines all components and updates them every 3 seconds
4. **Chart.js** transforms data into beautiful, interactive, real-time visualizations

## 📊 Server Metrics Explained (شرح المقاييس)

| Metric | Description (الوصف) | Chart Type | Color |
|--------|---------------------|------------|-------|
| **CPU Usage** | نسبة استهلاك البروسيسور (Processor utilization) | Line Chart | Cyan |
| **Memory (RAM)** | قد إيه الـ server بيستهلك من الـ RAM | Line/Area Chart | Purple |
| **Disk Usage** | المساحة المستخدمة في الـ storage | Doughnut Chart | Pink |
| **Network Traffic** | كمية الـ data اللي داخلة وخارجة من السيرفر | Line Chart (2 lines) | Green/Orange |
| **Active Users** | عدد المستخدمين اللي شغالين دلوقتي | Bar Chart | Blue |

## 🎨 Dashboard Features

### 1. **Metric Overview Cards** (6 cards at top)
- Real-time current values
- Color-coded status indicators:
  - 🟢 Green: Normal (< 70% threshold)
  - 🟡 Yellow: Warning (70-80%)
  - 🔴 Red: Critical (> 80%)
- Icons for each metric type

### 2. **CPU Usage Chart** (Line Chart)
- Shows processor utilization over time
- Updates every 3 seconds
- Cyan line with gradient fill
- Range: 30-70%

### 3. **Memory Usage Chart** (Area Chart)
- Shows RAM consumption over time
- Purple line with gradient fill
- Updates every 3 seconds
- Range: 50-80%

### 4. **Disk Storage Chart** (Doughnut Chart)
- Shows used vs free space
- Pink for used, gray for free
- Updates every 5 seconds
- Range: 65-85% used

### 5. **Network Traffic Chart** (Multi-Line Chart)
- Two lines: Incoming (green) and Outgoing (orange)
- Shows data transfer in MB/s
- Updates every 3 seconds
- Legend shows both metrics

### 6. **Active Users Chart** (Bar Chart)
- Shows concurrent users on server
- Blue bars with rounded corners
- Updates every 3 seconds
- Range: 250-450 users

## 🎨 Design Features

- **Dark Navy Theme** (#0a1628 background)
- **Professional Cards** (#0f1f3a with subtle borders)
- **Color-Coded Metrics:**
  - Cyan (#06b6d4) - CPU
  - Purple (#a855f7) - Memory
  - Pink (#ec4899) - Disk
  - Green (#22c55e) - Network In
  - Orange (#f97316) - Network Out
  - Blue (#3b82f6) - Users
- **Smooth Animations** with Chart.js
- **Responsive Layout** works on all devices

## 📝 For Your Presentation (للبريزنتيشن)

### Key Points to Mention:

1. **What is Real-Time Monitoring?**
   - Continuous tracking of server health
   - Instant alerts when problems occur
   - Helps prevent downtime
   - Used by DevOps teams worldwide

2. **Why Chart.js?**
   - Popular JavaScript charting library (3M+ downloads/week)
   - Supports 8+ chart types
   - Responsive and animated
   - Easy to customize
   - Free and open-source

3. **Why MVC Architecture?**
   - **Separation of Concerns:** Data, logic, and display are separate
   - **Maintainability:** Easy to update one part without breaking others
   - **Scalability:** Can add new metrics easily
   - **Industry Standard:** Used in professional applications

4. **Chart Types Used:**
   - **Line Chart:** Shows trends over time (CPU, Memory, Network)
   - **Doughnut Chart:** Shows proportions (Disk usage)
   - **Bar Chart:** Shows discrete values (Active users)

5. **Real-World Uses:**
   - AWS CloudWatch dashboards
   - Google Cloud Monitoring
   - Azure Monitor
   - Datadog, New Relic, Grafana
   - DevOps monitoring tools

## 🔧 Project Structure

\`\`\`
├── app/
│   ├── page.tsx                    # Main entry point
│   ├── layout.tsx                  # App layout
│   └── globals.css                 # Global styles with dark theme
├── components/
│   ├── server-dashboard.tsx        # Controller component (MVC)
│   └── server/
│       ├── cpu-chart.tsx           # CPU line chart (View)
│       ├── memory-chart.tsx        # Memory area chart (View)
│       ├── disk-chart.tsx          # Disk doughnut chart (View)
│       ├── network-chart.tsx       # Network multi-line chart (View)
│       └── active-users-chart.tsx  # Users bar chart (View)
└── README.md                       # This file
\`\`\`

## 💡 Code Highlights

### Creating a Real-Time Line Chart:
\`\`\`typescript
// Initialize chart
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: timeLabels,
    datasets: [{
      label: 'CPU Usage (%)',
      data: cpuData,
      borderColor: 'rgb(6, 182, 212)', // cyan
      tension: 0.4
    }]
  }
})

// Update every 3 seconds
setInterval(() => {
  chart.data.labels.push(newTime)
  chart.data.datasets[0].data.push(newValue)
  chart.update('none') // Smooth update
}, 3000)
\`\`\`

### MVC Pattern in Action:
- **Model:** Data simulation functions (Math.random() with realistic ranges)
- **View:** 5 separate chart components (cpu-chart.tsx, memory-chart.tsx, etc.)
- **Controller:** server-dashboard.tsx orchestrating everything

## 🎯 Learning Objectives

After studying this project, you should understand:

1. ✅ How to integrate Chart.js with React/Next.js
2. ✅ How to implement MVC architecture in a web app
3. ✅ How to create real-time updating charts
4. ✅ How to use different chart types (line, bar, doughnut)
5. ✅ How to simulate server metrics for demos
6. ✅ How to style a professional monitoring dashboard
7. ✅ How to use TypeScript with React
8. ✅ How to structure a modern web application

## 🔧 Customization Ideas

Want to extend this project? Try:

- **Add Real Data:** Connect to actual server APIs (Node.js `os` module)
- **More Metrics:** Add response time, error rates, request counts
- **Alerts:** Add notifications when metrics exceed thresholds
- **Historical Data:** Store metrics in a database (PostgreSQL/MongoDB)
- **Export:** Add CSV/PDF export functionality
- **Comparison:** Compare multiple servers side-by-side
- **Authentication:** Add user login for different access levels
- **WebSockets:** Use Socket.io for true real-time updates

## 📚 Learn More

- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MVC Pattern Explained](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
- [Server Monitoring Best Practices](https://www.datadoghq.com/knowledge-center/server-monitoring/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 👨‍🎓 Student Notes

This project demonstrates:
- ✅ Chart.js integration with React
- ✅ MVC architectural pattern
- ✅ Real-time data updates
- ✅ Multiple chart types (line, bar, doughnut)
- ✅ Professional dashboard design
- ✅ TypeScript and modern React
- ✅ Responsive layout with Tailwind CSS
- ✅ Server performance monitoring concepts

Perfect for understanding how professional monitoring dashboards work!

## 🎤 Presentation Tips (نصائح للبريزنتيشن)

1. **Start with a demo:** Show the live dashboard first - watch the charts update in real-time!
2. **Explain the problem:** Why do we need server monitoring?
3. **Show MVC:** Draw a diagram showing Model → Controller → View
4. **Walk through code:** Pick one chart component and explain it line by line
5. **Discuss Chart.js:** Show the Chart.js website and its popularity
6. **Real-world examples:** Show screenshots of AWS CloudWatch, Grafana, Datadog
7. **Live coding (optional):** Change a color or add a new metric live
8. **Q&A:** Be ready to explain:
   - How to add a new metric
   - How to connect to real server data
   - Why we chose each chart type
   - How the real-time updates work

## 🎓 PowerPoint Slide Suggestions

1. **Title Slide:** "Real-Time Server Monitoring Dashboard"
2. **Problem Statement:** Why monitor servers?
3. **Technologies:** Next.js + Chart.js + TypeScript
4. **MVC Architecture:** Diagram with Model/View/Controller
5. **Demo:** Live dashboard or video recording
6. **Code Walkthrough:** Show one chart component
7. **Chart Types:** Explain each chart and why we chose it
8. **Real-World Applications:** AWS, Google Cloud, Azure
9. **Challenges & Solutions:** What problems did you solve?
10. **Future Improvements:** What would you add next?
11. **Conclusion:** What you learned
12. **Q&A:** Questions slide

## 📊 Metrics Ranges (for reference)

- **CPU Usage:** 30-70% (simulated)
- **Memory Usage:** 50-80% (simulated)
- **Disk Usage:** 65-85% (simulated)
- **Network In:** 80-180 MB/s (simulated)
- **Network Out:** 50-130 MB/s (simulated)
- **Active Users:** 250-450 users (simulated)

These ranges are realistic for a medium-sized web server!

---

**Made with ❤️ for Web Engineering Students**

**Good luck with your presentation! 🎉**
