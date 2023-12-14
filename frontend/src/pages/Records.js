// import React from 'react';

// const Records = () => {
//   return (
//     <div className="records">
//       <h1>Records Page</h1>
//       {/* Add your content for the Records page */}
//     </div>
//   );
// };

// export default Records;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecordsContext } from '../hooks/useRecordsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import RecordDetails from '../components/RecordDetails';
import RecordForm from '../components/RecordForm';

const Records = () => {
  const { records, dispatch } = useRecordsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await fetch('/api/records', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_RECORDS', payload: json });
      }
    };

    if (user) {
      fetchRecords();
    }
  }, [dispatch, user]);

  return (
    <div className="records">
      <h2>Records</h2>
      <div className="records-list">
        {records &&
          records.map((record) => (
            <RecordDetails key={record._id} record={record} />
          ))}
      </div>
      <RecordForm />
      <Link to="/">
        <button>Back to Workouts</button>
      </Link>
    </div>
  );
};

export default Records;
