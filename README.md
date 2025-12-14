# LogicHub 3D - Professional 3D Printing & Modelling Service

A complete, production-ready frontend application for a 3D printing and modelling service built with React, Vite, and modern web technologies.

## Features

### Authentication System
- Complete mocked authentication flow with login/signup
- Token-based authentication with automatic refresh
- Protected routes for authenticated users
- Demo credentials: `user@logichub.com` / `password123`

### File Upload & 3D Viewer
- Drag-and-drop file upload with Mantine Dropzone
- Supports STL, OBJ, and 3MF file formats
- Real-time 3D preview using Three.js
- Interactive model viewer with rotation, zoom, and pan
- Display model dimensions and bounding box
- Mirror transformations (X, Y, Z axes)

### Print Configuration
- Material selection (PLA, ABS, PETG)
- Color customization (9 colors available)
- Quality settings (Draft, Standard, High Detail)
- Support structure generation toggle
- Adjustable infill percentage (10-100%)
- Real-time configuration preview

### Quote System
- Automatic price calculation based on configuration
- Estimated filament usage
- Estimated print time
- Delivery vs pickup options
- Price breakdown with itemized costs

### Checkout & Payment
- Order summary with all details
- Delivery information collection
- Mock payment gateway (Paystack placeholder)
- Order confirmation with unique order ID

### Appointment Booking
- Date picker for consultation scheduling
- Time slot selection
- Contact information collection
- Project description field
- Instant confirmation

### Orders Dashboard
- View all orders with status tracking
- Order statuses: Queued, Slicing, Printing, Completed
- Real-time printing progress for active orders
- Reorder functionality
- Order details view

### Printer Status System
- Real-time printer availability display
- 5 printers (A-E) with status monitoring
- Status types: Idle, Printing, Busy, Offline
- Progress tracking for active print jobs

### User Profile
- View user information
- Order statistics
- Account details
- Member since information

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Mantine UI
- **Routing**: React Router DOM v6
- **State Management**: React Context API + React Query
- **HTTP Client**: Axios with interceptors
- **3D Rendering**: Three.js
- **Icons**: Tabler Icons
- **Date Handling**: dayjs

## Project Structure

```
src/
├── api/                    # API layer with mock endpoints
│   ├── axiosClient.ts     # Axios instance with interceptors
│   ├── auth.ts            # Authentication APIs
│   ├── orders.ts          # Order management APIs
│   └── files.ts           # File upload and appointment APIs
├── components/
│   ├── layout/            # Layout components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Loader.tsx
│   └── 3d/                # 3D viewer components
│       └── STLViewer.tsx  # Three.js STL viewer
├── context/               # Global state management
│   ├── AuthContext.tsx    # Authentication context
│   └── PrinterContext.tsx # Printer status context
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts
│   └── useFileUpload.ts
├── pages/                 # Page components
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── Upload.tsx
│   ├── ConfigurePrint.tsx
│   ├── Quote.tsx
│   ├── Checkout.tsx
│   ├── Appointment.tsx
│   ├── Orders.tsx
│   ├── Profile.tsx
│   └── NotFound.tsx
├── router/                # Routing configuration
│   └── AppRouter.tsx      # Protected & public routes
└── utils/                 # Utility functions
    └── token.ts           # Token management (in-memory)
```

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

## User Flow

1. **Home Page** → Browse information about the service
2. **Sign Up / Login** → Create account or sign in
3. **Upload** → Upload 3D model file (STL/OBJ/3MF)
4. **Configure Print** → Select material, color, quality, and advanced settings
5. **Get Quote** → View pricing and delivery estimates
6. **Checkout** → Complete order with payment
7. **Orders Dashboard** → Track order status and progress

## Mock Data

The application uses fully mocked backend APIs:
- Authentication responses with JWT tokens (stored in memory)
- Sample orders with various statuses
- Printer status data
- File upload simulation

All API calls return realistic data after appropriate delays to simulate network requests.

## Design Features

- Modern, professional UI with clean aesthetics
- Responsive design for mobile, tablet, and desktop
- Smooth animations and transitions
- Intuitive navigation
- Consistent color scheme using blue tones
- Shadow effects and gradients for depth
- Clear visual hierarchy
- Accessible form inputs

## Security Features

- Tokens stored in memory (not localStorage)
- Automatic token refresh on 401 errors
- Request retry after token refresh
- Protected routes requiring authentication
- Graceful fallback on auth failure

## Demo Credentials

- **Email**: user@logichub.com
- **Password**: password123

## Notes

- All payment processing is mocked - no real payments are made
- File uploads are processed in-browser without server storage
- 3D models are rendered locally using Three.js
- All data is temporary and resets on page reload
- TypeScript is used throughout for type safety

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a demonstration project for LogicHub 3D.
