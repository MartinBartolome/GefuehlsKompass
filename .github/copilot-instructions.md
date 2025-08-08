# GefuehlsKompass - Angular Emotional Wellness App

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

GefuehlsKompass is an Angular 20 web application that helps users identify, accept, and cope with emotions through a 3-step guided process. The app is built for German-speaking users and includes Swiss mental health resources.

## Working Effectively

### Prerequisites and Setup
- Node.js v20+ and npm are required and available
- Run `npm install` - takes ~7 seconds, always succeeds
- No additional SDKs or dependencies needed

### Build, Test, and Run Commands
**CRITICAL: All commands are fast (under 30 seconds). NEVER CANCEL any of these operations.**

- **Development server**: `npm start` or `npm run start`
  - Takes ~4 seconds to start
  - Serves on http://localhost:4200/
  - NEVER CANCEL: Let it fully load before testing

- **Production build**: `npm run build` 
  - Takes ~6 seconds to complete
  - Output: `/dist/gefuehls-kompass/`
  - NEVER CANCEL: Wait for "Application bundle generation complete"

- **Documentation build**: `npm run build:docs`
  - Takes ~6 seconds to complete
  - Output: `/docs/` directory (GitHub Pages ready)
  - NEVER CANCEL: Wait for completion

- **Unit tests**: `npm test -- --watch=false --browsers=ChromeHeadless`
  - Takes ~4 seconds to complete (much faster than initial estimate)
  - Runs 7 tests, all should pass
  - NEVER CANCEL: Set timeout to 30+ seconds minimum for safety
  - **CRITICAL**: Must use `--browsers=ChromeHeadless` flag or tests will fail
  - Default `npm test` will fail due to missing display

- **Watch mode build**: `npm run watch`
  - For development with auto-rebuild on file changes

### Validation Requirements
**ALWAYS manually validate changes by running through complete user scenarios:**

1. **Complete User Journey Test**:
   - Start dev server with `npm start`
   - Navigate to http://localhost:4200/
   - Click "Reise beginnen" (Start Journey)
   - Select at least one feeling (e.g., "Angst" under "Grundemotionen")
   - Click "Weiter" to step 2 (gefuehle-annehmen)
   - Click "Weiter zu den Bewältigungsstrategien" to step 3 (gefuehle-bewaeltigen)
   - Verify all content loads and navigation works

2. **Build Validation**:
   - Always run `npm run build` after making changes
   - Always run `npm test -- --watch=false --browsers=ChromeHeadless` 
   - Check that all 7 tests pass

## Code Structure and Navigation

### Key Directories
```
/src/app/
├── components/          # Angular components
│   ├── home/           # Landing page
│   ├── gefuehle-erkennen/    # Step 1: Identify feelings
│   ├── gefuehle-annehmen/    # Step 2: Accept feelings  
│   └── gefuehle-bewaeltigen/ # Step 3: Cope with feelings
├── services/           # Angular services
│   └── feelings.ts     # Core feelings data and state management
├── app.ts             # Root component
├── app.config.ts      # Angular configuration
└── app.routes.ts      # Routing configuration
```

### Important Files
- `/src/app/services/feelings.ts` - Core service with feelings data and state management
- `/src/app/app.ts` - Root component with navigation logic
- `/angular.json` - Angular CLI configuration
- `/package.json` - Dependencies and scripts

### Frequently Modified Areas
- **Adding new feelings**: Edit `/src/app/services/feelings.ts` in the `availableFeelings` array
- **UI changes**: Component files in `/src/app/components/*/` 
- **Routing**: `/src/app/app.routes.ts`
- **Styling**: Individual component `.css` files or `/src/styles.css`

## Development Guidelines

### No Linting Configured
- **No ESLint, TSLint, or other linters are configured**
- Follow existing code style patterns
- Use TypeScript strict mode (already configured)
- Follow Angular style guide conventions

### Testing
- Tests use Jasmine and Karma
- All 7 existing tests must continue to pass
- Test files: `*.spec.ts`
- **CRITICAL**: Always run tests with headless Chrome flag

### State Management
- Uses Angular signals for reactive state
- Local storage key: `'gefuehls-kompass-state'`
- State is managed in `FeelingsService`

### Deployment
- **Docs deployment**: `npm run build:docs` creates GitHub Pages ready files in `/docs/`
- **Production build**: `npm run build` creates optimized build in `/dist/`

## Common Tasks Reference

### Repository Root Contents
```
.editorconfig          # Editor configuration
.gitignore            # Git ignore rules
README.md             # Basic Angular CLI documentation
angular.json          # Angular CLI configuration
package.json          # Dependencies and scripts
package-lock.json     # Locked dependency versions
tsconfig.json         # TypeScript configuration
tsconfig.app.json     # App-specific TypeScript config
tsconfig.spec.json    # Test-specific TypeScript config
public/               # Static assets
src/                  # Source code
docs/                 # Built documentation (GitHub Pages)
```

### Key npm Scripts (from package.json)
```json
{
  "start": "ng serve",
  "build": "ng build", 
  "build:docs": "ng build --configuration docs && mv docs/browser/* docs/ && rmdir docs/browser",
  "watch": "ng build --watch --configuration development",
  "test": "ng test"
}
```

### TypeScript Configuration Highlights
- Strict mode enabled
- ES2022 target
- Experimental decorators enabled
- Angular compiler optimizations active

## NEVER DO
- Cancel build or test commands (they complete quickly)
- Run `npm test` without `--browsers=ChromeHeadless` flag
- Modify `/docs/` directory manually (it's auto-generated)
- Skip manual validation testing after changes
- Add linting tools without explicit requirement (none currently configured)

## Application Context
- **Purpose**: Emotional wellness support for German speakers
- **Target Users**: People experiencing emotional difficulties
- **Privacy**: All data stored locally, no server communication
- **Swiss Context**: Includes Swiss mental health resources (Dargebotene Hand: 143)
- **Workflow**: 3-step process for emotional self-care and coping strategies