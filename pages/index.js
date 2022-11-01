import Tasks from "../components/Tasks/Tasks"
import TaskForm from "../components/TaskForm/TaskForm"
import { useEffect, useState } from "react"
import { AppContext } from "../context"
import HeadOG from "../components/HeadOG/HeadOG"
import staticMeta from "../public/static-meta"

function App() {

  const ogImage = '/img/og-image.jpg'

  const [isLoading, setIsLoading] = useState(false)    // state of checking loading status
  const [tasks, setTasks] = useState([])               // state of task list
  const [selectedTask, setSelectedTask] = useState({   // state of selected task
    task: undefined,
    isEdited: false,
    isAdded: false
  })

  const getTasks = async () => {          // get tasks data from server
    setIsLoading(true)

    const response = await fetch('https://api.jsonbin.io/v3/b/62f42bce5c146d63ca685ddd/latest', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'X-Access-Key': '$2b$10$Tbu56u.eDqBYkgSOU6.09.YElp/FnVVX/QAY8x6vsSMaj1rnTmuPS', //S
        'X-Bin-Meta': 'false'
      }
    })

    if (response.ok) {
      const tasksObj = await response.json()
      await setTasks(tasksObj.tasks)          // set data from server to tasks state
    } else {
      const error = new Error(`${response.status} - ${response.statusText}`)
      console.error(error)
    }

    setIsLoading(false)
  }

  useEffect(() => { getTasks() }, [])     // get tasks data from server at first render

  const convertDate = (date) => {    // convert date value to "dd.mm.yyyy" format by RegExp
    const dateRegExp = /(\d{4})-(\d{2})-(\d{2})/
    return date.replace(dateRegExp, '$3.$2.$1')
  }

  const addTask = () => {
    // if (selectedTask.isEdited || selectedTask.isAdded) {
    //   return false
    // }

    const maxID = tasks.reduce((prevID, task) => {
      return prevID < task.id ? task.id : prevID
    }, 1)
    setSelectedTask({
      task: {
        id: +maxID + 1,
        name: '',
        description: '',
        date: '',
        time: '',
        status: 'waiting'
      },
      isEdited: true,
      isAdded: true,
    })
  }

  const changeStatus = (taskID, status) => { // callback for changing status of current task
    setTasks(tasks => {
      return tasks.map(task => {             // loop over the tasks
        return task.id === taskID ?          // find the provided id
          {...task, status: status} :        // and updates status
          task                               // else returns unmodified item
      })
    })
  }

  const editTask = (taskID) => {    // callback for editing current task
    if (taskID) {                   // if the id of the required task is passed
      setSelectedTask({       // filter tasks by the passed id and set it in state
        task: tasks.filter(task => task.id === taskID)[0],
        isEdited: true,
        isAdded: false
      })
    } else {                        // else set only "isEdited" as "true"
      setSelectedTask(prevState => {
        return {
          ...prevState,
          isEdited: true
        }
      })
    }
  }

  const deleteTask = (taskID) => {     // callback for deleting current task
    if (taskID) {                      // if the id of the required task is passed
      setTasks(tasks => {        // filter tasks by the passed id and set it in state
        return tasks.filter(task => task.id !== taskID)
      })
    } else {                           // else filter tasks by id in selectedTask
      setTasks(tasks => {
        return tasks.filter(task => task.id !== selectedTask.task.id)
      })
      setSelectedTask({            // set default state to selectedTask
        task: undefined,
        isEdited: false,
        isAdded: false,
      })
    }
  }

  return (
    <div className="wrapper">
      <HeadOG
        title={'I Must Do'}
        description={'Web TODO-application based on React.js'}
        ogTitle={'I Must Do'}
        ogType={'website'}
        ogUrl={'https://i-must-do-next.vercel.app'}
        ogImg={ ogImage }
        ogSiteName={'Web TODO \'I Must Do\''}
        twitterCard={ staticMeta.twitterCard }
        twitterSite={ staticMeta.twitterSite }
      />

      <AppContext.Provider value={{
        tasks, selectedTask, setSelectedTask, changeStatus, deleteTask, editTask, convertDate
      }}>
        <Tasks
          isLoading={ isLoading }
          addTaskCallback={ addTask }
        />
        <TaskForm
          isLoading={ isLoading }
          setTasks={ setTasks }
        />
      </AppContext.Provider>
    </div>
  )
}

export default App