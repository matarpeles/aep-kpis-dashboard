# AEP KPIs Dashboard

A clean, TV-optimized dashboard for displaying Agentic Engineering Platform KPIs at Port.io.

![Port.io](https://port.io)

## Features

- 📺 **TV-optimized display** - Large fonts, high contrast, readable from 3+ meters
- 🔄 **Auto-refresh** - Updates every 5 minutes from Google Sheets
- 📊 **Real-time KPIs** - Progress bars with color-coded status indicators
- 🏢 **Account tracking** - Pre-sales and post-sales account lists
- 🖥️ **Fullscreen mode** - Press `F` for kiosk mode
- 🎨 **Port.io branding** - Clean, professional design matching brand guidelines

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Google Sheets (optional)

Create a Google Sheet with the structure below, then:

1. Go to **File > Share > Publish to web**
2. Select your sheet tab and choose **Comma-separated values (.csv)**
3. Click **Publish** and copy the URL
4. Create a `.env` file:

```bash
VITE_GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/pub?gid=0&single=true&output=csv
```

> **Note:** Without a Google Sheets URL, the dashboard runs in demo mode with sample data.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Google Sheets Template

Create a Google Sheet with this exact structure:

```
| A                        | B                                      | C       | D      | E      | F                  |
|--------------------------|----------------------------------------|---------|--------|--------|--------------------|
| KPIs                     |                                        |         |        |        |                    |
| Category                 | Name                                   | Current | Target | Status | Source             |
| Pre-Sales                | # of POCs with Agentic Workflows       | 4       | 10     | yellow | Manual tracking    |
| Pre-Sales                | # of POCs in Q2                        | 12      | 30     | yellow | HubSpot            |
| Customer Success         | Customers with Agentic Workflow        | 3       | 8      | yellow | Manual tracking    |
| Marketing & Demand       | Interest on First Call for Agentic     | 65      | 100    | green  | HubSpot via n8n    |
| Marketing & Demand       | Word-of-mouth Mentions as AEP          | 8       |        | green  | Manual tracking    |
|                          |                                        |         |        |        |                    |
| Workstreams              |                                        |         |        |        |                    |
| Name                     | Description                            | Progress| Status |        |                    |
| Live Demo                | Building compelling agentic demo       | 75      | green  |        |                    |
| POCs                     | Getting agentic workflows into POCs    | 40      | yellow |        |                    |
| Customer Expansion       | Expanding with existing customers      | 38      | yellow |        |                    |
| Demand Gen               | Marketing and pipeline generation      | 60      | green  |        |                    |
|                          |                                        |         |        |        |                    |
| Pre-Sales Accounts       |                                        |         |        |        |                    |
| Account                  |                                        |         |        |        |                    |
| Booksy                   |                                        |         |        |        |                    |
| OutSystems               |                                        |         |        |        |                    |
| DKV Mobility             |                                        |         |        |        |                    |
| 1Password                |                                        |         |        |        |                    |
| Wayve                    |                                        |         |        |        |                    |
| Applied Systems          |                                        |         |        |        |                    |
| Davivienda               |                                        |         |        |        |                    |
| Guardant Health          |                                        |         |        |        |                    |
| Gelato                   |                                        |         |        |        |                    |
| Tekion                   |                                        |         |        |        |                    |
| Deutsche Bank            |                                        |         |        |        |                    |
| Apple                    |                                        |         |        |        |                    |
| Capital One              |                                        |         |        |        |                    |
| MSCI                     |                                        |         |        |        |                    |
|                          |                                        |         |        |        |                    |
| Post-Sales Accounts      |                                        |         |        |        |                    |
| Account                  |                                        |         |        |        |                    |
| StoneX                   |                                        |         |        |        |                    |
| Credit Acceptance        |                                        |         |        |        |                    |
| Thomson Reuters          |                                        |         |        |        |                    |
| Sportradar               |                                        |         |        |        |                    |
| PwC                      |                                        |         |        |        |                    |
| ATPCO                    |                                        |         |        |        |                    |
| Mark Anthony             |                                        |         |        |        |                    |
| DLocal                   |                                        |         |        |        |                    |
```

### Status Values

Use these values in the Status column:
- `green` - On track / High interest
- `yellow` - In progress / Medium
- `red` - Behind / Low

### Column Definitions

**KPIs Section:**
| Column | Description |
|--------|-------------|
| Category | Group name (Pre-Sales, Customer Success, Marketing & Demand) |
| Name | KPI description |
| Current | Current value (number) |
| Target | Target value (number, leave empty if no target) |
| Status | green, yellow, or red |
| Source | Data source (HubSpot, Manual tracking, etc.) |

**Workstreams Section:**
| Column | Description |
|--------|-------------|
| Name | Workstream name |
| Description | Brief description |
| Progress | Percentage complete (0-100) |
| Status | green, yellow, or red |

**Account Sections:**
| Column | Description |
|--------|-------------|
| Account | Company name |

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `F` | Toggle fullscreen mode |
| `R` | Manual refresh |

## Deploy to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push to GitHub
2. Import project at [vercel.com/new](https://vercel.com/new)
3. Add environment variable:
   - Name: `VITE_GOOGLE_SHEETS_URL`
   - Value: Your published Google Sheets CSV URL

### Option 3: One-click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/aep-kpis-dashboard)

## TV Setup

1. Deploy to Vercel
2. Open the dashboard URL on your TV browser
3. Press `F` to enter fullscreen mode
4. The dashboard auto-refreshes every 5 minutes

### Recommended TV Settings

- Resolution: 1920x1080 or higher
- Browser: Chrome in kiosk mode
- Auto-start on boot (optional)

## Tech Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **PapaParse** - CSV parsing
- **Framer Motion** - Animations
- **Vercel** - Hosting

## Project Structure

```
aep-kpis-dashboard/
├── public/
│   └── port-favicon.svg
├── src/
│   ├── components/
│   │   ├── AccountPill.jsx
│   │   ├── KPICard.jsx
│   │   ├── PortLogo.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── StatusIndicator.jsx
│   │   └── WorkstreamCard.jsx
│   ├── hooks/
│   │   └── useSheetData.js
│   ├── App.jsx
│   ├── config.js
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

## Customization

### Change refresh interval

Edit `src/config.js`:

```javascript
export const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
```

### Modify colors

Edit `tailwind.config.js` to update the color palette.

### Add new KPI categories

Simply add new rows in your Google Sheet with a new category name.

## License

MIT
