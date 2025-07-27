import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserSummary({ userId }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/v1/users/${userId}/summary`)
      .then(res => setSummary(res.data.summary))
      .catch(err => setSummary("Error while generating summary."))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div className="p-4 border rounded bg-white shadow-md">
      <h3 className="font-bold mb-2">User Summary</h3>
      {loading ? <p>Loading…</p> : <p>{summary}</p>}
    </div>
  );
}

export default UserSummary;
