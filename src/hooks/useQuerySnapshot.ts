import { useState, useEffect } from 'react'
import {
  onSnapshot,
  DocumentData,
  FirestoreError,
  Query,
  QueryDocumentSnapshot
} from 'firebase/firestore';

const useQuerySnapshot = <T extends DocumentData>(
  query: Query,
  transformData?: (d: QueryDocumentSnapshot) => T
) => {
  const [data, setData] = useState<DocumentData[]>([])
  const [error, setError] = useState<FirestoreError | null>(null)
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsub = onSnapshot(query, (snapshot) => {
      const result: DocumentData[] = [];

      snapshot.forEach((doc) => {
        let docData;
        if (transformData) {
          docData = transformData(doc);
        } else {
          docData = {...doc.data(), id: doc.id }
        }
        result.push(docData);;
      });

      setLoading(false);
      setData(result);
    }, (error) => {
      setError(error);
    })
    
    return () => unsub();
  }, [query, transformData]);

  return { data, error, loading };
};

export default useQuerySnapshot;