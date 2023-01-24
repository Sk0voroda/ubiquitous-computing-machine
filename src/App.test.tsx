import { it, describe, expect } from 'vitest';
import { render } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('renders', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
