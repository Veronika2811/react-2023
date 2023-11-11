import { expect, it } from 'vitest';
import { HashRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { CharactersProvider } from '../../context/CharactersProvider';
import Select from './Select';
import { ADDITIONAL_VALUE_PER_PAGE } from '../../constants/constants';

describe('Pagination component', () => {
  it('renders correctly Pagination component', () => {
    const container = render(
      <HashRouter>
        <CharactersProvider>
          <Select />
        </CharactersProvider>
      </HashRouter>
    );
    expect(container).toMatchSnapshot();
  });

  it('should check the changes Select component', async () => {
    render(
      <HashRouter>
        <CharactersProvider>
          <Select />
        </CharactersProvider>
      </HashRouter>
    );

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
