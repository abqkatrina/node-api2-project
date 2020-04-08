import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';



const App = () => {

const [ data, setData ] = useState([]);
// const [query, setQuery] = useState('');


// useEffect(() => {
//   axios.get('http://localhost:3000/api/posts')
//   .then(response => setData(response.data))
//   .catch(error =>console.log("oops", error))
// }, []);

useEffect(() => {
    axios.get('http://localhost:3000/api/posts')
      .then(response => {
        // console.log(response.data)
        // const posts = response.data.filter(posts =>
        //   posts.contents.toLowerCase().includes(query.toLowerCase()))
          setData(response.data)
        })
      .catch(error => console.log('crap!', error))
  }, []);

//  const handleInputChange = event => {
//     setQuery(event.target.value);
// };

  return (
    <div className="App">
     <div className="table">
       <ul>
         {/* <li>
            <input
              type="text"
              onChange={handleInputChange}
              value={query}
              name="name"
              tabIndex="0"
              className="prompt search-name"
              placeholder="Search Contents"
              autoComplete="off"
            />
          </li>
          <li><button type="submit">search</button></li> */}
         <li>
           {data.map((post)=>{
            return(<li>"{post.title}"<br/>
           ({post.contents})<br/></li>)
           })}
        </li>
       </ul>
     </div>
    </div>
  )
}

export default App;
