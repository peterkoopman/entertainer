import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import style from './ClientSearch.module.css';

const ClientSearch = () => {
  const [options, setOptions] = useState<string[]>([]);
  // TODO: find clients in database - start with recent clients
  return (
    <div className={style.clientSearch}>
      <Autocomplete
        options={options}
        renderInput={(params) => (
          <TextField {...params} label="Search clients" />
        )}
        className={style.clientSearchInput}
      />
    </div>
  );
};

export default ClientSearch;
