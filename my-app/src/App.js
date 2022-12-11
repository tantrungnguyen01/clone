import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [value, setValue] = useState({
    fullname: "",
    age: "",
    address: ""
  })

  const [data, setdata] = useState([]);

  const [id,setid]=useState();

  const [isbutton,setisbutton]=useState(true);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = () => {
    axios({
      method: "POST",
      url: "http://localhost:3000/data",
      data: value
    }).then((res) => console.log(res.statusText))
      .then(() => {
        window.location.reload();
      })
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:3000/data",
    }).then((res) => {
      setdata(res.data)
    })
  }, []);

  // console.log(data);

const hadleDelete=(id)=>{
  axios({
    method:"DELETE",
    url:`http://localhost:3000/data/${id}`
  }).then((res)=> console.log(res))
  .then(()=>{
    window.location.reload()
  })
}

const handlerepair=(id)=>{
  data.map((data)=>{
    if(data.id === id){
      setValue({
        fullname:data.fullname,
        age:data.age,
        address:data.address,
      })
      setid(data.id)
      setisbutton(false)
    }
  })
}

const handleput=()=>{
  axios({
    method:"PUT",
    url:`http://localhost:3000/data/${id}`,
    data: value
  })
  .then((res)=>console.log(res.statusText))
  .then(() => {
    window.location.reload()
  })
}


  return (
    <div className="App">
      <div>
        <input placeholder="name" name="fullname" onChange={handleChange} value={value.fullname} ></input><br />
        <input placeholder="age" name="age" onChange={handleChange} value={value.age} ></input><br />
        <input placeholder="address" name="address" onChange={handleChange} value={value.address} ></input><br />
       { isbutton ? <button onClick={handleSubmit} >add</button> : <button onClick={handleput} >sửa</button> } 
      </div>

      {
        data && data?.map((data,index) => {
          return (
            <div key={index}>
              <ul>
                <li className='li' >{data?.fullname}</li>
                <li className='li' >{data?.age}</li>
                <li className='li' >{data?.address}</li>
              </ul>
              <ul className='ul'>
                <li className='li'><button onClick={()=>{hadleDelete(data?.id)}} >xóa</button></li>
                <li className='li'><button onClick={()=>{handlerepair(data.id)}} >sửa</button></li>
              </ul>
            </div>

          )
        })
      }



    </div>
  );

}

export default App;
