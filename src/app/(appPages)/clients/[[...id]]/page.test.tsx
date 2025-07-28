import { render } from '@testing-library/react';
import ClientPage from './page';
import { getCountries } from '../actions';

jest.mock('../actions');

it('renders new client form without crashing', async () => {
  (getCountries as jest.Mock).mockResolvedValue([]);
  const Page = await ClientPage({ params: Promise.resolve({}) });
  render(Page);
});
