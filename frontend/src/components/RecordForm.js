import { useState } from "react";
import { useRecordsContext } from "../hooks/useRecordsContext"; // Make sure to replace with the correct path
import { useAuthContext } from "../hooks/useAuthContext";

const RecordForm = () => {
  const { dispatch } = useRecordsContext(); // Make sure to replace with the correct context
  const { user } = useAuthContext();

  const [description, setDescription] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const record = { description, number1, number2 };

    const response = await fetch('/api/records', {
      method: 'POST',
      body: JSON.stringify(record),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setDescription('');
      setNumber1('');
      setNumber2('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_RECORD', payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Record</h3>

      <label>Description:</label>
      <input 
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes('description') ? 'error' : ''}
      />

      <label>Number 1:</label>
      <input 
        type="number"
        onChange={(e) => setNumber1(e.target.value)}
        value={number1}
        className={emptyFields.includes('number1') ? 'error' : ''}
      />

      <label>Number 2:</label>
      <input 
        type="number"
        onChange={(e) => setNumber2(e.target.value)}
        value={number2}
        className={emptyFields.includes('number2') ? 'error' : ''}
      />

      <button>Add Record</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default RecordForm;
