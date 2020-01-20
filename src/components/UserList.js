import React from 'react';
import { useAsync } from 'react-async';

// Then we'll fetch user data from this API
const loadUsers = async () =>
  await fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())

// Our component
function UserList() {
  const { data, error, isLoading } = useAsync({ promiseFn: loadUsers })
  if (isLoading) return "Loading..."
  if (error) return `Something went wrong: ${error.message}`
  if (data)

  // The rendered component
  return (
    <div className="container">
      <div>
        <h2>React Async - Random Users</h2>
      </div>
      {data.map(user=> (
        <div key={user.username} className="row">
          <div className="col-md-12">
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;