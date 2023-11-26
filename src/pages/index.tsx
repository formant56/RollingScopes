import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the dynamic page with default query parameters
    router.push('/query=-page=1-limit=10');
  }, [router]);

  return <div>Loading...</div>;
};

export default HomePage;
