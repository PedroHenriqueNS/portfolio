---
summary: "Electron desktop app for seeders to log comments on social media, with optimistic UI, React Query and cloud sync through Supabase."
---

A comment tracker where social media **Seeders** log their results as they work.

Afterwards, the app adapts the data to the database the company uses for analysis, through the **Seeding** button.

The desktop application is built with **Electron**, with everything written in **React.js** with **Vite**.

All tracking is saved in the cloud on **Supabase**, which also handles user authentication.

The application was built with *"optimistic UI"*: the response is predicted and applied right away, while **React Query** requests save the changes in the background.
