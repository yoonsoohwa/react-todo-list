import {Link} from "react-router-dom"

export default function Header(){
  return (
    <div className="header">
      <h1>
        <Link to="/">todo-list</Link>
      </h1>
      <div className="menu">
        <Link to="/todo" className="link">
          <button>Todo</button>
        </Link>
        <Link to="/done" className="link">
          <button>Done</button>
        </Link>
        <Link to="/create_item" className="link">
          <button>Add</button>
        </Link>
      </div>
    </div>
  )
}