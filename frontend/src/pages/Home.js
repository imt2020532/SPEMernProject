// Home.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home" style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
      {/* Move the Link button to the extreme right */}
      <Link to="/cardio" style={{ marginLeft: 'auto' }}>
  <button style={{ padding: '8px', fontSize: '14px' }}>Go to Cardio Page</button>
</Link>

    </div>
  );
};

export default Home;
