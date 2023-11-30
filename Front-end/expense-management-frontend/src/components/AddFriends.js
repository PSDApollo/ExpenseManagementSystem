import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../addfriendsstyle.css';

function AddFriends() {
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const navigate = useNavigate();
  const authKey = localStorage.getItem('myKey');

  useEffect(() => {
    document.body.style.background = "url('images/friendsimg.png') !important";
    document.body.style.backgroundSize = "cover";

    fetch('http://localhost:9111/users', {
      method: 'GET',
      headers: {
        'Authorization': authKey,
      }
    })
    .then(response => response.json())
    .then(data => setFriends(data))
    .catch(error => console.error('Error fetching friends:', error));

    return () => {
      document.body.style.background = null;
      document.body.style.backgroundSize = null;
    };
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
      fetch('http://localhost:9111/friends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authKey,
        },
        body: JSON.stringify(friend)
      })
    ))
    .then(responses => {
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
    <div className="page-container">
      <div className="content-wrapper">
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
      </div>
    </div>
  );
}

export default AddFriends;
