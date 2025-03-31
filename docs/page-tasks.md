# Checklist: MVP Screen Layout Implementation (Revised)

- [x] **1. Home Screen (`src/app/page.tsx`):**

  - Clear the existing content of `src/app/page.tsx`.
  - Add an `h1` title: "Forq".
  - Create two card-like `div` elements using Tailwind classes (`bg-amber-50`, `dark:bg-stone-800`, `rounded-lg`, `shadow`, `p-6`, `border`, `border-amber-200`, `dark:border-stone-700`, etc.).
  - **Card 1:** Add text "Start New Project" and description "Create a new AI-assisted app from a prompt." Add the existing `Button` component (`src/components/Button.tsx`) labeled "Create New" (use appropriate variant).
  - **Card 2:** Add text "Open Existing Project" and description "Open and manage an existing Forq workspace." Add the existing `Button` component labeled "Browse Folder" (use appropriate variant).
  - Use Tailwind flexbox or grid for layout.
  - _Deferred: Routing logic._

- [x] **2. New Project Setup Screen (`src/app/new-project/page.tsx`):**

  - Create the page file `src/app/new-project/page.tsx`.
  - Add an `h1` title: "Create New Project".
  - Use the existing `InputText` (`src/components/atoms/InputText.tsx`) for "Project Name".
  - Use the existing `InputText` for "Save Location", adding a non-functional placeholder text/icon for "Browse".
  - Use the existing `TextareaDescription` (`src/components/atoms/TextareaDescription.tsx`) for "Describe your app idea".
  - Integrate the existing `ApiKeySection` (`src/components/organisms/ApiKeySection.tsx`) for the Claude API Key input.
  - Add the existing `Button` labeled "Generate Requirements" (disabled initially).
  - Use Tailwind for basic form layout and spacing.
  - _Deferred: Form submission, generation trigger, browse functionality._

- [x] **3. Document Generation Progress Display (`src/app/new-project/page.tsx`):**

  - **Modify** `src/app/new-project/page.tsx`.
  - Import the existing `DocumentWorkflowTimeline` component (`src/components/organisms/DocumentWorkflowTimeline.tsx`).
  - Add logic (using `useState`) to conditionally render `DocumentWorkflowTimeline` _after_ the "Generate Requirements" button (button logic deferred). Initially, it should not be visible.
  - Pass static "pending" statuses to `DocumentWorkflowTimeline` for now.
  - _Deferred: Dynamic status updates, actual trigger logic._

- [ ] **4. Project Dashboard Screen Layout (`src/app/(dashboard)/page.tsx`):**

  - **Modify** the existing `src/app/(dashboard)/page.tsx`.
  - Implement a two-column layout using Tailwind Flexbox or Grid (Sidebar left, Main Area right).
  - **Sidebar:** Create a `div` placeholder. Add simple text "Sidebar Content Placeholder".
  - **Main Area:** Place the existing `KanbanBoard` component (`src/components/organisms/KanbanBoard.tsx`) within this area. Pass the sample tasks from the existing page file.

- [ ] **5. Dashboard Sidebar Content (`src/app/(dashboard)/page.tsx`):**

  - Inside the Sidebar `div` created in the previous step:
  - Add placeholder text for "Project Name".
  - Add a label "Tasklist" and a standard HTML `<select>` element below it with a placeholder `<option>` like "tasks_001.md".
  - Add the existing `ButtonAddTaskSet` (`src/components/atoms/ButtonAddTaskSet.tsx`) labeled "Generate More Tasks".
  - Add two `Button` components (`src/components/Button.tsx` with secondary variant) labeled "Open in Cursor" and "Open in Windsurf".
  - _Deferred: Dropdown population, button functionality._

- [ ] **6. Update Task Card (Necessary Modification) (`src/components/atoms/TaskCard.tsx`):**

  - **Modify** `src/components/atoms/TaskCard.tsx`.
  - Add two new small `Button` components (`src/components/Button.tsx`, consider `size="sm"` and secondary variant) inside the card layout (e.g., footer).
    - Button 1: Label "View Details".
    - Button 2: Label "Start Task".
  - Ensure basic Tailwind styling for placement.
  - _Deferred: Button click handlers._

- [ ] **7. Task View Modal Structure (Placeholder Component):**

  - Create a minimal component file `src/components/organisms/TaskViewModal.tsx` for layout structure.
  - Use basic `div`s and Tailwind for modal appearance (overlay, content box).
  - Inside the content box, add:
    - An `h2` placeholder for Task Title.
    - A `div` placeholder for the Prompt text.
    - The existing `ClaudeCLIOutput` component (`src/components/molecules/ClaudeCLIOutput.tsx`).
    - Placeholder `Button` components: "Retry", "Mark as Done", "Open Worktree in IDE".
    - A close button (e.g., using `X` icon from `lucide-react`).
  - _Note: This component is structurally new but uses existing components internally. Data/state/trigger logic deferred._

- [ ] **8. Conflict Resolution UI (Using Existing Modal) (`src/app/(dashboard)/page.tsx` or relevant trigger location):**

  - Import the existing `MergeConflictModal` (`src/components/molecules/MergeConflictModal.tsx`).
  - Add state (`useState`) to control the `isOpen` prop of the `MergeConflictModal`.
  - Add a temporary button or placeholder trigger mechanism in the dashboard UI to open this modal for layout preview.
  - Pass empty `conflictFiles` and placeholder functions (`onClose`, `onAccept`, `onCancel`) to the modal props.
  - _Deferred: Actual conflict detection logic, specific UI elements within the modal (diff view, specific buttons), real trigger._

- [ ] **9. Generate More Tasks Modal Structure (Placeholder Component):**
  - Create a minimal component file `src/components/organisms/GenerateMoreTasksModal.tsx`.
  - Use basic `div`s and Tailwind for modal appearance.
  - Inside the content box, add:
    - The existing `TextareaDescription` or `InputText` component for the description input.
    - The existing `Button` component for submission.
    - A close button.
  - _Note: This component is structurally new but uses existing atoms. Data/state/trigger logic deferred._
