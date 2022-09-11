import { useState, useEffect } from "react";
import { TaskBanner } from "./components/TaskBanner";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";
import { TaskTable } from "./components/TaskTable";
import { Container } from "./components/Container";

function App() {
  const [userName, setUserName] = useState("ricardo");
  const [taskItems, setTaskItems] = useState([]);
  const [rutItems,setRutItems]= useState([]);
  const [sexItems, setSexItems]= useState([]);
  const [cityItems,setCityItems]=useState([]);
  const [showCompleted, setshowCompleted] = useState(false);
  useEffect(() => {
    let data = localStorage.getItem("tasks");
    let rutData=localStorage.getItem('ruts');
    let sexData=localStorage.getItem('sexs');
    let cityData=localStorage.getItem('city');
    if (data) {
      setTaskItems(JSON.parse(data));
    }
    if(rutData){
      setRutItems(JSON.parse(rutData))
    }
    if(sexData){
      setSexItems(JSON.parse(rutData))
    }
    if(cityData){
      setCityItems(JSON.parse(cityData))
    }
    setUserName("Ricardo");
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);

  useEffect(()=>{
    localStorage.setItem('ruts',JSON.stringify(rutItems));
  },[rutItems])

  useEffect(()=>{
    localStorage.setItem('sexs',JSON.stringify(sexItems))
  })

  useEffect(()=>{
    localStorage.setItem('cities',JSON.stringify(cityItems))
  })

  const createNewTask = (taskName) => {
    if (!taskItems.find((t) => t.name === taskName))
      setTaskItems([...taskItems, { name: taskName, done: false }]);
  };
  const createNewRut=(rutName)=>{
    if(!rutItems.find((t)=>t.name===rutName));
    setRutItems([...rutItems,{name:rutName,done:false}])
  };
  const createNewSex=(sexName)=>{
    if(!sexItems.find((t)=> t.name===sexName))
    setSexItems([...sexItems,{name:sexName,done:false}])
  }
  const createNewCity=(cityName)=>{
    if(!cityItems.find((t)=>t.name===cityName))
    setCityItems([...cityItems,{name:cityName,done:false}])
  }
  const toggleTask = (task) =>
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );
  const toggleRut=(rut)=>
  setRutItems(
    rutItems.map((t)=>(t.name=== rut.name ? {...t,done:!t.done}:t))
  )
  const toggleSex=(sex)=>
  setSexItems(
    sexItems.map((t)=>(t.name===sex.name ? {...t,done:!t.done} :t))
  )
  const toggleCity=(city)=>
  setCityItems(
    cityItems.map((t)=>(t.name===city.name?{...t,done:!t.done} :t))
  )
  const cleanTasks = () => {
    setTaskItems(taskItems.filter((task) => !task.done));
    setshowCompleted(false);
  };
  const cleanRut=()=>{
    setRutItems(rutItems.filter((rut)=>!rut.done));
  }
  const cleanSex=()=>{
    setSexItems(sexItems.filter((sex)=>!sex.done))
  }
  return (
    <main className="bg-dark vh-100 text-white">
      <TaskBanner userName={userName} taskItems={taskItems} />
      <Container>
        <TaskCreator createNewTask={createNewTask} />
        <TaskCreator createNewTask={createNewRut}/>
        <TaskCreator createNewTask={createNewSex} />
        <TaskCreator createNewTask={createNewCity}/>
        <TaskTable tasks={taskItems} toggleTask={toggleTask} />
        <TaskTable tasks={rutItems} toggleTask={toggleRut} />
        <TaskTable tasks={sexItems} toggleTask={toggleSex} />
        <TaskTable tasks={cityItems} toggleTask={toggleCity} />
        <VisibilityControl
          description="Completed Tasks"
          isChecked={showCompleted}
          callback={(checked) => setshowCompleted(checked)}
          cleanTasks={cleanTasks}
        />
        {showCompleted && (
          <TaskTable
            tasks={taskItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </Container>
    </main>
  );
}
export default App;