import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../addfriendsstyle.css';

function AddFriends() {
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const navigate = useNavigate();
  const authKey = localStorage.getItem('myKey');

  useEffect(() => {
    fetch('https://c919-2600-6c40-75f0-82e0-75e2-b725-7087-47b7.ngrok-free.app/users', {
      method: 'GET',
      headers: {
        'Authorization': authKey,
      }
    })
    .then(response => response.json())
    .then(data => setFriends(data))
    .catch(error => console.error('Error fetching friends:', error));
  }, [authKey]);

  const handleSelectFriend = (e) => {
    const updatedSelectedFriends = Array.from(e.target.selectedOptions, option => ({
      "friend_id": parseInt(option.value, 10)
    }));
    setSelectedFriends(updatedSelectedFriends);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Promise.all(selectedFriends.map(friend => 
      fetch('https://c919-2600-6c40-75f0-82e0-75e2-b725-7087-47b7.ngrok-free.app/friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authKey,
        },
        body: JSON.stringify(friend)
      })
    ))
    .then(responses => {
      // Check if all responses are OK
      if (responses.every(response => response.ok)) {
        alert('All friends added successfully');
        navigate('/dashboard');
      } else {
        alert('Failed to add some or all friends. Please check the console for more details.');
        responses.forEach(response => {
          if (!response.ok) {
            response.json().then(json => console.error('Failed to add friend:', json));
          }
        });
      }
    })
    .catch(error => console.error('Error in adding friends:', error));
  };

  return (
    <div className="add-friends-container">
      <h1 className="add-friends-title">Add Friends</h1>
      <form className="add-friends-form" onSubmit={handleSubmit}>
        <select 
          multiple 
          className="add-friends-select"
          onChange={handleSelectFriend} 
          size="5"
        >
          {friends.map(friend => (
            <option key={friend.id} value={friend.id}>
              {friend.profileName}
            </option>
          ))}
        </select>
        <button type="submit" className="add-friends-submit">Submit Friends</button>
      </form>
    </div>
  );

}

export default AddFriends;
