import React from 'react';
import type { ComponentType } from 'react';

interface ActionButtonProps {
  ariaLabel: string;
  Icon: ComponentType<React.ComponentProps<'svg'>>;
}

const ActionButton: React.FC<ActionButtonProps> = ({ ariaLabel, Icon }) => (
  <button aria-label={ariaLabel} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
    <Icon className="h-5 w-5" aria-hidden="true" />
  </button>
);

export default ActionButton;
