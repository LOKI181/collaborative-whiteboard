import React from 'react';
import type { User } from '../types';

interface UserPanelProps {
  users: User[];
}

export const UserPanel: React.FC<UserPanelProps> = ({ users }) => {
  return (
    <div className="user-panel">
      <h3>Online Users</h3>
      <div className="user-list">
        <div className="user-item you">
          <div className="user-avatar" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            Y
          </div>
          <span>You</span>
          <span className="user-status" />
        </div>
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <div className="user-avatar" style={{ background: user.color }}>
              {user.name[0]}
            </div>
            <span>{user.name}</span>
            <span className="user-status" />
          </div>
        ))}
      </div>

      <div className="panel-divider" />

      <div className="panel-info">
        <strong>Quick Tips:</strong><br />
        Draw on the canvas to collaborate in real-time. Other users' cursors are shown live.
      </div>
    </div>
  );
};
