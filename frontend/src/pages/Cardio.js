import React, { useState } from 'react';

const Cardio = () => {
  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState('');
  const [activityType, setActivityType] = useState('walk');
  const [caloriesBurnt, setCaloriesBurnt] = useState(null);

  const calculateCalories = () => {
    const metValues = {
      walk: 3.9,
      jog: 7.0,
      run: 12.0,
    };

    const met = metValues[activityType];
    const durationHours = duration / 60; // Convert minutes to hours
    const calories = (met * weight * durationHours) / 200;

    setCaloriesBurnt(calories);
  };

  return (
    <div>
      <h2>BURNING...</h2>
      <form>
        <label>Weight (kg):</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />

        <label>Duration (minutes):</label>
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />

        <label>Activity Type:</label>
        <select value={activityType} onChange={(e) => setActivityType(e.target.value)}>
          <option value="walk">Walk</option>
          <option value="jog">Jog</option>
          <option value="run">Run</option>
        </select>

        <button type="button" onClick={calculateCalories}>
          Calculate Calories
        </button>
      </form>

      {caloriesBurnt !== null && (
        <p style={{ marginTop: '20px' }}>
          You burned approximately {caloriesBurnt.toFixed(2)} calories!
        </p>
      )}
    </div>
  );
};

export default Cardio;
