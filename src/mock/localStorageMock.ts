const mockLocalStorage = () => {
  const setItemMock = vi.fn();
  const getItemMock = vi.fn();

  beforeEach(() => {
    Storage.prototype.setItem = setItemMock;
    Storage.prototype.getItem = getItemMock;
  });

  afterEach(() => {
    setItemMock.mockRestore();
    getItemMock.mockRestore();
  });

  return { setItemMock, getItemMock };
};

export const { setItemMock, getItemMock } = mockLocalStorage();
