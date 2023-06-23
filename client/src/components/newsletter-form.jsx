import classnames from 'clsx'
import { ChangeEvent, FormEvent } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import { Redirect } from 'react-router-dom';
// import { useHistory } from 'react-router';

import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import FolderIcon from '@mui/icons-material/Folder'
import ArticleIcon from '@mui/icons-material/Article'
import { Toaster, toast } from 'react-hot-toast'

export function NewsletterForm({
  className,
  // onSubmit,
  submitText,
}) {
  const navigate = useNavigate()
  // const history = useHistory();

  const [tasks, setTasks] = useState([])
  const [newTask, setTask] = useState('')
  const [emptyTaskError, setEmptyTaskError] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const [secondary, setSecondary] = useState(false)

  const handleChange = (event) => {
    setTask(event.target.value)
  }

  useEffect(() => {
    // Retrieve the email from localStorage
    const storedEmail = localStorage.getItem('userEmail')

    // Check if the email is stored
    if (storedEmail) {
      setUserEmail(storedEmail)
    } else {
      console.log('bhakk')
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const req = {
          email: userEmail,
        }
        const response = await axios.post(
          'http://localhost:8081/user/getUserInfo',
          req
        )

        if (response.data.success) {
          const { user } = response.data

          // Find the user's preferences based on their email
          const userPreferences = user.preferences
          console.log(userPreferences)
          if (userPreferences && userPreferences.length > 1) {
            // Remove the first element (email) and get the remaining preferences
            // const preferences = userPreferences.slice(1);
            console.log(userPreferences)
            setTasks(userPreferences)
          }
        } else {
          throw new Error(response.data.message)
        }
      } catch (error) {
        console.log(error)
      }
    }

    // Fetch user preferences when the component mounts
    fetchUserPreferences()
  }, [userEmail])

  const handleAdd = (event) => {
    event.preventDefault()
    if (newTask.trim() === '') {
      setEmptyTaskError(true)
      return // Don't add empty todo
    }
    if (tasks.length >= 5) {
      return // Limit reached, don't add new todo
    }
    setTasks([...tasks, newTask])
    setTask('')
    setEmptyTaskError(false)
  }

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((val, i) => i !== index)
    setTasks(updatedTasks)
  }

  const handleSubmit = async () => {
    console.log(tasks)
    try {
      const req = {
        email: userEmail,
        preferences: tasks,
      }
      const response = await axios
        .post('http://localhost:8081/user/setPreferences', req)
        .then()
      console.log(userEmail)
      console.log(tasks)
      if (response.status !== 201) {
        throw new Error('Failed to set preferences.')
      }

      toast.success('Your Preferences are set')
      console.log('Preferences successfully set.')
    } catch (error) {
      console.log(error)
    }
  }

  const storedEmail2 = localStorage.getItem('userEmail')

  // if (!storedEmail2) {
  //   console.log("User not logged in. Redirecting to login page...");
  //   return <Redirect to="/login" />;
  // }
  // if (!storedEmail2) {
  //   console.log("User not logged in. Redirecting to login page...");
  //   navigate('/login');
  //   return null; // Render nothing since the user will be redirected
  // }

  return (
    // {if(storedEmail2) }
    <>
      <form
        onSubmit={handleAdd}
        // className={classnames('newsletter-form is-revealing md:flex', className)}
      >
        <input
          type="text"
          onChange={handleChange}
          value={newTask}
          placeholder="enter your topic"
          className="w-3/4 rounded-sm border border-gray-300 bg-white px-4 py-3 text-sm text-gray-500 shadow-none"
          style={{ marginRight: '8px' }}
        />
        <button type="submit">
          <Fab size="small" color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </button>
      </form>
      {emptyTaskError && (
        <p style={{ color: 'red' }}>Topic field can't be empty</p>
      )}
      {tasks.length >= 5 && (
        <p style={{ color: 'red' }}>You have reached the limit of 5 topics.</p>
      )}

      <List>
        {tasks.map((task, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="start" aria-label="delete">
                <DeleteIcon onClick={() => handleDelete(index)} />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <ArticleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={task}
              secondary={secondary ? 'Secondary text' : null}
            />
          </ListItem>
        ))}
      </List>
      <div className="control">
        <button
          className="-mt-px inline-flex cursor-pointer justify-center whitespace-nowrap rounded-sm border-0 bg-gradient-to-r from-secondary-500 to-secondary-400 py-4 px-7 text-center font-medium leading-4 text-white no-underline shadow-lg"
          type="submit"
          onClick={handleSubmit}
        >
          {submitText}
        </button>
      </div>
      <Toaster />
    </>
  )
}
