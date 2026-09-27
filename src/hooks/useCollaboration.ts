import { useState, useEffect, useCallback, useRef } from 'react';
import type { User, Point } from '../types';
import { v4 as uuidv4 } from 'uuid';

const MOCK_USERS: Omit<User, 'id'>[] = [
  { name: 'Alice', color: '#FF6B6B', cursor: null },
  { name: 'Bob', color: '#4ECDC4', cursor: null },
  { name: 'Charlie', color: '#45B7D1', cursor: null },
];

export function useCollaboration() {
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [localCursor, setLocalCursor] = useState<Point | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const users = MOCK_USERS.map((u) => ({ ...u, id: uuidv4() }));
    setActiveUsers(users);

    // Simulate other users' cursor movements
    intervalRef.current = setInterval(() => {
      setActiveUsers((prev) =>
        prev.map((user) => ({
          ...user,
          cursor: {
            x: 100 + Math.sin(Date.now() / 1000 + user.id.charCodeAt(0)) * 300 + 400,
            y: 100 + Math.cos(Date.now() / 800 + user.id.charCodeAt(1)) * 200 + 200,
          },
        }))
      );
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const updateLocalCursor = useCallback((point: Point | null) => {
    setLocalCursor(point);
  }, []);

  return { activeUsers, localCursor, updateLocalCursor };
}
