'use client';
import { useState } from "react";

export default function Home() {
  const [poem, setPoem] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const generateMessage = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch('/api/word-gen', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic }),
    });

    const poemData = await response.json();
    setPoem(poemData.poem);
    setLoading(false);
  };

  return (
    <form onSubmit={generateMessage} className="flex flex-col gap-6 p-4">
      {/* Replacing 🌳 with the marimo image */}
      <h1 className="text-3xl font-bold text-center flex justify-center items-center">
        Talk with 
        <img
          src="/marimo.png"
          alt="Marimo"
          width={100}
          height={100}
          className="inline-block ml-2"
        />
      </h1>
      <input
        type="text"
        placeholder="How's your land life?"
        name="topic"
        onChange={(event) => setTopic(event.target.value)}
        value={topic}
        className="w-full"
      />
      <button type="submit" disabled={loading} className="w-full">
        {loading ? 'Thinking...' : 'Get message from Mr. Marimo💌'}
      </button>
      <div className="mt-6">
        {poem ? (
          <div className="bg-[var(--background)] p-6 rounded-md no-shadow">
            <h2 className="text-xl font-bold">
              Marimo's Message
            </h2>
            <p className="mt-2">{poem}</p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
