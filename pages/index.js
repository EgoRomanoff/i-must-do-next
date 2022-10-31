import Tasks from "../components/Tasks/Tasks"
import TaskForm from "../components/TaskForm/TaskForm"
import { useEffect, useState } from "react"
import { AppContext } from "../context"
import Head from "next/head"
// import Image from 'next/image'
// import ogImage from '../public/img/og-image.jpg'
// import ogImageTwitter from '../public/img/og-image-twitter.jpg'

function App() {

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
      <Head>
        <title>I Must Do</title>
        <meta
          name="description"
          content="Web TODO-application based on React.js"
          key="description"
        />

        <meta property="og:title" content="I Must Do" key="ogtitle" />
        <meta property="og:type" content="website" key="ogtype" />
        <meta property="og:image" content="https://i.ibb.co/zXWJ0sQ/og-image.jpg" key="ogimage" />
        <meta property="og:image:width" content="1200" key="ogimgw" />
        <meta property="og:image:height" content="630" key="ogimgh" />
        <meta property="og:url" content="egoromanoff.github.io/i-must-do-react/" key="ogurl" />

        <meta property="og:locale" content="en_US" key="oglocale" />
        <meta property="og:locale:alternate" content="ru_RU" key="oglocalealt" />
        <meta property="og:site_name" content="Web TODO 'I Must Do'" key="ogsitename" />
        <meta property="og:description" content="Web TODO-application based on React.js" key="ogdescription" />

        <meta name="twitter:card" content="summary" key="twcard" />
        <meta name="twitter:site" content="@EgoRomanoff" key="twsite" />
        <meta name="twitter:title" content="I Must Do" key="twtitle" />
        <meta name="twitter:description" content="Web TODO-application. Based on React.js" key="twdescription" />
        <meta name="twitter:image" content="https://i.ibb.co/fSCGCWS/og-image-twitter.jpg" key="twimage" />
      </Head>
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