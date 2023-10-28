import { Component } from 'react';

interface ICharacter {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
}

class CardList extends Component<{ items: ICharacter[] }> {
  constructor(props: { items: ICharacter[] }) {
    super(props);
  }

  render() {
    console.log(this.props.items)
    return (
      <div>
        {this.props.items.map((card) => (
          <li key={card.id}>
            <p>{card.status}</p>
            <img src={card.image} alt={card.name} />
            <div>
              <h3>{card.name}</h3>
              <p>
                Gender: <span>{card.gender}</span>
              </p>
              <p>
                Species: <span>{card.species}</span>
              </p>
              <p>
                Location: <span>{card.location.name}</span>
              </p>
              {/* <p>Year created: <span>{created}</span></p> */}
            </div>
          </li>
        ))}
      </div>
    );
  }
}

export default CardList;
