# Architecture

## Stack

| Domain           | Choice                                        |
| :--------------- | :-------------------------------------------- |
| Framework        | React 18 (TypeScript strict)                  |
| Build tool       | Vite                                          |
| Package manager  | pnpm                                          |
| Routing          | react-router-dom (a single route `/` for now) |
| Design system    | MUI (Material UI) + custom theme              |
| Quality          | ESLint (flat config) + Prettier + cspell      |
| Unit tests       | Jest + React Testing Library                  |
| End-to-end tests | Playwright                                    |

## Folder structure

```
src/
  main.tsx                      # entry point (createRoot)
  App.tsx                       # ThemeProvider + BrowserRouter + Routes
  theme/
    theme.ts                    # MUI theme (palette #146aff, Nunito font)
    theme-augmentation.d.ts      # TS augmentation of the Theme type (palette.custom)
  pages/
    PresentationEditorPage/      # the single page, rendered by the '/' route
  components/
    MainContainer/
      MainContainer.tsx          # layout: SlidesPresentation + ActionsBar
      useMainContainer.ts        # central editing state (see below)
    ActionsBar/                  # Save/Discard buttons (presentational)
    SlidesPresentation/
      SlidesPresentation.tsx     # presentational, prop drilling
      CurrentSlide/
        CurrentSlide.tsx
        useCurrentSlide.ts        # local buffer for the speaker note textarea
      SlidesList/                 # thumbnail list (presentational)
    Sidebar/
      SideBar.tsx
      useSidebar.ts                # active tab state
      Questions/                   # presentational, mock data
      Presentations/               # presentational, mock data
  constants/
    constants.ts                  # tabs, slides, mock data, storage key
    images.ts                      # re-exports the slide image assets
  utils/
    storage.ts                     # getStorageItem/setStorageItem (typed localStorage)
  types/                            # Slide, Question, Presentation
  test/                             # setupTests, fileMock, renderWithProviders
e2e/
  presentation-editor.spec.ts       # main user journey (Playwright)
```

## Separating logic from rendering

Every component with its own state or handlers has a `useXxx.ts` hook next to its `.tsx`:

- **`useMainContainer`**: the editing state is centralized here because `MainContainer` is the smallest common ancestor between `SlidesPresentation` (which edits speaker notes) and `ActionsBar` (which saves/discards). It keeps two versions of the slides — `savedSlides` (last persisted state) and `draftSlides` (state being edited) — and exposes `isDirty`, `changeSlide`, `updateSpeakerNote`, `save`, `discard`.
- **`useCurrentSlide`**: isolates the local textarea buffer (typed text is only committed to the shared state on blur), and resyncs that buffer when navigating to another slide or when the note changes from outside (e.g. a `discard`).
- **`useSidebar`**: only handles the active tab and which component to render.

Purely presentational components (`SlidesPresentation`, `SlidesList`, `ActionsBar`, `Questions`, `Presentations`) receive everything through props and have no dedicated hook, to avoid an unnecessary abstraction.

## State management and persistence

There is no backend: speaker notes are the only editable data, persisted to `localStorage` via `utils/storage.ts` (key `SAVED_SLIDES_STORAGE_KEY`, defined in `constants.ts`).

- **Save** writes `draftSlides` to `localStorage` and promotes them to `savedSlides`.
- **Discard** resets `draftSlides` back to `savedSlides`.
- `isDirty` is computed by reference equality between `draftSlides` and `savedSlides`: any edit creates a new array (hence a new reference), while `save`/`discard` intentionally realign the two references.

Questions and presentations in the sidebar are static mock data (`mockQuestions`, `mockPresentations` in `constants.ts`) — no editing interaction is implemented on these lists, consistent with the scope of the original project.

## Tests

- **Unit (Jest + RTL)**: one `.test.ts`/`.test.tsx` file per component, hook, and util. Components using the custom MUI theme are rendered through `test/renderWithProviders.tsx`.
- **End-to-end (Playwright)**: `e2e/presentation-editor.spec.ts` covers slide navigation, editing + saving a note (with persistence verified after a reload), discarding an edit, and switching sidebar tabs. Runs on desktop and mobile Chromium (Pixel 7).
