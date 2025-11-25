"use client";

import React, { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

const VisitorCounter: React.FC = () => {
  // In a real application, this count would be fetched from a backend API
  // and incremented on each unique visit.
  // For demonstration, we'll use a static placeholder.
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    // Simulate fetching a visitor count from an API
    // Replace this with actual API call to your backend (e.g., Supabase)
    const fetchVisitorCount = async () => {
      // Example: const response = await fetch('/api/visitors');
      // const data = await response.json();
      // setVisitorCount(data.count);
      
      // Placeholder:
      const simulatedCount = 12345; // Replace with dynamic data
      setVisitorCount(simulatedCount);
    };

    fetchVisitorCount();
  }, []);

  return (
    <div className="flex items-center justify-center space-x-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
      <Users className="h-4 w-4" />
      {visitorCount !== null ? (
        <span>{visitorCount.toLocaleString()} Visitors</span>
      ) : (
        <span>Loading visitors...</span>
      )}
    </div>
  );
};

export default VisitorCounter;