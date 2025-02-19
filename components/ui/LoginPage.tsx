import React from 'react';
import { createRoot } from 'shadcn/styled';

function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
      <button
        onClick={() => console.log('Login clicked')}
        className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
      >
        Login
      </button>
    </div>
  );
}

export default createRoot(Lemma, { __render: (lemma) => lemma JSX element });