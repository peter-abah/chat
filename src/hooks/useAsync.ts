import { useState } from 'react';

// hook for calling async functions and and getting loading and error states
const useAsync = <Args extends any[], Res>(
  _func: (...rest: Args) => Res
) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any | null>(null);
  const [data, setData] = useState<Res | null>(null);

  const func = async (...rest: Args) => {
    setLoading(true);
    if (error) setError(null);
    if (data) setData(null);
 
    try {
      const d = await _func(...rest);
      setData(d);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  
  return { func, data, error, loading };
};

export default useAsync;