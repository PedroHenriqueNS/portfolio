---
summary: "Electron desktop app where seeders log social media comments, with an optimistic UI, React Query and cloud sync through Supabase."
---

A comment tracker where social media **Seeders** log their results as they work.

Then, with the **Seeding** button, the app converts the data to the database the company uses for analysis.

The desktop app runs on **Electron**, with everything written in **React.js** and **Vite**.

All tracking is saved to the cloud on **Supabase**, which also handles user authentication.

The app is built with an *"optimistic UI"*: the response is predicted and applied right away, while **React Query** requests save the changes in the background.
