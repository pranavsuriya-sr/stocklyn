import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import "./index.css";

// Replace placeholders with actual Supabase project details
const supabase = createClient(
  "https://hqenglckisxxnilbjpim.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZW5nbGNraXN4eG5pbGJqcGltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3MDk0NDIsImV4cCI6MjA1MTI4NTQ0Mn0.0c0EPJVLBQUBVdXyWbCqrQkYRiOuU9yjNTKjCkr-Y-s"
);

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Fetch the current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Subscribe to authentication state changes
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    // Cleanup subscription on component unmount
    return () => {
      subscription.subscription?.unsubscribe();
    };
  }, []);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded shadow-md">
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
        </div>
      </div>
    );
  } else {
    return <div>Logged in!</div>;
  }
}
