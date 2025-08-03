import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EventsList from "@/components/EventsList";

export default function EventsPage() {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Show Events</h1>
      <EventsList />
    </main>
  );
}