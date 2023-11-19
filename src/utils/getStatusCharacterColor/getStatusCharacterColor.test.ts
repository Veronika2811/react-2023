import getStatusCharacterColor from './getStatusCharacterColor';

describe('Get status characters color function', () => {
  it('should return default status color', () => {
    expect(getStatusCharacterColor('no status')).toEqual('card__label_grey');
  });
});
