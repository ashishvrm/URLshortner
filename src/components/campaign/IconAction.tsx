import React, { forwardRef } from 'react';

interface ActionButtonProps {
  ariaLabel: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ ariaLabel, Icon, onClick }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={ariaLabel}
        className="p-2 text-gray-400 hover:text-gray-500"
        onClick={onClick}
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
      </button>
    );
  }
);

ActionButton.displayName = 'ActionButton';

export default ActionButton;
