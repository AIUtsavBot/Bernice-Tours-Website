"""
Bernice Tours N Travels - Flask Backend API
Handles contact form submissions and stores data in Supabase
"""

import os
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS
CORS(app, resources={
    r"/api/*": {
        "origins": [
            os.getenv("FRONTEND_URL", "http://localhost:3000"),
            "https://bernice-tours.vercel.app"  # Add your production domain
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Initialize Supabase client (optional - only if configured)
supabase = None
try:
    from supabase import create_client, Client
    
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_KEY")
    
    if supabase_url and supabase_key and supabase_url != "your_supabase_project_url":
        supabase: Client = create_client(supabase_url, supabase_key)
        print("✅ Supabase client initialized successfully")
    else:
        print("⚠️ Supabase not configured - running in demo mode")
except Exception as e:
    print(f"⚠️ Supabase initialization failed: {e}")


@app.route("/", methods=["GET"])
def home():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "Bernice Tours N Travels API",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat()
    })


@app.route("/api/health", methods=["GET"])
def health_check():
    """API health check"""
    return jsonify({
        "status": "ok",
        "database": "connected" if supabase else "demo_mode",
        "timestamp": datetime.utcnow().isoformat()
    })


@app.route("/api/contact", methods=["POST"])
def submit_contact():
    """
    Handle contact form submissions
    Stores data in Supabase if configured, otherwise logs to console
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ["name", "email", "phone", "service", "message"]
        missing_fields = [field for field in required_fields if not data.get(field)]
        
        if missing_fields:
            return jsonify({
                "success": False,
                "error": f"Missing required fields: {', '.join(missing_fields)}"
            }), 400
        
        # Prepare contact data
        contact_data = {
            "name": data["name"].strip(),
            "email": data["email"].strip().lower(),
            "phone": data["phone"].strip(),
            "service": data["service"],
            "message": data["message"].strip(),
            "created_at": datetime.utcnow().isoformat(),
            "status": "new"
        }
        
        # Store in Supabase if available
        if supabase:
            try:
                result = supabase.table("contacts").insert(contact_data).execute()
                print(f"✅ Contact saved to Supabase: {contact_data['email']}")
            except Exception as db_error:
                print(f"⚠️ Database error: {db_error}")
                # Continue even if database fails - don't lose the lead
        else:
            # Demo mode - just log the data
            print(f"📧 New contact submission (demo mode):")
            print(f"   Name: {contact_data['name']}")
            print(f"   Email: {contact_data['email']}")
            print(f"   Phone: {contact_data['phone']}")
            print(f"   Service: {contact_data['service']}")
            print(f"   Message: {contact_data['message'][:100]}...")
        
        return jsonify({
            "success": True,
            "message": "Thank you for contacting us! We'll get back to you soon."
        })
        
    except Exception as e:
        print(f"❌ Error processing contact: {e}")
        return jsonify({
            "success": False,
            "error": "An error occurred. Please try again or contact us directly."
        }), 500


@app.route("/api/services", methods=["GET"])
def get_services():
    """Return list of available services"""
    services = [
        {
            "id": "passport",
            "name": "Passport Services",
            "description": "New applications, renewals, and Tatkal services",
            "price_range": "₹1,500 - ₹5,000"
        },
        {
            "id": "visa",
            "name": "Visa Assistance", 
            "description": "Tourist, Business, Work, and Student visas",
            "price_range": "₹2,000 - ₹15,000"
        },
        {
            "id": "flight",
            "name": "Flight Bookings",
            "description": "Domestic and International flight bookings",
            "price_range": "Service fee: ₹500"
        },
        {
            "id": "attestation",
            "name": "Document Attestation",
            "description": "Apostille and Embassy attestation services",
            "price_range": "₹1,000 - ₹8,000"
        },
        {
            "id": "insurance",
            "name": "Travel Insurance",
            "description": "Comprehensive travel protection plans",
            "price_range": "₹500 - ₹5,000"
        }
    ]
    
    return jsonify({
        "success": True,
        "services": services
    })


@app.route("/api/inquiries", methods=["GET"])
def get_inquiries():
    """
    Get all contact inquiries (protected endpoint)
    TODO: Add authentication for admin access
    """
    if not supabase:
        return jsonify({
            "success": False,
            "error": "Database not configured"
        }), 503
    
    try:
        result = supabase.table("contacts").select("*").order("created_at", desc=True).limit(100).execute()
        
        return jsonify({
            "success": True,
            "inquiries": result.data,
            "count": len(result.data)
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("FLASK_DEBUG", "0") == "1"
    
    print(f"""
    ╔══════════════════════════════════════════════════════════╗
    ║     🌍 Bernice Tours N Travels - Backend API             ║
    ║                                                           ║
    ║     Running on: http://localhost:{port}                      ║
    ║     Debug mode: {'ON' if debug else 'OFF'}                                     ║
    ║     Database: {'Supabase' if supabase else 'Demo Mode'}                              ║
    ╚══════════════════════════════════════════════════════════╝
    """)
    
    app.run(host="0.0.0.0", port=port, debug=debug)
