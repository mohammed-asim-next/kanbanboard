import { IoTrashBinOutline } from "react-icons/io5";

function Card({handleDragStart,description,title,index,divname,deleteTask}){
    return <>
          <div
                    key={index}
                    className="h-[200px]  flex justify-between flex-col items-center bg-green-100 w-[95%] border-2px border-green-500 border-b-4 rounded-md mt-[25px] mr-[5px] ml-[5px] shadow-lg overflow-y-scroll break-all "
                    draggable
                    onDragStart={(e) => {
                      handleDragStart(e, index, divname);
                    }}
                  >
                   <h3 className="text-2xl bg-green-200 w-[100%]  text-center ">
                      {title}
                    </h3>

                    <div className="flex justify-center items-center text-center ">
                      <p className="text-justify ">{description}</p>
                    </div>
                    <div className="flex justify-end w-[100%]">
                    <IoTrashBinOutline onClick={()=>{deleteTask(index,divname)}} className="text-2xl "/>

                    </div>
                  </div>
    </>
}

export default Card;