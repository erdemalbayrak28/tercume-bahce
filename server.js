const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (We'll serve the root so /nazay bahce works, or we can serve 'nazay bahce' as root)
// Since the frontend is in 'nazay bahce', let's serve the root folder so 'nazay bahce/index.html' is accessible
app.use(express.static(__dirname));

// PostgreSQL Connection Setup
let pool;
if (process.env.DATABASE_URL) {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false // Required for some managed DBs like Railway
        }
    });

    // Initialize database table if it doesn't exist
    pool.query(`
        CREATE TABLE IF NOT EXISTS inquiries (
            id SERIAL PRIMARY KEY,
            event_type VARCHAR(255),
            guest_count VARCHAR(255),
            catering_pref VARCHAR(255),
            event_date VARCHAR(255),
            client_name VARCHAR(255),
            client_phone VARCHAR(255),
            client_notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `).then(() => {
        console.log("Database table 'inquiries' is ready.");
    }).catch(err => {
        console.error("Error creating table:", err);
    });
} else {
    console.warn("WARNING: DATABASE_URL is not set. Database integration is disabled.");
}

// API Route to receive and save inquiries
app.post('/api/inquiries', async (req, res) => {
    try {
        const { eventType, guestCount, cateringPref, eventDate, clientName, clientPhone, clientNotes } = req.body;

        if (pool) {
            // Save to database
            const query = `
                INSERT INTO inquiries 
                (event_type, guest_count, catering_pref, event_date, client_name, client_phone, client_notes) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) 
                RETURNING id;
            `;
            const values = [eventType, guestCount, cateringPref, eventDate, clientName, clientPhone, clientNotes];
            
            await pool.query(query, values);
            console.log("New inquiry saved to database.");
        } else {
            console.log("Received inquiry but no database is configured:", req.body);
        }

        res.status(200).json({ success: true, message: "Inquiry received" });
    } catch (error) {
        console.error("Error saving inquiry:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// Fallback to index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
