import { useState, useEffect } from 'react'
import {
  onSnapshot,
  DocumentData,
  FirestoreError,
  Query,
  QueryDocumentSnapshot
} from 'firebase/firestore';

const useQuerySnapshot = <T extends any>(
  key: any,
  query: Query,
  transformData?: (d: QueryDocumentSnapshot) => T
) => {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<FirestoreError | null>(null)
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsub = onSnapshot(query, (snapshot) => {
      const result: T[] = [];

      snapshot.forEach((doc) => {
        let docData;
        if (transformData) {
          docData = transformData(doc);
        } else {
          docData = {...doc.data(), id: doc.id } as T;
        }
        result.push(docData);
      });

      setLoading(false);
      setData(result);
    }, (error) => {
      setLoading(false);
      setError(error);
    })
    
    return () => unsub();
  }, [key, transformData]);

  return { data, error, loading };
};

export default useQuerySnapshot;