# Eventised - Client

- https://eventised-client-vsoo.vercel.app/
  Eventised is a simple event management app frontend built with **Next.js**, **Shadcn UI**, and **Tailwind CSS**.  
  Users can view upcoming events, check details, and register. Admins can create and manage events with search, sorting, and pagination.

## Features

- Responsive UI with modern design
- Event listing in a card grid
- Event details page with attendee registration modal
- Admin dashboard for managing events and attendees
- Event status (upcoming, ongoing, ended)
- Basic form validation

## Tech Stack

- **Next.js (App Router)**
- **Tailwind CSS** + **Shadcn UI**
- REST APIs from backend server
- Server deployed on https://eventised-server.onrender.com/

## Getting Started

## Clone and run locally:

- `bash`
- git clone https://github.com/yogesh-06/Eventised-client-.git
- cd Eventised-client
- npm install
- npm run dev

# App will run at:

👉 http://localhost:3000

## Demo / Screenshots

- 🏠 Home Page (Upcoming Events) with Register Modal
- 📄 Event Details, Attendees List
- 🛠️ Admin Dashboard (Events Table)

> Screenshots are placeholders — add your own after running the app locally

## Backend

This client connects to the Eventised Server (Node.js/Express + MongoDB).
Server repo - https://github.com/yogesh-06/Eventised-server.git

## Assumptions

### Framework Choice

The original assignment suggested using **Laravel with SQLite**, but due to persistent local environment issues, the project was implemented using the **MERN stack** (MongoDB, Express, React/Next.js, Node.js).

### Why MERN

The job description allows similar frameworks and mentions MongoDB as acceptable. Therefore, using MERN is aligned with the requirements while enabling a fully working solution.

### Architecture & Features

- **Clean Separation**: Routes, controllers, and models are clearly organized.
- **API Endpoints**: Includes creating events, registering attendees, and fetching attendees for specific events.
- **Validations**: Checks for maximum capacity and prevents duplicate registrations.
- **Frontend**: Fully responsive UI built with Next.js + Shadcn UI, including an admin panel.

## Pages

- **BASE_URL** = https://eventised-client-vsoo.vercel.app/

1. HomePage - https://eventised-client-vsoo.vercel.app/
   - upcoming events listing
   - Register Attendee modal
   - onClick of Attendee's count, redirects to EventDetails page.
2. EventDetails -events/{**_eventID_**}/attendees
   - Attendees list for that specific event
3. Admin Events - /admin/events
   - All Events Listing. [passed, ongoing, upcoming]
   - onClick CreateEvent Opens Modal
   - Search based on event name,
   - server side Pagination
   - sorting
4. Admin Attendees - /admin/attendees
   - All Attendees listing
   - Search based on event email,
   - Server side Pagination
   - sorting
