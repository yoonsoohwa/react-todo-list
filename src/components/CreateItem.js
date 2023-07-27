import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateItem(){
  const [values, setValues] = useState({
    task:"", due:""
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const Navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, [])

  const onSubmit = (event) => {
    event.preventDefault(); //버튼 클릭시 새로고침X
    
    fetch(`${process.env.REACT_APP_BACKEND_API_URI}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task: values.task, 
        due: values.due, 
        status: "todo"
      })
    }).then((res) => {
      if(res.ok){
        alert("Created new item!");
        Navigate("/todo");
      };
    });
  };

  return (
  <form onSubmit={onSubmit}>
    <div className="input_area">
      <p>Task</p>
      <input type="text" name="task" value={values.task} onChange={handleChange} ref={ref} required/>
      <p>Due</p>
      <input type="date" name="due" value={values.due} onChange={handleChange} required/>
    </div>
    <button>Create</button>
  </form>)
};