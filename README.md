# Way-To-Do Mobile Prototype

> High-fidelity investor demo for an AI-powered workspace with collaborative approvals and instant stablecoin settlement.

## 🚀 Quick Start

**Run the demo:**
1. Open the application in Figma Make
2. The prototype starts on the Welcome screen
3. Follow the golden path (see below)

**Golden Path (90 seconds):**
1. Tap "Get Started"
2. Enter any email → "Continue"
3. Navigate to Tasks tab
4. Tap "New task"
5. Fill form → "Create & start AI research"
6. Scroll and tap "Approve"
7. Tap "Execute purchase"
8. View wallet → See transaction

## 📱 Features

### ✅ Implemented
- **AI Research**: Multi-LLM routing across 3 models with combined recommendations
- **Approvals**: Team-based approval workflow with audit trail
- **Settlement**: x402 stablecoin payments (~2 seconds, near-zero fees)
- **Community**: Discord-style governance with decision history
- **Wallet**: USDC on BASE with real-time balance updates
- **Graduated Autonomy**: Manual → Approval → Autonomous trust ladder

### 🎨 Design
- iPhone 14/15 size (390×844)
- Modern fintech aesthetic
- Blue-600 primary, Green-600 success
- Smooth animations and micro-interactions
- Professional investor-ready UI

### 🔧 Technical
- React 18 with TypeScript
- Tailwind CSS v4
- Fully simulated state (no backend)
- 14 interconnected screens
- Complete navigation flows

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - 90-second demo guide
- **[DEMO_FLOW.md](./DEMO_FLOW.md)** - Detailed golden path walkthrough
- **[SCREEN_MAP.md](./SCREEN_MAP.md)** - Navigation structure & screen states
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete technical overview

## 🎯 Core Screens

| Screen | Purpose |
|--------|---------|
| Welcome | Value proposition & onboarding |
| Home | Dashboard with workflow progress |
| Tasks | Task creation & management |
| Task Detail | AI research + approvals + audit trail |
| Execute | Settlement animation & confirmation |
| Community | Governance channels & groups |
| Wallet | Balance, transactions, payment methods |
| Settings | Spending limits & autonomy settings |

## 🎬 Demo Tips

**For investors:**
- Show complete flow from task creation to settlement
- Highlight AI multi-model research
- Emphasize approval audit trail
- Demonstrate ~2 second settlement
- Point out graduated autonomy options

**Key talking points:**
- "AI can do" - autonomous execution within limits
- "Unified context" - decisions visible across all channels
- "Immutable audit trail" - full transparency
- "Fast settlement" - x402 on BASE network

## 🔄 State Management

All interactions are simulated with React `useState`:
- No real authentication
- Mock AI research results
- Simulated blockchain settlement
- Computed transaction history
- Fictional team members

**Initial state:**
- Balance: 5,000 USDC
- Default budget: 120
- Mode: Approval (recommended)
- Daily limit: £50
- Monthly limit: £500

## 🎨 Design System

**Colors:**
- Primary: `bg-blue-600` (#2563eb)
- Success: `bg-green-600` (#16a34a)
- Error: `bg-red-600` (#dc2626)
- Warning: `bg-orange-600` (#ea580c)

**Spacing:**
- Screen padding: `px-6`
- Section gaps: `mb-6`
- Tab bar height: ~80px with safe area

**Typography:**
- Titles: text-2xl to text-4xl, bold
- Headings: text-lg to text-xl, semibold
- Body: text-base, regular
- Captions: text-xs to text-sm

## 🏗️ Architecture

```
/src
├── /app
│   ├── App.tsx (Main component with state)
│   └── /components
│       ├── WelcomeScreen.tsx
│       ├── SignInScreen.tsx
│       ├── HomeScreen.tsx
│       ├── TasksScreen.tsx
│       ├── NewTaskScreen.tsx
│       ├── TaskDetailScreen.tsx
│       ├── ExecuteScreen.tsx
│       ├── CommunityScreen.tsx
│       ├── CreateGroupScreen.tsx
│       ├── GroupChatScreen.tsx
│       ├── WalletScreen.tsx
│       ├── SettingsScreen.tsx
│       ├── BottomTabBar.tsx
│       └── DemoTooltip.tsx
└── /styles
    ├── index.css
    ├── tailwind.css
    ├── theme.css
    └── fonts.css
```

## 🧪 Testing the Demo

**Verify core flows:**
- [ ] Can create account (any email)
- [ ] Can create task with all 3 modes
- [ ] AI research appears after delay
- [ ] Approval updates status immediately
- [ ] Execute shows 2-second animation
- [ ] Balance decreases correctly
- [ ] Transaction appears in wallet
- [ ] Can create group chat
- [ ] Decision history syncs with task
- [ ] Settings shows limits correctly

**Check state persistence:**
- [ ] Task status visible across tabs
- [ ] Balance updates propagate
- [ ] Audit trail maintains entries
- [ ] Group creation flag persists

## 📊 Demo Metrics

- **Screens:** 14 total
- **Tabs:** 4 main navigation
- **User taps:** ~18 for full golden path
- **Demo duration:** 90-120 seconds
- **State variables:** 11 tracked
- **Simulated delays:** AI research (1.5s), Settlement (2s)

## 🎓 Key Concepts

**Multi-LLM Routing:**
AI queries 3 different models (A, B, C) and synthesizes recommendations.

**Approval Workflow:**
Team members review and approve spending before execution.

**x402 Settlement:**
Instant stablecoin payments on BASE network with near-zero fees.

**Graduated Autonomy:**
Trust ladder from manual execution to full AI autonomy.

**Immutable Audit Trail:**
Cryptographically secured record of all decisions and actions.

## 🚧 Known Limitations

- All data is simulated (no persistence)
- No real AI API calls
- No blockchain transactions
- Single-user experience (no real-time collaboration)
- Refresh page to reset demo

## 💡 Future Enhancements

For production version:
- Supabase backend for persistence
- Real AI model integrations
- Live blockchain settlement
- Multi-user real-time collaboration
- Push notifications
- Historical analytics

## 🤝 Contributing

This is a fundraising prototype. For production planning:
1. Review PROJECT_SUMMARY.md for architecture
2. Check state flow in SCREEN_MAP.md
3. Follow design system in theme.css

## 📄 License

Proprietary - Investor Demo Only

---

**Built with:** React • TypeScript • Tailwind CSS • Vite  
**Demo ready:** ✅ Investor pitches, fundraising presentations  
**Status:** High-fidelity prototype (no backend)
