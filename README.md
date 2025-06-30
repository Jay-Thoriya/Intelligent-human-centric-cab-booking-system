# Welcome

# Intelligent Human‑Centric Cab Booking System

An AI‑powered, language‑agnostic cab booking demo that automatically finds, calls, and negotiates with local drivers—then presents you the best five‑star, lowest‑fare ride, without you ever having to speak their language.

---

## 🎯 Features

- **Multilingual Input**  
  Enter departure city, destination, and time in **your own language** (text or voice).  

- **Automated Driver Discovery**  
  Fetches (or, in demo mode, lets you manually enter) available drivers’ names & phone numbers.

- **Auto‑Calling & Quote Collection**  
  Uses Twilio to call each driver, checks availability & fare, and logs responses.

- **Centralized Logging**  
  All call results (fare, car type, rating) are recorded in a Google Sheet.

- **Smart Selection**  
  Automatically picks the driver offering the lowest fare with five‑star service.

- **Seamless User Callback**  
  System calls you back with the final recommendation and lets you negotiate via an agent—no language barrier required.

---

## 🛠 Tech Stack
 
- **Frontend (Demo Web App)**: React + Tailwind CSS  
- **Voice & SMS**: Omnidimension(https://www.omnidim.io)
- Automation / Call Handling: n8n workflow for orchestrating driver calls and data updates (https://github.com/Jay-Thoriya/Intelligent-human-centric-cab-booking-system/blob/main/public_trasport.json) 
- **Deployment**:  [lovable](https://preview--transit-glide-interface.lovable.app/) 

---

## 🚀 Getting Started


The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/Jay-Thoriya/Intelligent-human-centric-cab-booking-system

# Step 2: Navigate to the project directory.
cd Intelligent-human-centric-cab-booking-system

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev


📈 Usage
Open the web app at http://localhost:3000.

Enter departure city, destination, and travel date/time (in your language).

(Demo) Input available drivers manually.

Click Book My Ride.

Receive your recommended driver details and fare via an automated callback.



```

## ⚙️ n8n Workflow

We use an n8n workflow to automate the call handling and data management process.

Workflow Steps

🔄 How It Works

Webhook
Triggered automatically after the call with a cab driver ends. It initiates the workflow to process results.

Get Rows (cab drivers)
Fetches all available cab driver details from the Supabase database.

Get Rows in Sheet
Reads all conversation records with drivers from a connected Google Sheet. This sheet contains the driver's availability, fare, vehicle type, and response details.

If Condition
(Optional logic) Checks specific conditions like fare limits, vehicle type, or driver availability before proceeding.

HTTP Request
Calls the backend API to initiate a user callback, providing them with all gathered cab driver options and asking them to confirm the booking.

Clear Sheet
Cleans up the Google Sheet by removing temporary or processed driver conversation data.

Delete Row
Removes outdated or processed driver entries from the Supabase database to keep it clean and up-to-date.

