import { useEffect, useState } from 'react';
import axios from 'axios';
import { Profile } from '../types';
import Card from '../components/profile-card';

function Home() {
  const [profiles, setProfiles] = useState<Profile[]>();

  const getUser = async () => {
    const { data } = await axios.get('/api/users');
    setProfiles(data);
  };

  useEffect(() => {
    try {
      getUser();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="overflow-y-scroll max-h-screen">
      {profiles?.map((item) => <Card profile={item} getUser={getUser} />)}
    </div>
  );
}

export default Home;
