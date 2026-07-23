import { BatchReviewItem, AdminUser, DashboardMetric } from '../types';

export const INITIAL_METRICS: DashboardMetric = {
  totalReviews: 12450,
  positivePercentage: 85,
  neutralPercentage: 5,
  negativePercentage: 10,
  accuracy: 97.2,
  trendVsLastMonth: 12.5,
};

export const INITIAL_BATCH_REVIEWS: BatchReviewItem[] = [
  {
    id: 'REV-101',
    reviewerName: 'Aarav Patel',
    reviewText: 'The battery life is incredible, lasted all day during heavy usage on my Hyderabad business trip!',
    category: 'Hardware',
    date: '2026-07-22',
    sentiment: 'Positive',
    confidence: 98,
    keywords: ['Battery Life', 'Incredible', 'Business', 'Performance'],
    score: 0.92,
  },
  {
    id: 'REV-102',
    reviewerName: 'Priya Sharma',
    reviewText: 'UI is clunky and keeps crashing on login. Need a bug fix ASAP.',
    category: 'Software',
    date: '2026-07-22',
    sentiment: 'Negative',
    confidence: 92,
    keywords: ['Clunky UI', 'Crashing', 'Bug', 'Login'],
    score: -0.85,
  },
  {
    id: 'REV-103',
    reviewerName: 'Rohan Verma',
    reviewText: "It's okay, does what it says on the box. Nothing extraordinary.",
    category: 'General',
    date: '2026-07-21',
    sentiment: 'Neutral',
    confidence: 87,
    keywords: ['Okay', 'Standard', 'Average'],
    score: 0.05,
  },
  {
    id: 'REV-104',
    reviewerName: 'Deepa Kulkarni',
    reviewText: 'Support response was slow in Bengaluru, but the executive eventually fixed my subscription issue polite and helpful.',
    category: 'Customer Support',
    date: '2026-07-21',
    sentiment: 'Neutral',
    confidence: 76,
    keywords: ['Support', 'Slow', 'Polite', 'Fixed'],
    score: 0.15,
  },
  {
    id: 'REV-105',
    reviewerName: 'Vikram Malhotra',
    reviewText: 'Exceeded all my expectations! Delivery to Mumbai was within 24 hours and the packaging was top notch.',
    category: 'Delivery',
    date: '2026-07-20',
    sentiment: 'Positive',
    confidence: 96,
    keywords: ['Exceeded', 'Fast Delivery', 'Top Notch', 'Packaging'],
    score: 0.95,
  },
  {
    id: 'REV-106',
    reviewerName: 'Kavita Nair',
    reviewText: 'Extremely poor customer service. Was put on hold for 40 minutes and call disconnected.',
    category: 'Customer Support',
    date: '2026-07-20',
    sentiment: 'Negative',
    confidence: 94,
    keywords: ['Poor Service', 'Hold Time', 'Disconnected'],
    score: -0.91,
  },
  {
    id: 'REV-107',
    reviewerName: 'Aditya Verma',
    reviewText: 'Pricing is fair and feature set is quite decent for small businesses.',
    category: 'Pricing',
    date: '2026-07-19',
    sentiment: 'Positive',
    confidence: 89,
    keywords: ['Fair Pricing', 'Decent Features', 'Small Business'],
    score: 0.72,
  },
  {
    id: 'REV-108',
    reviewerName: 'Sneha Reddy',
    reviewText: 'Average build quality, average speed. Neither great nor terrible.',
    category: 'Product Quality',
    date: '2026-07-19',
    sentiment: 'Neutral',
    confidence: 84,
    keywords: ['Average', 'Build Quality', 'Neutral'],
    score: 0.0,
  }
];

