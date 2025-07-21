import { Autocomplete, TextField } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import style from './ClientSearch.module.css';
import {
  getRecentClients,
  clientSearch,
  Client,
  RequestResult,
} from '@/app/(appPages)/clients/actions';
import { redirect } from 'next/navigation';

const searchClients = async (searchTerm: string) => {
  if (searchTerm) {
    const response: RequestResult<Client[]> = await clientSearch(searchTerm);
    const results = response.success && response.data;
    return results;
  } else {
    return [] as Client[];
  }
};

const ClientSearch = () => {
  const [options, setOptions] = useState<Client[]>([]);
  const [recent, setRecent] = useState<Client[]>([]);
  const [inputValue, setInputValue] = useState('');
  const debouncedInputValue = useDebounce<string>(inputValue, 500);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await getRecentClients();
      const recent = response.success && response.data;
      setRecent(recent as Client[]);
      setOptions(recent as Client[]);
    };
    fetchClients();
  }, []);

  useEffect(() => {
    if (debouncedInputValue) {
      console.log(debouncedInputValue);
      const res = searchClients(debouncedInputValue);
      res.then((result) => {
        if (result && result.length > 0) {
          setOptions(result);
        } else {
          setOptions(recent);
        }
      });
    } else {
      setOptions(recent);
    }
  }, [debouncedInputValue, recent]);

  const goToClient = async (
    e: SyntheticEvent,
    value: Client | string | null
  ) => {
    await value;
    if (value && typeof value !== 'string') {
      redirect(`/clients/${value && value.id}`);
    }
  };

  return (
    <div className={style.clientSearch}>
      <Autocomplete
        clearOnBlur
        clearOnEscape
        autoHighlight
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
        onInputChange={(e, value, reason) => {
          setInputValue(value);
          if (reason === 'clear' || reason === 'blur') setInputValue('');
        }}
        className={style.clientSearchInput}
      />
    </div>
  );
};

export default ClientSearch;
