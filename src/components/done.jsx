import Card from "./card";

function Done({done,allowDrop,handelDrop,handleDragStart,deleteTask}){
    return (
        <>
            <div
            className="w-[24%] h-[600px] border-2 border-green-500  overflow-auto rounded-[20px] relative "
            onDragOver={allowDrop}
            onDrop={(e) => {
              handelDrop(e, "done");
            }}
          >
            <h1 className="text-4xl text-center bg-green-200 p-[20px] rounded-[15px] sticky top-0 ">
              Done
            </h1>
            {done.length > 0 ? (
              done.map((item, index) => {
                // cards
                let { id, title, description } = item;
                return (
                    <Card key={index} handleDragStart={handleDragStart} description={description} title={title} index={index} id={id} divname="done" deleteTask={deleteTask}></Card>
                );
              })
            ) : (
              <h1 className="text-2xl text-center flex justify-center items-center h-[200px]">
                There Is No Task To Be Done
              </h1>
            )}
          </div>
        </>
    )
}

export default Done