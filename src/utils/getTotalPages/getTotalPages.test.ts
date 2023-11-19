import getTotalPages from './getTotalPages';

describe('Get total pages function', () => {
  it('should return the number of pages', () => {
    expect(getTotalPages(20, 20)).toEqual(1);
    expect(getTotalPages(20, 10)).toEqual(2);
    expect(getTotalPages(30, 10)).toEqual(3);
  });
});
