'use client';
import { useState } from "react";

export default function Home() {
  const [poem, setPoem] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const generatePoem = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch('/api/word-gen', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic: topic,
      })
    });

    const poemData = await response.json();
    setPoem(poemData.poem);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold text-[var(--foreground)]">
        Create Your Marimo Poem
      </h1>
      <form onSubmit={generatePoem} className="w-full max-w-lg space-y-4">
        <input
          type="text"
          placeholder="Enter a calming theme for marimo"
          name="topic"
          onChange={(event) => setTopic(event.target.value)}
          value={topic}
          className="w-full"
        />
        <button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating...' : 'Generate Poem'}
        </button>
      </form>
      <div className="w-full max-w-lg mt-6">
        {poem ? (
          <div className="bg-[var(--accent)]/10 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-[var(--foreground)]">
              Marimo's Whimsical Poem
            </h2>
            <p className="text-[var(--foreground)]">{poem}</p>
          </div>
        ) : (
          <p className="text-[var(--foreground)]">Let your creativity flow!</p>
        )}
      </div>
    </div>
  );
}
