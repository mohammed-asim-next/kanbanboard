function ToDoAddForm({handleChange,handleSubmit,input}){
    return (
        <>
        <div className="h-[300px] w-[50%] flex justify-around items-center flex-col">
          <h1 className="text-2xl">Add New Task</h1>
          <form
            className="h-[300px] w-[100%] flex justify-around items-center flex-col"
            action=""
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              name="title"
              id=""
              placeholder="Enter Task Title"
              className="w-[250px] h-[45px] rounded-[10px] p-[10px] border-2 border-green-200 placeholder:p-[5px]"
              value={input.title}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <input
              type="text"
              name="description"
              className="w-[250px] h-[45px] rounded-[10px] p-[10px] border-2 border-green-200 placeholder:p-[5px]"
              id=""
              placeholder="Enter Task Description"
              onChange={(e) => {
                handleChange(e);
              }}
              value={input.description}
            />
            <span className="flex justify-around w-[90%] text-xl">            
            Type Of Task : 
            <label htmlFor="todo"><input type="radio" name="tasktype" id="todo" onChange={(e) => {
                handleChange(e);
              }}
              value="todo" />ToDo</label>
            <label htmlFor="progress"><input type="radio" name="tasktype" id="progress" onChange={(e) => {
                handleChange(e);
              }}
              value="progress"  />In Progress</label>
            <label htmlFor="review"><input type="radio" name="tasktype" id="review" onChange={(e) => {
                handleChange(e);
              }}
              value="review"  />Peer Review</label>
            <label htmlFor="done"><input type="radio" name="tasktype" id="done" onChange={(e) => {
                handleChange(e);
              }}
              value="done" />Done</label>
            </span>
            <button className="h-[45px] w-[100px] bg-green-200 border-2 border-green-500 rounded-2xl">
              Add
            </button>
          </form>
        </div>
        </>

    )
}
export default ToDoAddForm