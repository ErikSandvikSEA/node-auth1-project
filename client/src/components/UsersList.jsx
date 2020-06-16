import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersList = () => {
     const [users, setUsers] = useState('')

     const fetchUsers = () => {
          axios
               .get('http://localhost:8000/api/users')
               .then(response => {
                    console.log(response)
                    // setUsers(response.data)
               })
               .catch(err => {
                    console.log(err)
               })
     }

     useEffect(() => {
          fetchUsers()
     }, [])

     return (
          <div>
               <h1>Hi</h1>
          </div>
     )
}

export default UsersList