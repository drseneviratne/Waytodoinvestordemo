# Way-To-Do Screen Map

## 📱 Navigation Structure

```
┌─────────────────────────────────────────────────────────────┐
│                      WELCOME SCREEN                          │
│                     [Get Started] ───────────────────┐       │
└─────────────────────────────────────────────────────┼───────┘
                                                       │
                                                       ▼
┌─────────────────────────────────────────────────────────────┐
│                      SIGN IN SCREEN                          │
│                      [Continue] ─────────────────────┐       │
└─────────────────────────────────────────────────────┼───────┘
                                                       │
                                                       ▼
┌─────────────────────────────────────────────────────────────┐
│                  LOGGED IN EXPERIENCE                        │
│                    (Bottom Tab Bar)                          │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┬──────────────┐
                ▼             ▼             ▼              ▼
         ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
         │   HOME   │  │  TASKS   │  │COMMUNITY │  │  WALLET  │
         │   TAB    │  │   TAB    │  │   TAB    │  │   TAB    │
         └──────────┘  └──────────┘  └──────────┘  └──────────┘
              │             │             │              │
              │             │             │              │
              ▼             ▼             ▼              ▼
```

## 🏠 Home Tab Flow

```
HOME SCREEN
├── [Settings icon] ──→ SETTINGS SCREEN
│                           │
│                           └──→ [Back] ──→ HOME SCREEN
│
└── [Create first task] ──→ TASKS TAB
```

**Home Screen Features:**
- Balance card (£5,000)
- Workflow progress widget (Create → Collaborate → Execute)
- Activity stats (Pending/Completed)
- Settings access

## ✅ Tasks Tab Flow

```
TASKS SCREEN
├── Empty state
│   └── [New task button]
│           │
│           ▼
├── NEW TASK SCREEN
│   ├── Title input
│   ├── Budget input (£120)
│   ├── Mode selector (Manual/Approval/Autonomous)
│   └── [Create & start AI research]
│           │
│           ▼
├── TASK DETAIL SCREEN
│   ├── AI Research section
│   │   ├── Model A result
│   │   ├── Model B result
│   │   ├── Model C result
│   │   └── Combined recommendation
│   ├── Approvers section
│   │   ├── 3 team members
│   │   └── [Approve] / [Reject]
│   ├── Audit trail
│   └── [Execute purchase] (after approval)
│           │
│           ▼
├── EXECUTE SCREEN
│   ├── Processing animation (2s)
│   ├── Success state
│   ├── Settlement details
│   └── [View in wallet] / [Back to tasks]
│           │
│           ▼
└── WALLET TAB (or TASKS TAB)
```

**Status Progression:**
1. Draft → Researching (1.5s) → NeedsApproval
2. NeedsApproval → [Approve] → Approved
3. Approved → [Execute] → Executed

## 👥 Community Tab Flow

```
COMMUNITY SCREEN
├── Workspace info
├── Channels list
│   ├── #general
│   ├── #task-approvals (unread if task pending)
│   └── #announcements
│
├── [+ button] (top right)
│       │
│       ▼
├── CREATE GROUP SCREEN
│   ├── Group name input
│   ├── Member selection (4 members)
│   └── [Create group]
│           │
│           ▼
└── GROUP CHAT SCREEN
    ├── Pinned task card (if task exists)
    ├── Messages
    ├── [Decision History icon] (top right)
    │       │
    │       ▼
    └── Decision History Modal
        ├── Task card with timeline
        ├── Approval events
        └── Settlement confirmation
```

## 💰 Wallet Tab Flow

```
WALLET SCREEN
├── Balance card (starts £5,000)
│   ├── [Deposit] button
│   └── [Send] button
│
├── Quick stats
│   ├── Monthly spend
│   └── Settlement time
│
├── Transactions list
│   └── x402 settlement entries (if executed)
│
├── Payment method
│   └── USDC on BASE card
│
└── [Settings icon] ──→ SETTINGS SCREEN
```

## ⚙️ Settings Flow

```
SETTINGS SCREEN
├── [Back] ──→ Previous screen (HOME or WALLET)
│
├── Spending Limits
│   ├── Daily: £50 / £50
│   └── Monthly: £500 / £500
│
├── Graduated Autonomy
│   ├── Level 1: Manual
│   ├── Level 2: Approval ← Current
│   └── Level 3: Autonomous
│
├── Security Features
│   ├── Immutable audit trail [ON]
│   ├── 48-hour dispute window [ON]
│   └── Multi-signature approval [OFF]
│
└── x402 Settlement Info
    ├── ~2 seconds settlement
    └── £0.02 average fees
```

## 🎯 Screen States

### Tab Bar Visibility
**Shown on:** Home, Tasks, Community, Wallet  
**Hidden on:** Welcome, SignIn, NewTask, TaskDetail, Execute, CreateGroup, GroupChat, Settings

### Demo Tooltips
**Shown after:**
- Approval action: "Simulated approval event recorded in immutable audit trail"
- Execute action: "Simulated x402 settlement on BASE network"

**Auto-dismiss:** 3 seconds

## 🔄 State Synchronization

Changes propagate across screens:

| Action | Updates |
|--------|---------|
| Approve task | → TaskDetail status, Home progress, Tasks badge, Community pin |
| Execute task | → Wallet balance, TaskDetail status, Home stats, Community history |
| Create group | → Community direct messages section |
| Sign in | → Tab bar appears, Home loads |

## 📊 Data Flow

```
App State (useState)
    │
    ├──→ WelcomeScreen (read-only)
    ├──→ SignInScreen (updates: isLoggedIn, currentScreen)
    ├──→ HomeScreen (read: all, navigate)
    ├──→ TasksScreen (read: taskTitle, taskStatus, etc.)
    ├──→ NewTaskScreen (updates: taskTitle, taskStatus, selectedMode)
    ├──→ TaskDetailScreen (updates: taskStatus, approvedBy)
    ├──→ ExecuteScreen (updates: taskStatus, walletBalance, executionTime)
    ├──→ CommunityScreen (read: taskStatus, groupCreated)
    ├──→ CreateGroupScreen (updates: groupCreated)
    ├──→ GroupChatScreen (read: all task/group data)
    ├──→ WalletScreen (read: walletBalance, transactions)
    └──→ SettingsScreen (read-only)
```

## 🎨 Visual Hierarchy

### Primary Actions (Blue-600)
- Get Started
- Continue
- Create & start AI research
- Execute purchase
- + (Create group)

### Success Actions (Green-600)
- Approve button
- Checkmarks on completed steps

### Destructive Actions (Red-600)
- Reject button

### Navigation Actions (Gray-700)
- Back arrows
- Tab bar icons (inactive)
- Settings gear

## 🧭 User Journey Map

**First-time Investor Demo (120 seconds):**

1. Welcome (5s) → Sign In (5s)
2. Home (10s) → Tasks Tab (5s)
3. New Task (15s) → AI Research (10s)
4. Review Results (10s) → Approve (5s)
5. Execute (5s) → Processing (2s) → Success (10s)
6. View Wallet (10s)
7. Community (10s) → Create Group (15s)
8. Group Chat (10s) → Decision History (8s)

**Total interactive time:** ~120 seconds  
**Total taps required:** ~18 taps
