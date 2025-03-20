import React, { useState } from 'react';

const DragAndDrop = () => {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3']);
  const [droppedItems, setDroppedItems] = useState([]);

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drag = (ev, index) => {
    ev.dataTransfer.setData('index', index);
  };

  const drop = (ev, target) => {
    ev.preventDefault();
    const index = ev.dataTransfer.getData('index');
    const item = items[index];

    if (target === 'div1') {
      setItems(items.filter((_, i) => i !== parseInt(index)));
    } else {
      setDroppedItems([...droppedItems, item]);
      setItems(items.filter((_, i) => i !== parseInt(index)));
    }
    if (target === 'div2') {
      setItems(items.filter((_, i) => i !== parseInt(index)));
    } else {
      setDroppedItems([...droppedItems, item]);
      setItems(items.filter((_, i) => i !== parseInt(index)));
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Source Div */}
      <div
        id="div1"
        onDrop={(e) => drop(e, 'div1')}
        onDragOver={allowDrop}
        style={divStyle}
      >
        <h3>Available Items</h3>
        {items.map((item, index) => (
          <div
            key={index}
            id={`drag${index}`}
            draggable
            onDragStart={(e) => drag(e, index)}
            style={itemStyle}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Target Div */}
      <div
        id="div2"
        onDrop={(e) => drop(e, 'div2')}
        onDragOver={allowDrop}
        style={divStyle}
      >
        <h3>Dropped Items</h3>
        {droppedItems.map((item, index) => (
          <div draggable  key={index} style={itemStyle}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

const divStyle = {
  width: '300px',
  height: '300px',
  border: '1px solid black',
  margin: '20px',
  padding: '10px',
  textAlign: 'center',
};

const itemStyle = {
  padding: '8px',
  margin: '5px',
  backgroundColor: 'lightblue',
  cursor: 'pointer',
};

export default DragAndDrop;
