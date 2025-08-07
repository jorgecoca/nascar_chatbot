# NASCAR ChatBot Frontend 🏁

A Next.js frontend application for the NASCAR ChatBot, featuring a racing-themed UI that connects to the NASCAR AI agent backend.

## Features

- **Racing-themed UI**: NASCAR-inspired design with racing colors, checkered patterns, and animated elements
- **Real-time Chat**: Interactive chat interface with the NASCAR AI agent
- **Markdown Support**: Full markdown rendering for rich AI responses including headers, lists, code blocks, tables, and links
- **Responsive Design**: Mobile-friendly design that works across devices
- **API Health Monitoring**: Visual indicators for backend API status
- **Racing Animations**: Custom CSS animations including race car loading indicators
- **TypeScript Support**: Full TypeScript support for better development experience

## Technology Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first CSS framework with custom racing theme
- **Lucide React**: Beautiful icons
- **Axios**: HTTP client for API communication
- **React Markdown**: Full markdown rendering with GitHub Flavored Markdown support
- **Remark GFM**: Enhanced markdown features (tables, strikethrough, etc.)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- NASCAR ChatBot API running on port 8000

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.local.example .env.local
```

4. Update the API URL in `.env.local` if needed:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles with NASCAR theme
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main chat interface
├── components/
│   └── RacingComponents.tsx # Reusable racing-themed components
└── lib/
    ├── api.ts               # API client utilities
    └── config.ts            # Configuration and constants
```

## Customization

### Racing Theme Colors

The racing theme can be customized in `tailwind.config.ts`:

```typescript
colors: {
  nascar: {
    red: "#E21E2C",      // NASCAR Red
    blue: "#003A7D",     // NASCAR Blue
    yellow: "#FFD700",   // NASCAR Yellow
    // ... more colors
  }
}
```

### API Configuration

Update the API endpoints in `src/lib/config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  ENDPOINTS: {
    CHAT: '/api/chat',
    HEALTH: '/api/health'
  }
};
```

## Markdown Support

The chat interface now fully supports markdown formatting for AI responses:

### Supported Elements
- **Headers** (H1-H6) with NASCAR yellow highlighting
- **Bold** and *italic* text formatting
- `Inline code` with racing-themed styling
- Code blocks with syntax highlighting
- Bulleted and numbered lists
- Tables with NASCAR-themed borders
- Blockquotes with yellow accent borders
- Links that open in new tabs
- Strikethrough text

### NASCAR Theme Integration
- Headers use NASCAR yellow (#FFD700)
- Code blocks have dark backgrounds with racing borders
- Tables feature red accent headers
- Links hover with racing yellow
- All elements maintain the dark racing theme

## Racing Theme Features

- **Checkered Flag Patterns**: CSS-based checkered flag backgrounds
- **Racing Stripe Animations**: Animated racing stripes for visual appeal
- **Custom Loading Indicators**: Race car animations for loading states
- **NASCAR Color Palette**: Authentic NASCAR red, blue, and yellow colors
- **Responsive Racing Layouts**: Mobile-optimized racing-themed layouts

## API Integration

The frontend connects to the NASCAR ChatBot API with the following endpoints:

- `POST /api/chat`: Send messages to the AI agent
- `GET /api/health`: Check API server status

Messages are sent in the format:
```json
{
  "user_message": "Your question about NASCAR"
}
```

## Contributing

1. Follow the existing code style and TypeScript conventions
2. Maintain the racing theme consistency
3. Test the chat functionality with the backend API
4. Update documentation for any new features

## Racing-Themed Components

### RaceTrackLoading
Animated race track with spinning car for loading states.

### CheckeredFlag
Checkered flag pattern component for decorative elements.

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL (default: http://localhost:8000)

## License

This project is part of the NASCAR ChatBot application.
