import { ReactElement } from 'react';
import { render as rtlRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function render(ui: ReactElement) {
  return {
    ...rtlRender(ui),
    user: userEvent.setup(),
  };
}

// re-export everything
export * from '@testing-library/react';
export { render }; 