import changePerPage from './changePerPage';
import {
  initialCharacterArrayMock,
  first10СharactersMock,
  last10СharactersMock,
} from '../../mock/cardsMock';

describe('Change per page function', () => {
  it('should return the first 10 cards', () => {
    expect(changePerPage(initialCharacterArrayMock, '1', '10')).toEqual(
      first10СharactersMock
    );
  });
  it('should return the last 10 cards', () => {
    expect(changePerPage(initialCharacterArrayMock, '2', '10')).toEqual(
      last10СharactersMock
    );
  });
  it('1', () => {
    expect(changePerPage(initialCharacterArrayMock, '2', ['10'])).toEqual(
      last10СharactersMock
    );
  });
});
