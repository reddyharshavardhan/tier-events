# 🏆 Tier-Based Event Showcase

A responsive and elegant web application built with **Next.js 14 (App Router)**, **Clerk.dev authentication**, **Supabase/PostgreSQL**, and **Tailwind CSS**.  
Logged-in users see a tiered selection of exclusive events, with upgrade simulation, secure access, and a beautiful interface.

---

## ✨ Features

- 🔐 **User Authentication**: Clerk.dev integration with user tier stored in metadata  
- 🧩 **Tiered Event Access**: View only events for your tier or below (Free, Silver, Gold, Platinum)  
- 💻 **Responsive UI**: Modern layout using Tailwind CSS  
- 🧾 **Event Cards**: Title, Description, Date, Tier Badge, Image  
- 🔁 **Upgrade Simulation**: Change tier metadata with a click  
- 🛡️ **Bonus**: Row-level security with helpful upgrade messages for locked content  
- 🧠 **Supabase**: PostgreSQL + optional RLS for secure backend filtering  

---

## 👨‍💻 Tech Stack

- **Frontend**: Next.js 14 (App Router)  
- **Authentication**: Clerk.dev  
- **Database**: Supabase (PostgreSQL)  
- **Styling**: Tailwind CSS  

---

## 🏁 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/tier-events.git
cd tier-events
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of your project:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your clerk publishable key>
CLERK_SECRET_KEY=<your clerk secret key>
NEXT_PUBLIC_SUPABASE_URL=<your supabase url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your supabase anon key>
```

> 💡 You can find these values in your Clerk and Supabase dashboards.

---

### 4. Database: Create & Seed the `events` Table

Go to Supabase → SQL Editor and run the following SQL:

```sql
CREATE TYPE tier_enum AS ENUM ('free', 'silver', 'gold', 'platinum');

CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  event_date timestamp with time zone,
  image_url text,
  tier tier_enum NOT NULL
);

-- Seed data
INSERT INTO events (title, description, event_date, image_url, tier) VALUES
  ('Free Concert',     'Enjoy our free community concert.',  '2024-07-10 18:00:00', '', 'free'),
  ('Silver Workshop',  'A skill-building workshop for Silver users.', '2024-07-12 16:00:00', '', 'silver'),
  ('Gold Gala',        'Invitation to our exclusive Gold gala.', '2024-07-15 20:00:00', '', 'gold'),
  ('Platinum Night',   'Platinum tier only — VIP night out!', '2024-07-20 20:00:00', '', 'platinum'),
  ('Silver Webinar',   'Next-level strategies, Silver tier up.', '2024-07-13 19:00:00', '', 'silver'),
  ('Gold Masterclass', 'An advanced session just for Gold members.', '2024-07-17 17:00:00', '', 'gold');
```

---

### 5. Run the App

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🧪 Demo User Credentials

| Tier      | Email              | Password      |
|-----------|--------------------|---------------|
| Free      | free@test.com      | freepass      |
| Silver    | silver@test.com    | silverpass    |
| Gold      | gold@test.com      | goldpass      |
| Platinum  | platinum@test.com  | platinumpass  |

> 🛠️ Make sure to create these users in Clerk and set `publicMetadata.tier` accordingly.

---

## 📁 File Structure

```text
app/
  layout.tsx
  globals.css
  events/page.tsx
  sign-in/[[...rest]]/page.tsx
components/
  EventsList.tsx
  UpgradeTier.tsx
lib/
  supabase.ts
  tierRank.ts
.env.local
```

---

## 📦 Deployment

1. Push the project to GitHub.

2. Deploy to [Vercel](https://vercel.com)

3. In your Vercel dashboard, set the following environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your clerk publishable key>
CLERK_SECRET_KEY=<your clerk secret key>
NEXT_PUBLIC_SUPABASE_URL=<your supabase url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your supabase anon key>
```

4. In **Clerk**, go to Project Settings → **Frontend** and add your Vercel app domain under Allowed Origins.

5. In **Supabase**, go to Project Settings → **API** and add your deployed domain to **Allowed Redirect URLs**.

