import { useState } from "react";

export default function Item({item: i}){
  const [item, setItem] = useState(i);

  const toggle = () => {
    fetch(`${process.env.REACT_APP_BACKEND_API_URI}/items/${item.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...item,
        status: item.status === "done" ? "todo" : "done"
      }),
    }).then((res) => {
      if(res.ok) {
        setItem({
          ...item,
          status: item.status === "done" ? "todo" : "done"
        });
      }
    });
  }

  const deleteItem = () => {
    if(window.confirm("삭제하시겠습니까?")) {
      fetch(`${process.env.REACT_APP_BACKEND_API_URI}/items/${item.id}`, {
        method: "DELETE"
      }).then((res) => {
        if(res.ok) {
          setItem({ id: 0 })
          console.log(item);
        }
      });
    }
  }

  if(item.id === 0) {
    return null;
  }

  return (
    <tr>
      <td>
        <input 
          type="checkbox" 
          checked={i.status === "done" ? true : false }
          onClick={toggle}
        />
      </td>
      <td>{i.task}</td>
      <td>{i.due}</td>
      <td><button onClick={deleteItem}>delete</button></td>
    </tr>
  )
}