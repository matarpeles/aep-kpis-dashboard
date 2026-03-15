// Google Sheets Configuration
// Replace this URL with your published Google Sheets CSV URL
// To get this URL:
// 1. Open your Google Sheet
// 2. Go to File > Share > Publish to web
// 3. Select the sheet tab and choose "Comma-separated values (.csv)"
// 4. Click Publish and copy the URL

export const GOOGLE_SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL || '';

// Refresh interval in milliseconds (5 minutes = 300000ms)
export const REFRESH_INTERVAL = 5 * 60 * 1000;

// H1 End Date (June 30, 2026)
export const H1_END_DATE = new Date('2026-06-30T23:59:59');

// Category order (funnel order: Marketing → Pre-Sales → Post-Sales)
export const CATEGORY_ORDER = [
  'Marketing & Demand',
  'Pre-Sales',
  'Customer Success'
];

// Default KPI data structure (used as fallback when no Google Sheets URL)
export const DEFAULT_DATA = {
  kpis: [
    // Marketing & Demand (top of funnel)
    {
      id: 'interest_first_call',
      category: 'Marketing & Demand',
      name: 'Interest on First Call for Agentic',
      current: 65,
      target: 100,
      unit: '%',
      status: 'green',
      source: 'HubSpot via n8n',
      comment: 'Strong interest from enterprise segment'
    },
    {
      id: 'word_of_mouth',
      category: 'Marketing & Demand',
      name: 'Word-of-mouth Mentions as AEP',
      current: 8,
      target: 20,
      status: 'green',
      source: 'Manual tracking',
      comment: 'LinkedIn mentions increasing'
    },
    // Pre-Sales (middle of funnel)
    {
      id: 'pocs_with_agentic',
      category: 'Pre-Sales',
      name: '# of POCs with Agentic Workflows',
      current: 4,
      target: 10,
      status: 'yellow',
      source: 'Manual tracking',
      comment: 'Focus on Booksy and OutSystems this week'
    },
    {
      id: 'pocs_q2',
      category: 'Pre-Sales',
      name: '# of POCs in Q2',
      current: 12,
      target: 30,
      status: 'yellow',
      source: 'HubSpot',
      comment: 'Pipeline looking strong for April'
    },
    // Customer Success / Post-Sales (bottom of funnel)
    {
      id: 'customers_agentic',
      category: 'Customer Success',
      name: 'Customers with Agentic Workflow',
      current: 3,
      target: 8,
      status: 'yellow',
      source: 'Manual tracking',
      comment: 'StoneX and PwC in progress'
    }
  ],
  lastUpdated: new Date().toISOString()
};