export const INDIAN_ADMIN_USERS: AdminUser[] = [
  {
    id: 'USR-01',
    name: 'Ananya Rao',
    role: 'E-commerce Director, Luxe Retail',
    plan: 'Enterprise',
    lastActive: 'active 2m ago',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDeyQp4-u84pbX0vbm-KQi42EhO7HKeAC7v-yZRkzCWTiBGCMeiQM644JrRfeqgqPTJirvMjsVuIhTQmIMWKyRXND4vkT0yqrbUmkRsBciBGRSuQ747m7JZVL7pqVnJpTgzW5l61m69Nvbu6xwE3HjSU6oYInZ71txR8y13JqVio5YOlPy9vLHxzy-dxmDNEkzIjXQ7z6naMSKtKV58D-5yFwchv2UeAwwKd3AKGOSEQ2isLsNElgwwdg',
    initials: 'AR',
    email: 'ananya.rao@luxeretail.in',
    status: 'Active',
  },
  {
    id: 'USR-02',
    name: 'Rajesh Kumar',
    role: 'VP Customer Operations, TechTel',
    plan: 'Enterprise',
    lastActive: 'active 14m ago',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX5_n1iLBC4bilgwYj5dsDv3b4x3W-ckDeoPtMz6o6Sdek26RyrbyObdBOoGmiNqI0aXpVCBjomxE7gpQxaXLwH-Tt_1jrL3yhfJVBZK-zOtEJGTa99J_l9u-b-jVgjerpGkzwrwK6VTp7SGHKvE86CCSuGujEGVAri2JcKKtq819644Z3Om-nPdPr81WpI1B0iV4J-39X3VtIEJfo5CfjNsqrGxQj5fFvrMEqMySw5aqZJqFqIFbiVjuzXE8ov6ECZWKbGLisAdIq',
    initials: 'RK',
    email: 'rajesh.kumar@techtel.co.in',
    status: 'Active',
  },
  {
    id: 'USR-03',
    name: 'Priya Sharma',
    role: 'Product Analytics Lead, Swadeshi Digital',
    plan: 'Pro',
    lastActive: 'active 45m ago',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJyyIcc7MpJfP9Hti50ZqKP7b1KTV6QJj5rk47OS-NchEwM6lndLdQ6Jw-OMfqz1a34WhLD6HphWAj1jwTiWNNtLh-hAEVU56zNS8Lo66ApmJjFxDmG1cWOOKRZrwpjnXMfOC8e9eGDDDG6KfB9X4SBaXRdZbEJlumz4UM5PwLPZPwaLrhqTyGTBEGqaCXdlLKERw8Fp2LDnNIbBmp9lsfhCFSr5lYVBrzxiOtTDLXd_rt_5KOASWoX5qHve8ujrK0f_6JYJVb3o1X',
    initials: 'PS',
    email: 'priya.sharma@swadeshi.in',
    status: 'Active',
  },
  {
    id: 'USR-04',
    name: 'Deepa Kulkarni',
    role: 'Head of Quality Assurance, Deccan AI',
    plan: 'Pro',
    lastActive: 'active 2h ago',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQPlFKQyEn0Ha9m6pN8dfrQQtjc4041RbafyIrJLEPkIfS8R5bbmEWyGFygd91aaYMGld7xgUkvtMSW_w4558NJN7MF1Gt1EDjk7lfY9bPhSgtjw-fbR_qIrRG9LqobKFtq0I30SDoPsxas-GwNf-Xcibl-c7hYnB76gF3kL3pdQV0hAyY4h9RWYeQRXRvqZXE9qf5piFfJ94L5B2HdoJatHaCM5TyUqhpYjC5sBNkGPas144ZnsrXBNUT7hQwwWyEQy0tGiXdJQ5F',
    initials: 'DK',
    email: 'deepa.kulkarni@deccanai.com',
    status: 'Active',
  }
];

export const SAMPLE_CSV_CONTENT = `reviewerName,reviewText,category,date
Rajesh Patel,"The product delivery was incredibly fast in Hyderabad and quality exceeded my expectations!","Delivery","2026-07-23"
Sunita Rao,"Customer service team was polite but took 2 days to respond to my query.","Support","2026-07-22"
Karan Joshi,"The mobile app keeps crashing during payment checkout. Terrible experience!","Software","2026-07-22"
Meera Nair,"Standard build quality. Neither good nor bad, just average.","Product","2026-07-21"
Suresh Verma,"Outstanding performance! Highly recommended for all enterprise teams.","General","2026-07-20"
Divya Iyer,"Extremely slow loading time and confusing layout.","UX","2026-07-20"
`;
