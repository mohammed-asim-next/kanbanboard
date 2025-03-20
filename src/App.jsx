import './App.css'
import Kanban from './components/kanban';
import React, { useState } from "react";
function App() {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry", "Date"]);
  const [item2,setItem] = useState([])
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
    localStorage.setItem("newindex",index)
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("index");
    const updatedItems = [...items];
    const [movedItem] = updatedItems.splice(draggedIndex, 1);
    // updatedItems.splice(index,1);
    setItems(updatedItems);
    let newitem = items.at((localStorage.getItem("newindex")))
    setItem([newitem])
  };
  
  return <>
    <Kanban></Kanban>
    {/* <div className="w-64 mx-auto mt-5">
      {items.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, index)}
          className="p-3 border bg-gray-200 my-1 cursor-pointer"
        >
          {item}
        </div>
        
      ))}
      <div className='h-[200px] border-2 w-[200px]'>
      {item2.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, index)}
          className="p-3 border bg-gray-200 my-1 cursor-pointer"
        >
          {item}
        </div>
        
      ))}
    </div>
      
      </div> */}
    </>
 
}

export default App
