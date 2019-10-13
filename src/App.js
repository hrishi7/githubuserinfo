import React from 'react';
import WholeThing from './components/WholeThing';
import './App.css';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

import {useState, useEffect} from 'react';

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}
function App() {

  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = React.useState(false);
  const [totalUsers, setTotalUsers] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(async ()=>{
    setisLoading(true);
    let x = [];
    let result = await axios.get('https://api.github.com/search/users?q=location:bangalore');
    setTotalUsers(result.data.total_count);
    // console.log(result.data.items);
    result.data.items.forEach(async (one, i)=>{
      let singleUser = {};
      singleUser.userName = one.login;
      singleUser.dp = one.avatar_url;
      let repoCount = await axios.get(`https://api.github.com/users/${one.login}/repos`);
      singleUser.repoCount = repoCount.data.length;
      x.push(singleUser);
      if(i == result.data.items.length - 1){
        setUsers(x);
        setisLoading(false);
      }
    });
  },[])



  return (
    <div className="App">
      <center><h1>GitHub Users</h1>
      {isLoading?<CircularProgress  color="secondary" />:<h3></h3> }
      </center>
      <center>{totalUsers?<h4>Total Users in Bangalore {totalUsers}</h4>:<h5>No Data Found</h5>}</center>
      {users.length > 0 ?<WholeThing row = {users}/>:<h5></h5>}
    </div>
  );
}

export default App;
