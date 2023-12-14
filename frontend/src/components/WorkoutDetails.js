// import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
// import { useAuthContext } from '../hooks/useAuthContext'

// // date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

// const WorkoutDetails = ({ workout }) => {
//   const { dispatch } = useWorkoutsContext()
//   const { user } = useAuthContext()

//   const handleClick = async () => {
//     if (!user) {
//       return
//     }

//     const response = await fetch('/api/workouts/' + workout._id, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${user.token}`
//       }
//     })
//     const json = await response.json()

//     if (response.ok) {
//       dispatch({type: 'DELETE_WORKOUT', payload: json})
//     }
//   }

//   return (
//     <div className="workout-details">
//       <h4>{workout.title}</h4>
//       <p><strong>Load (kg): </strong>{workout.load}</p>
//       <p><strong>Reps: </strong>{workout.reps}</p>
//       <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
//       <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
//     </div>
//   )
// }

// export default WorkoutDetails


import React, { useState } from 'react';
import axios from 'axios';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedWorkout, setUpdatedWorkout] = useState({
    title: workout.title,
    reps: workout.reps,
    load: workout.load,
  });

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`/api/workouts/${workout._id}`, updatedWorkout, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch({ type: 'UPDATE_WORKOUT', payload: response.data });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating workout:', error);
    }
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        dispatch({ type: 'DELETE_WORKOUT', payload: workout._id });
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      {isEditing ? (
        <div>
          {/* Add form inputs for updating workout */}
          <input
            type="text"
            value={updatedWorkout.title}
            onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, title: e.target.value })}
          />
          <input
            type="number"
            value={updatedWorkout.reps}
            onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, reps: e.target.value })}
          />
          <input
            type="number"
            value={updatedWorkout.load}
            onChange={(e) => setUpdatedWorkout({ ...updatedWorkout, load: e.target.value })}
          />
          <button onClick={handleUpdate}>Update</button>
          {/* Keep the existing delete button */}
          <span className="material-symbols-outlined" onClick={handleDelete}>
            delete
          </span>
        </div>
      ) : (
        <div>
          {/* Add button to toggle edit mode */}
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default WorkoutDetails;
