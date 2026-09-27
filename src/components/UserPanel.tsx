import React from 'react';
import type { User } from '../types';

interface UserPanelProps {
  users: User[];
}

export const UserPanel: React.FC<UserPanelProps> = ({ users }) => {
  return (
    <div className="user-panel">
      <h3>Active Users ({users.length + 1})</h3>
      <div className="user-list">
        <div className="user-item you">
          <div className="user-avatar" style={{ backgroundColor: '#FFD700' }}>
            Y
          </div>
          <span>You</span>
        </div>
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <div className="user-avatar" style={{ backgroundColor: user.color }}>
              {user.name[0]}
            </div>
            <span>{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
