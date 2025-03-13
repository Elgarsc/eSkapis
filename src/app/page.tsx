"use client";

import { LandingPage } from "@/components/LandingPage";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      return; 
    } else if (isLoaded && isSignedIn) {
      router.push("/home"); 
    }
  }, [isSignedIn, isLoaded, router]);

  return (<LandingPage/>);
}