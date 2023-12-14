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



//////////////////////////////////////////////////////////
///new attempt

import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from "react"
//import {DeleteIcon, EditIcon} from "@chakra-ui/icons"
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const [isEditing, setIsEditing] = useState(false); // State to manage edit form visibility

  
  const handleDelete = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }


  const handleEdit = () => {
    setIsEditing(true); // Set the state to open the edit form
  };


  const handleCancelEdit = () => {
    setIsEditing(false); // Set the state to close the edit form
  };


  const handleSubmitEdit = async (updatedWorkoutData) => {
    console.log(updatedWorkoutData);
    // Handle submission of updated workout data (e.g., API call to update)
    if (!user) {
      return
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
      body: updatedWorkoutData,
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'UPDATE_WORKOUT', payload: json})
    }

    // Once updated, you might want to close the edit form
    setIsEditing(false);
    // Perform actions to update the workout details
  };


  return (
    <div className="workout-details">
      {isEditing ? (
        /* Render edit form when isEditing state is true */
        <EditForm
          workout={workout}
          onCancel={handleCancelEdit}
          onSubmit={handleSubmitEdit}
        />
      ) : (
        /* Render workout details when not in edit mode */
        <>
          
          <p>
  <h4>{workout.title}</h4>
   
</p>

          <p><strong>Load (kg): </strong>{workout.load}</p>
          <p><strong>Reps: </strong>{workout.reps}</p>
          <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
          <p onClick={handleDelete}>Delete</p>
<p onClick={handleEdit}>Edit</p>
        </>
      )}
    </div>
  )
}

// EditForm component for editing workout details
const EditForm = ({ workout, onCancel, onSubmit }) => {
  // Implement form logic for editing workout details
  // You can use input fields and manage their states to collect updated details
  // onSubmit should trigger the handleSubmitEdit function in the WorkoutDetails component

  return (
    /* Example of an edit form structure */
    <div className="edit-form">
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text"
        onChange={(e) => {workout.title = e.target.value}}
        // value={workout.title}
      />

      <label>Load (in kg):</label>
      <input 
        type="number"
        onChange={(e) => {workout.load = e.target.value}}
        // value={workout.load}
      />

      <label>Reps:</label>
      <input 
        type="number"
        onChange={(e) => {workout.reps = e.target.value}}
        // value={workout.reps}
      />

      <button onClick={onCancel}>Cancel</button>
      <button onClick={() => onSubmit(workout)}>Save</button>
    </div>
  );
};

export default WorkoutDetails