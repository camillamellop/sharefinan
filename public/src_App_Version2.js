import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ContactManagement from './components/ContactManagement';

const supabaseUrl = 'https://nxtxlueqzujqnsuqxmry.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54dHhsdWVxenVqcW5zdXF4bXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4Nzg4NjcsImV4cCI6MjA2NjQ1NDg2N30.Mq3vDWbk9bFhrOaK5MTOHZNNoh0w-878dH5ybOAp7m4';

export default function App() {
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    const initSupabase = async () => {
      const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
      setSupabase(createClient(supabaseUrl, supabaseKey));
    };
    initSupabase();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <ContactManagement supabase={supabase} />
      </main>
    </div>
  );
}