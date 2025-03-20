import Card from "./card";

function Progress({progress,allowDrop,handelDrop,handleDragStart,deleteTask}){
  return  <>
        <div
            className="w-[24%] h-[600px] border-2 border-green-500 overflow-auto rounded-[20px] relative "
            onDragOver={allowDrop}
            onDrop={(e) => {
              handelDrop(e, "progress");
            }}
          >
            <h1 className="text-4xl text-center bg-green-200 p-[20px] rounded-[15px] sticky top-0 ">
              In Progress
            </h1>
            {progress.length > 0 ? (
              progress.map((item, index) => {
                // cards
                let { id, title, description } = item;
                return (
                    <Card key={index} handleDragStart={handleDragStart} description={description} title={title} index={index} id={id} divname="progress" deleteTask={deleteTask}></Card>
                );
              })
            ) : (
              <h1 className="text-2xl text-center flex justify-center items-center h-[200px]">
                There Is No Task In Progress
              </h1>
            )}
          </div>

    </>
}

export default Progress;