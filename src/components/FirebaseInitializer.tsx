'use client';

import { useEffect } from 'react';
import { app } from '../firebase';

const FirebaseInitializer: React.FC = () => {
  useEffect(() => {
    const initFirebase = async () => {
      await app;
    };
    initFirebase();
  }, []);

  return null;
};

export default FirebaseInitializer;
