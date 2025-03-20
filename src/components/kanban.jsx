import { use, useEffect, useState } from "react";
import ToDo from "./todo";
import Progress from "./Progress";
import Review from "./review";
import Done from "./done";
import ToDoAddForm from "./todoaddform";
import { kanban } from "../../Database/instance";
import { ToastContainer, toast } from 'react-toastify';

function Kanban() {
  let [input, setInput] = useState({
    title: "",
    description: "",
    tasktype:""
  });
  let [todo, setToDo] = useState([
  ]);
  let [progress, setProgress] = useState([]);
  let [review, setReview] = useState([]);
  let [done, setDone] = useState([]);
  function handleChange(e) {
    let { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }
  //fetching todo object from backend or json
  useEffect(()=>{
    kanban.get("/todo").then((res)=>{
      setToDo(res.data);
    }).catch(()=>{

    })
    
   
    },[todo])
  //fetching progress objects from backend or json   
  useEffect(()=>{
    kanban.get("/progress").then((res)=>{
      setProgress(res.data);
    }).catch(()=>{

    })
  },[progress])
  //fetching review objects from backend or json
  useEffect(()=>{
    kanban.get("/review").then((res)=>{
      setReview(res.data);
    }).catch(()=>{

    })
  },[review])
  //fetching done objects from backend or json
  useEffect(()=>{
    kanban.get("/done").then((res)=>{
      setDone(res.data)
    }).catch(()=>{

    })

  },[done])
  
  //handle submit form or adding new tasks
  function handleSubmit(e) {
    e.preventDefault();
    if(input.tasktype == "todo"){
      kanban.post("/todo",input).then(()=>{
        toast.success("New Task Added Successfully To TO-DO");
        setToDo([input, ...todo]);
      }).catch(()=>{
        toast.error("Something went wrong");
      })
    }else if(input.tasktype == "progress"){
      kanban.post("/progress",input).then(()=>{
        toast.success("New Task Added Successfully To In Progress");
      }).catch(()=>{
        toast.error("Something went wrong");
      });
    }else if(input.tasktype == "review"){
      kanban.post("/review",input).then(()=>{
        toast.success("New Task Added Successfully To Peer Review");
        setProgress([input, ...progress]);
      }).catch(()=>{
        toast.error("Something went wrong");
      });
      setReview([input, ...review]);
    }else if(input.tasktype == "done"){
      kanban.post("/done",input).then(()=>{
        toast.success("New Task Added Successfully To Done");
        setDone([input, ...done]);
      }).catch(()=>{
        toast.error("Something went wrong");
      });
    }
    setInput({
      title: "",
      description: "",
      tasktype:""
    });
  }
  const handleDragStart = (e, index, div) => {
    e.dataTransfer.setData("index", index);
    e.dataTransfer.setData("fromdiv", div);
  };
  const allowDrop = (ev) => {
    ev.preventDefault();
  };
  //deleting existing tasks from backend
  function deleteTask(index,divname){
    if(divname == "todo"){
      let item = todo[index];
      todo = todo.filter((data)=>{data.id != item.id})
      setToDo([...todo])
      kanban.delete(`/todo/${item.id}`).then(()=>{
      }).catch(()=>{
        });
    }else if(divname == "progress"){
      let item = progress[index];
      progress = progress.filter((data)=>{data.id != item.id})
      setProgress([...progress])
      kanban.delete(`/progress/${item.id}`).then(()=>{
      }).catch(()=>{
        });
    }else if(divname == "review"){
      let item = review[index];
      review = review.filter((data)=>{data.id != item.id})
      setReview([...review])
      kanban.delete(`/review/${item.id}`).then(()=>{
      }).catch(()=>{
        });
      }else if(divname == "done"){
        let item = done[index];
        done = done.filter((data)=>{data.id != item.id})
        setReview([...done])
        kanban.delete(`/done/${item.id}`).then(()=>{
        }).catch(()=>{
          });
        }
  }
  //handle the drop after dragstart and dragover like one div to another div
  const handelDrop = (e, todiv) => {
    let fromdiv = e.dataTransfer.getData("fromdiv");
    let index = e.dataTransfer.getData("index");
    // condition checking from which div it's coming and shifting to another div 
    if (fromdiv == "todo" && todiv == "progress") {
      let item = todo[index];
      todo = todo.filter((data) => data.id !== item.id);
      setToDo(todo);
      setProgress([item, ...progress]);      
      kanban.delete(`/todo/${item.id}`)// deleting from backend
      kanban.post(`/progress`,item).then(()=>{
        toast.success("The task was shifted from To-Do to Progress");
      }).catch(()=>{
        toast.error("Some Thing went Wrong");
      }); // shifting one task todo to progress
      
    } else if (fromdiv == "todo" && todiv == "review") {
      let item = todo[index];
      todo = todo.filter((data) => data.id !== item.id);
      setToDo(todo);
      setReview([item, ...review]);
      kanban.delete(`/todo/${item.id}`);
      kanban.post(`/review`,item).then(()=>{
        toast.success("The task was shifted from To-Do to Review");
      });
    } else if (fromdiv == "todo" && todiv == "done") {
      let item = todo[index];
      todo = todo.filter((data) => data.id !== item.id);
      setToDo(todo);
      setDone([item, ...done]);
      kanban.delete(`/todo/${item.id}`);
      kanban.post(`/done`,item).then(()=>{
        toast.success("The task was shifted from To-Do to Done");
      });
    } else if (fromdiv == "progress" && todiv == "todo") {
      let item = progress[index];
      progress = progress.filter((data) => data.id !== item.id);
      setProgress(progress);
      setToDo([item, ...todo]);
      kanban.delete(`/progress/${item.id}`);
      kanban.post(`/todo`,item).then(()=>{
        toast.success("The task was shifted from Progress to Todo");
      }).catch(()=>{
        toast.error("Some Thing went Wrong");
      });;
    }else if (fromdiv == "progress" && todiv == "review") {
        let item = progress[index];
        progress = progress.filter((data) => data.id !== item.id);
        setProgress(progress);
        setReview([item, ...review]);
        kanban.delete(`/progress/${item.id}`);
        kanban.post(`/review`,item).then(()=>{
          toast.success("The task was shifted from Progress to Review");
        }).catch(()=>{
          toast.error("Some Thing went Wrong");
        });
    }else if (fromdiv == "progress" && todiv == "done") {
        let item = progress[index];
        progress = progress.filter((data) => data.id !== item.id);
        setProgress(progress);
        setDone([item, ...done]);
        kanban.delete(`/progress/${item.id}`);
        kanban.post(`/done`,item).then(()=>{
          toast.success("The task was shifted from In Progress to Done");
        }).catch(()=>{
          toast.error("Some Thing went Wrong");
        });;
    }else if (fromdiv == "review" && todiv == "todo") {
        let item = review[index];
        review = review.filter((data) => data.id !== item.id);
        setReview(review)
        setToDo([item, ...todo]);
        kanban.delete(`/review/${item.id}`);
        kanban.post(`/todo`,item).then(()=>{
          toast.success("The task was shifted from Peer Review to To-Do");
        }).catch(()=>{
          toast.error("Some Thing went Wrong");
        });;
    }else if (fromdiv == "review" && todiv == "progress") {
        let item = review[index];
        review = review.filter((data) => data.id !== item.id);
        setReview(review)
        setProgress([item, ...progress]);
        kanban.delete(`/review/${item.id}`);
        kanban.post(`/progress`,item).then(()=>{
          toast.success("The task was shifted from Peer Review to Progress");
        }).catch(()=>{
          toast.error("Some Thing went Wrong");
        });;
    }else if (fromdiv == "review" && todiv == "done") {
        let item = review[index];
        review = review.filter((data) => data.id !== item.id);
        setReview(review)
        setDone([item, ...done]);
        kanban.delete(`/review/${item.id}`);
        kanban.post(`/done`,item).then(()=>{
          toast.success("The task was shifted from Peer Review to Done");
        }).catch(()=>{
          toast.error("Some Thing went Wrong");
        });;
    }else if (fromdiv == "done" && todiv == "todo") {
        let item = done[index];
        done = done.filter((data) => data.id !== item.id);
        setDone(done)
        setToDo([item, ...todo]);
        kanban.delete(`/done/${item.id}`);
        kanban.post(`/todo`,item).then(()=>{
          toast.success("The task was shifted from Done to To-Do");
        }).catch(()=>{
          toast.error("Some Thing went Wrong");
        });;
    }else if(fromdiv == "done" && todiv == "progress"){
        let item = done[index];
        done = done.filter((data) => data.id !== item.id);
        setDone(done)
        setProgress([item, ...progress]);
        kanban.delete(`/done/${item.id}`);
        kanban.post(`/progress`,item).then(()=>{
          toast.success("The task was shifted from Done to In Progress");
        }).catch(()=>{
          toast.error("Some Thing went Wrong");
        });;
    }else if(fromdiv == "done" && todiv == "review"){
        let item = done[index];
        done = done.filter((data) => data.id !== item.id);
        setDone(done)
        setReview([item, ...review]);
        kanban.delete(`/done/${item.id}`);
        kanban.post(`/review`,item).then(()=>{
          toast.success("The task was shifted from Done to Peer Review");
        }).catch(()=>{
          toast.error("Some Thing went Wrong");
        });;
    }
  };
  
  return (
    <>
            <ToastContainer position="top-center" autoClose={2000}
 />
  {/* main div */}
      <div className="flex justify-between items-center  flex-col bg-green-50 h-[160vh]">
        {/* heading div */}
        <div className="h-[100px] bg-green-200 w-[100%]   flex justify-center items-center rounded-2xl">
          <h1 className="text-6xl">Kanban Board</h1>
        </div>
        {/* Form Component */}
        <ToDoAddForm handleChange={handleChange} handleSubmit={handleSubmit} input={input} setInput={setInput}></ToDoAddForm>
        <div className="flex justify-around w-[95%] ">
          {/* ToDo Component */}
          <ToDo todo={todo} allowDrop={allowDrop} handelDrop={handelDrop} handleDragStart={handleDragStart} deleteTask={deleteTask}></ToDo>
          {/* Progress Component */}
          <Progress progress={progress} allowDrop={allowDrop} handelDrop={handelDrop} handleDragStart={handleDragStart} deleteTask={deleteTask}></Progress>
          {/* Review Component */}
          <Review review={review} allowDrop={allowDrop} handelDrop={handelDrop} handleDragStart={handleDragStart} deleteTask={deleteTask}></Review>
          {/* Done Component */}
           <Done  done={done} allowDrop={allowDrop} handelDrop={handelDrop} handleDragStart={handleDragStart} deleteTask={deleteTask}></Done>         
        </div>
        <div className="h-[100px]">

        </div>
      </div>
    </>
  );
}

export default Kanban;
