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
    <form onSubmit={generatePoem} className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Generate Marimo Poem</h1>
      <input 
        type="text" 
        placeholder="Enter a theme for marimo's adventure" 
        name="topic"
        onChange={(event) => setTopic(event.target.value)}
        value={topic}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Loading..' : 'Create Poem'}
      </button>
      <div className="mt-4">
        {poem ? (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold">Marimo's Whimsical Poem</h2>
            <p>{poem}</p>
          </div>
        ) : (
          <p>Waiting for your creative input!</p>
        )}
      </div>
    </form>
  );
}
