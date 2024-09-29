import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [delayFinished, setDelayFinished] = useState(false); // Track delay state

  // Effect to check if the component has mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Effect to manage loading delay
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDelayFinished(true);
      setIsLoading(false); // End loading after the delay
    }, 500); // Set the desired delay time in milliseconds

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
  }, []);

  useEffect(() => {
    if (isMounted && delayFinished && !loading) {
      if (!user) {
        // If the user is not authenticated, redirect to login
        router.push("/login");
      }
    }
  }, [user, loading, isMounted, delayFinished, router]);

  if (!isMounted || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return <>{children}</>;
}
