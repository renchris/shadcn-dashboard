'use client';

import React, { useEffect, useState } from 'react';

// Sample data structure for the demo table
interface TableData {
  id: number;
  name: string;
  status: string;
  createdAt: string;
}

const sampleData: TableData[] = [
  { id: 1, name: 'Project Alpha', status: 'Active', createdAt: '2024-01-15' },
  { id: 2, name: 'Project Beta', status: 'Pending', createdAt: '2024-01-16' },
  { id: 3, name: 'Project Gamma', status: 'Completed', createdAt: '2024-01-17' },
  { id: 4, name: 'Project Delta', status: 'Active', createdAt: '2024-01-18' },
];

export default function DataTableDemo() {
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Properly handle component mounting to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulate data loading - this is where async operations should happen
  useEffect(() => {
    if (mounted) {
      // Simulate API call delay
      const timer = setTimeout(() => {
        setData(sampleData);
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [mounted]);

  // Don't render until mounted to avoid hydration mismatches
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-sm text-foreground/70">Loading data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Data Table Demo</h2>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground/70">ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground/70">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground/70">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground/70">Created</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-3 text-sm">{item.id}</td>
                <td className="px-4 py-3 text-sm font-medium">{item.name}</td>
                <td className="px-4 py-3 text-sm">
                  <span 
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Active' 
                        ? 'bg-green-100 text-green-700' 
                        : item.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-foreground/70">{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}