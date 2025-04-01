# 🔧 FORQ MVP UI SCREENS & WORKFLOW

---

NOTE: Users will be running the web app locally so assume that the server-side environment will be their own filesystem.

Use the src/lib/aiClient.ts file to make API calls to Claude.

## **1. Home Screen – Project Entry Point**

### Purpose:

Initial hub to either start a new project or open an existing one. Mimics basic IDE behavior.

### Component Structure:

- **Title/Logo Header** (optional simple `h1`)
- **Two Primary Action Cards (side-by-side or stacked)**:
  - **Card 1: "Start New Project"**
    - Description: "Create a new AI-assisted app from a prompt."
    - Button: "Create New"
  - **Card 2: "Open Existing Project"**
    - Description: "Open and manage an existing Forq workspace."
    - Button: "Import Project" (uses browser's file input to import project JSON)

### Behavior:

- Clicking "Create New" routes to **New Project Setup Screen**
- Clicking "Import Project" opens file dialog to import a project file, then opens **Project Dashboard Screen**

---

## **2. New Project Setup Screen**

### Purpose:

Collects basic project metadata and runs the BRD → PRD → Tasks workflow.

### Component Structure:

- **Project Name Input**

  - Label: "Project Name"
  - Text input with helper text ("E.g., Inventory Manager, AI Bot Builder")

- **Project Description** (replaces folder input)

  - Label: "Project Description"
  - Short text input for project metadata

- **App Idea Input**

  - Label: "Describe your app idea"
  - Multi-line text area
  - Helper: "This will be used to generate your business and product requirements."

- **API Key Input**

  - Label: "Claude API Key"
  - Secure input with save/validate button
  - Tooltip or info icon explaining how to get the key

- **Start Generation Button**
  - Button: "Generate Requirements"
  - Disabled unless required fields are filled

### Behavior:

- On click: starts BRD → PRD → Task generation in sequence.
- While running, display **Document Generation Progress Modal** (below).
- Project data stored in browser's localStorage/IndexedDB

---

## **3. Document Generation Progress Modal / Screen**

### Purpose:

Visual feedback while AI workflows run (BRD → PRD → Tasks).

### Component Structure:

- **State Machine UI (Three Stages)**:
  - **Box 1: BRD**
  - **Box 2: PRD**
  - **Box 3: Tasks**
  - Each box includes:
    - Status: Pending, Generating, Completed
    - View Button (if generated): opens preview modal
- **Loading Spinner or Progress Bar**
- **Status Text**
  - E.g., "Generating PRD...", "Waiting for AI agent..."

### Behavior:

- As each doc is generated, animate its box to show "completed."
- When all are complete → auto-route to **Project Dashboard Screen**

---

## **4. Project Dashboard Screen (Kanban + Sidebar)**

### Purpose:

Main interface after a project is initialized or loaded.

### Layout:

- **Sidebar (left column)**:

  - Project Name
  - Tasklist Dropdown:
    - Label: "Tasklist"
    - Dropdown showing options like `tasks_001.md`, `tasks_002.md`, etc.
  - "Generate More Tasks" button
  - Project Actions:
    - "Export Project" (downloads project data as JSON)
    - "Download Code" (generates zip of all code files)

- **Main Area: Kanban Board**

---

### Kanban Board View

**Pulled from current tasklist markdown (e.g., tasks_001.md)**

- Columns:

  - To-do (`[ ]`)
  - In-progress (`[-]`)
  - Done (`[x]`)

- Each Task Card:

  - Title (from checklist)
  - Button: "View Full Prompt / Context"
  - Button: "Start Task" (initiates AI agent task in browser)

- In-progress cards should show:
  - Live AI output
  - "Mark Done" button after agent finishes

---

## **5. Task View Modal (on clicking card)**

### Purpose:

Show full prompt/metadata for a selected task.

### Components:

- Task title
- Prompt used (text)
- Claude API output (streamed in browser)
- Buttons:
  - "Retry"
  - "Mark as Done"
  - "Download Task Files" (download task-specific files)

---

## **6. Conflict Resolution UI (if changes conflict)**

### Triggered when AI changes would conflict with existing code.

### Components:

- Text area with conflict diff preview
- Dropdown of conflict files
- Three-button options:
  - "Accept AI Changes"
  - "Keep Current"
  - "Manual Edit" (opens in-browser editor)

---

## **7. Generate More Tasks Flow**

### Trigger:

"Generate More Tasks" button from sidebar.

### Flow:

1. **Modal** opens with brief input field: "Describe additional features or next steps."
2. On submit, generate `tasks_002.md`, load as new tasklist, update dropdown.

---

## MVP Notes / Scope Reminders:

- No auth, no multi-user
- Runs entirely in browser
- Project data stored in browser storage (localStorage/IndexedDB)
- Export/import functionality for project persistence
- API key stored in browser storage (encrypted if possible)
- File operations handled in-browser (virtual file system)
- Download functionality for exporting code
- No server dependencies except for API calls to Claude

---
