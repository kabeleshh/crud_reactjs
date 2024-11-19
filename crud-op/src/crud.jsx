import React,{useState,useEffect} from "react";
import axios from 'axios';
import './App.css';

function Crud(){
    const [user,setUser] = useState([]);
    const [newuser,setNewUser] = useState({name:'',email:''});
    const [editUser,setEditUser] = useState(null);

    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((res)=>setUser(res.data))
    },[])

    function add(){
        axios.post('https://jsonplaceholder.typicode.com/users',newuser)
        .then((res)=>{setUser([...user,res.data]);
            setNewUser({name:" ",email:" "});
        });
    };

    const Edit = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setEditUser((prev)=>{
            return{...prev,[name]:value}
        })
    }

    const Update = (id) =>{
        axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,editUser)
        .then((res)=>{
            setUser(user.map((user)=> (user.id===id ? res.data : user)));
            setEditUser(null);
        })
    }

    const Delete = (id) =>{
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res)=>{
            setUser(user.filter((user)=> user?.id != id))
        })
    }

    return(
        <>
            <h1>crud</h1>
            <>
                <input type="text" value={newuser.name} onChange={(e)=>setNewUser({...newuser,name:e.target.value})}/>
                <input type="text" value={newuser.email} onChange={(e)=>setNewUser({...newuser,email:e.target.value})}/>
                <button onClick={add} >Add</button>
            </>
            <h2>Update User</h2>
            <ul>
                {user.map((user)=>(
                    <li key={user.id} >
                        {editUser?.id === user.id ? (
                            <>
                              <input type="text" value={editUser.name} name="name" onChange={Edit}/>
                              <input type="text" value={editUser.email} name="email" onChange={Edit}/>
                              <button onClick={()=>Update(user.id)}>Save</button>
                            </>    
                        ):(
                            <>
                            <div className="adduser">
                                <table>
                                    <thead>
                                    <tr className="adduser">
                                        <th>UserName</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr className="adduser">
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                 <button  onClick={()=>setEditUser(user)} >Edit</button>
                                                 <button onClick={()=> Delete(user.id)}>Delete</button>
                                            </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            </>  
                        )}

                    </li>
                ))
                }
            </ul>
        </>
    );
}

export default Crud;