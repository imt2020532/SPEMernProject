import { useRecordsContext } from '../hooks/useRecordsContext'; // Make sure to import the appropriate context
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const RecordDetails = ({ record }) => {
  const { dispatch } = useRecordsContext(); // Use the appropriate context
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/records/' + record._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_RECORD', payload: json }); // Make sure to have DELETE_RECORD type in your reducer
    }
  };

  return (
    <div className="record-details">
      <h4>{record.title}</h4>
      <p><strong>Number 1: </strong>{record.number1}</p>
      <p><strong>Number 2: </strong>{record.number2}</p>
      <p>{formatDistanceToNow(new Date(record.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  );
};

export default RecordDetails;
