import { Autocomplete, TextField } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import style from './ClientSearch.module.css';
import {
  getRecentClients,
  clientSearch,
  Client,
  RequestResult,
} from '@/app/(appPages)/clients/actions';
import { redirect } from 'next/navigation';

const ClientSearch = () => {
  const [options, setOptions] = useState<Client[]>([]);
  const [recent, setRecent] = useState<Client[]>([]);

  // TODO: find clients in database - start with recent clients.
  // setOptions initially loads recent clients, then changes with the search results

  useEffect(() => {
    const fetchClients = async () => {
      const response = await getRecentClients();
      const recent = response.success && response.data;
      setRecent(recent as Client[]);
      setOptions(recent as Client[]);
    };
    fetchClients();
  }, []);

  const goToClient = async (
    e: SyntheticEvent,
    value: Client | string | null
  ) => {
    await value;
    if (value && typeof value !== 'string') {
      redirect(`/clients/${value && value.id}`);
    }
  };

  const searchClients = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const searchTerm = target.value;
    if (searchTerm) {
      const response: RequestResult<Client[]> = await clientSearch(searchTerm);
      const results = response.success && response.data;
      console.log(results);
      setOptions(results as Client[]);
    } else {
      setOptions(recent);
    }
  };

  return (
    <div className={style.clientSearch}>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => {
          if (typeof option === 'string') return option;
          return `${option.name || ''}${
            option.name && option.company ? ', ' : ''
          }${option.company || ''}`;
        }}
        renderInput={(params) => (
          <TextField {...params} label="Search clients" />
        )}
        value={null}
        onChange={goToClient}
        onInputChange={searchClients}
        className={style.clientSearchInput}
      />
    </div>
  );
};

export default ClientSearch;
