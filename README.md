# Bernice Tours N Travels Website

A futuristic, modern website for passport services, visa assistance, and flight bookings. Built with Next.js, Flask, and Supabase.

![Bernice Tours N Travels](frontend/public/logo.png)

## 🌟 Features

- **Stunning 3D Visuals**: Interactive Three.js scene with floating globe, passport, and airplane
- **Glassmorphism Design**: Modern UI with glass effects and smooth animations
- **Responsive Layout**: Fully responsive design for all devices
- **WhatsApp Integration**: Direct WhatsApp chat links for instant communication
- **Contact Form**: Submit inquiries directly to the database
- **SEO Optimized**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Three.js / React Three Fiber** - 3D graphics
- **Framer Motion** - Smooth animations
- **React Icons** - Icon library

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Supabase** - Database and authentication

## 📞 Contact Information

- **Phone**: 9152510738
- **WhatsApp**: [9820446490](https://wa.me/919820446490)
- **Email**: bernicepassport@gmail.com

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Python 3.9+
- npm or yarn

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Run the server
python app.py
```

The backend will be available at `http://localhost:5000`

### Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the queries in `backend/supabase_schema.sql`
3. Copy your project URL and anon key to `backend/.env`

## 📁 Project Structure

```
Bernice-Website/
├── frontend/                 # Next.js frontend
│   ├── public/
│   │   └── logo.png         # Company logo
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css  # Global styles
│   │   │   ├── layout.tsx   # Root layout
│   │   │   └── page.tsx     # Home page
│   │   └── components/
│   │       ├── Scene3D.tsx  # 3D background
│   │       ├── Navbar.tsx   # Navigation
│   │       ├── Hero.tsx     # Hero section
│   │       ├── Services.tsx # Services grid
│   │       ├── About.tsx    # About section
│   │       ├── Contact.tsx  # Contact form
│   │       └── Footer.tsx   # Footer
│   └── package.json
│
├── backend/                  # Flask backend
│   ├── app.py               # Main Flask app
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment template
│   └── supabase_schema.sql  # Database schema
│
└── README.md
```

## 🎨 Design System

### Colors
- **Primary Gold**: `#c9a227` - Main accent color
- **Primary Navy**: `#1a365d` - Dark accent
- **Background**: `#0f172a` to `#1e293b` gradient

### Typography
- **Font**: Outfit (Google Fonts)
- **Weights**: 300-800

### Effects
- Glassmorphism cards with blur
- Gradient text effects
- Smooth hover animations
- 3D floating elements

## 🔒 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (.env)
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
FLASK_ENV=development
FLASK_DEBUG=1
SECRET_KEY=your_secret_key
FRONTEND_URL=http://localhost:3000
```

## 📱 Services Offered

1. **Passport Services** - New applications, renewals, Tatkal
2. **Visa Assistance** - Tourist, Business, Work, Student visas
3. **Flight Bookings** - Domestic and International
4. **Document Attestation** - Apostille, MEA, Embassy
5. **Travel Insurance** - Comprehensive coverage
6. **24/7 Support** - WhatsApp, Phone, Email

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
npx vercel
```

### Backend (Render/Railway)
Deploy with Docker or as a Python web service.

## 📄 License

© 2024 Bernice Tours N Travels. All rights reserved.

---

Made with ❤️ for seamless travel experiences
