import { render, screen } from '@testing-library/react';

import Page, { getServerSideProps } from '@/pages';
import { IData, IDataResult } from '@/types/types';
import RenderWithNextRouter from '@/mock/RenderWithNextRouter';
import { AlbertMock, initialCharacterArrayMock } from '@/mock/cardsMock';
import { handlers } from '@/mock/handlers';
import { gsspCtx, setupMockServer } from '@/mock/setupTests';

const server = setupMockServer(...handlers);

describe('Main Page', () => {
  it('renders correctly Main Page', () => {
    const container = render(
      <RenderWithNextRouter>
        <Page
          data={{
            info: { count: 20, pages: 1 },
            results: initialCharacterArrayMock,
          }}
        />
      </RenderWithNextRouter>
    );

    expect(container).toMatchSnapshot();
  });

  it('should 404 page', async () => {
    server.use(handlers[0]);
    const res = (await getServerSideProps(
      gsspCtx({ query: { name: 'not-found' } })
    )) as { props: { data: IData; card: IDataResult | null } };

    if ('props' in res) {
      const { props } = res;
      if ('data' in props) {
        const { data } = props;
        render(<Page data={data} />);
        expect(screen.getByTestId('nothing-found-button')).toBeInTheDocument();
      }
    }
  });

  it('should get details data', async () => {
    const res = (await getServerSideProps(
      gsspCtx({ query: { details: AlbertMock.id.toString() } })
    )) as { props: { data: IData; card: IDataResult | undefined } };

    if ('props' in res) {
      const { props } = res;
      if ('data' in props && 'card' in props) {
        const { data, card } = props;
        render(<Page data={data} card={card} />);
        expect(screen.getByTestId('card-details')).toBeInTheDocument();
      }
    }
  });
});
