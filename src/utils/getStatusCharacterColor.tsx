const getStatusCharacterColor = (status: string) => {
  switch (status) {
    case 'Dead':
      return 'card__label_red';
    case 'Alive':
      return 'card__label_green';
    default:
      return 'card__label_grey';
  }
};

export default getStatusCharacterColor;
