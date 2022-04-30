import { useState } from 'react';

// hook for calling async functions and getting loading states
const useAsync = <Args extends any[], Res>(
  _func: (...rest: Args) => Res
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Res | null>(null);

  const func = async (...rest: Args) => {
    setLoading(true);
    if (data) setData(null);
 
    try {
      const d = await _func(...rest);
      setData(d);
      return data;
    } finally {
      setLoading(false);
    }
  };
  
  return { func, data, loading };
};

export default useAsync;