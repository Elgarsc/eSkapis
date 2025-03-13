// src/components/LandingPage.tsx
"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";

export function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to eSkapis</h1>
      <p className="text-lg text-gray-700 mb-8">
        Your personal wardrobe organizer.
      </p>
      <div className="flex space-x-4">
        <SignInButton mode="modal">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign up
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Sign In
          </button>
        </SignUpButton>
      </div>
    </div>
  );
}