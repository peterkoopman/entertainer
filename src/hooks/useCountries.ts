'use client';

import { useState, useEffect } from 'react';

interface Country {
  value: string;
  label: string;
}

const useCountries = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      const result = await fetch(
        'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code',
      );

      const data = await result.json();
      setCountries(data.countries);
      setIsLoading(false);
    };

    fetchCountries();
  }, []);

  return { countries, loading: isLoading };
};

export default useCountries;
