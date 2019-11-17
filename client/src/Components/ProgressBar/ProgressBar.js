import React from 'react';
import './ProgressBar.scss';

export default function ProgressBar({ percent }) {
  return (
    <div class="progressBar">
      <div
        class="progressBar-percentage"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
