# Top GitHub Repos - Temporary README

## How to Run the App

### Requirementss
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt
```

### Frontend Setup
```bash
# Install root dependencies
npm install

# Frontend dependencies
cd frontend
npm install

# Start the server + Frontend on root
npm run start
```

Or view online @ [https://top-repos.fly.dev/](https://top-repos.fly.dev/)  

## What I Chose and Why

### Frontend

**Material-UI (MUI)**
- I went with MUI because I know it well and it makes HTML layout simpler, semantically accurate and more reliable
- It's pretty customizable and gives you consistent design patterns

**React Query**
- This is my main tool for API calls and data fetching since it handles caching and state management automatically
- It does background refetching and the stale-while-revalidate pattern out of the box
- Handles loading states, error states, and retry logic so no need for additional boilerplate and customized error handling

**Vitest**
- Quick, modern testing framework that works great with TypeScript and integration with Vite
- Much better DX than some other testing frameworks I've tried

### Backend

**Flask**
- I picked Flask because it's lightweight and flexible (also widely used and reliable)
- Easy to extend and maintain, good documentation
- I am currently trying to expanding my Python skills, so used the opportunity to work  more with it

**Why I separated server and client**
- It makes more sense to keeps things separate and organized (as well as using two different technologies that fit the two different use cases)
- I can scale frontend and backend independently, and add to BE security if needed
- Better error handling and debugging in case things go wrong

### Deployment

**Fly.io**
- I've used Fly.io before and it's worked well for me
- Great for full-stack apps
- Simple deployment process that also debugs (and does it well)

### Project Structure
```
top-github-repos/
├── frontend/                  # React frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── hooks/             # For React Query hooks
│   │   ├── services/          # API services
│   │   ├── style/             # Centralized styling
│   │   └── types.ts           # TS definitions
│   └── package.json
├── app.py                      # Flask backend
├── requirements.txt            # Python dependencies
└── fly.toml                   # Fly.io configuration
```

### How I separated things

**Logical grouping:**
- **Components**: Each component gets its own file and test so I can reuse them
- **Hooks**: Custom React Query hook for data fetching
- **Services**: API calls separated from components
- **Styles**: I moved all styles into the `style/` folder instead of using inline `sx` props. Easy to maintain and update global styles (not always the best choice, but tried to fit the "good class naming" requirement). Used REM over PX for more responsiveness and accessibility.
- **Types**: Shared TypeScript definitions

**Why this structure**
- Easy to find, debug and modify specific functionality
- Clear separation of concerns between data, presentation, and business logic
- Very easy to understand and maintain, and scales well

## My Testing Approach

### How I handled testing
- **Unit tests**: I test individual components in isolation with mocked dependencies
- **Basic component rendering tests for dummy components**: Making sure simpler components render without crashing
- **UI tests**: Testing button clicks, form inputs, and user actions
- **API service tests**: Testing the service layer with mocked responses
- **Minimal coverage**: I focus on critical user paths rather than trying to get 100% coverage

### Error handling
- **Frontend**: React Query gives me very simple error handling with retry logic
- **Backend**: Flask error handling with proper HTTP status codes
- **User Experience**: Clear error messages and fallback states
- **Fallback behavior**: App keeps working even when some features fail

## Other Considerations

**Languages Field**: I considered improving the languages field by using GitHub's additional API endpoint that fetches ALL languages used in a repository (through the `languages_url` property from the API response). However, this endpoint had rate limiting issues, so would have possibly added to inconsistent and unreliable app functionality. 
**Testing**: I chose a simple testing approach for our simpler components that don't contain much or any business logic. More testing could have been added but again, this seemed suitable for the current use case.
**Using AI**: I used Cursor as my IDE which allowed more support in troubleshooting, component/test refactoring, deployment on fly.io and some manual labor (removing unused imports, "find and replace" commands, comments etc.). 

