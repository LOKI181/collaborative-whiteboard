import React from 'react';
import type { User } from '../types';

interface UserCursorsProps {
  users: User[];
}

export const UserCursors: React.FC<UserCursorsProps> = ({ users }) => {
  return (
    <>
      {users.map(
        (user) =>
          user.cursor && (
            <div
              key={user.id}
              className="remote-cursor"
              style={{
                left: user.cursor.x,
                top: user.cursor.y,
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ filter: `drop-shadow(1px 1px 2px rgba(0,0,0,0.3))` }}
              >
                <path
                  d="M5 3L19 12L12 13L9 20L5 3Z"
                  fill={user.color}
                  stroke="white"
                  strokeWidth="1"
                />
              </svg>
              <span
                className="cursor-label"
                style={{ backgroundColor: user.color }}
              >
                {user.name}
              </span>
            </div>
          )
      )}
    </>
  );
};
