import { expect, it } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import Select from './Select';
import renderWithProviders from '@/mock/renderWithProviders';
import { ADDITIONAL_VALUE_PER_PAGE } from '@/constants/constants';

describe('Pagination component', () => {
  it('renders correctly Pagination component', () => {
    const container = renderWithProviders(<Select />);
    expect(container).toMatchSnapshot();
  });

  it('should check the changes Select component', async () => {
    renderWithProviders(<Select />);

    const options = screen.getAllByTestId('option') as HTMLOptionElement[];
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();

    fireEvent.change(screen.getByTestId('select'), {
      target: { value: ADDITIONAL_VALUE_PER_PAGE },
    });
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
  });
});
