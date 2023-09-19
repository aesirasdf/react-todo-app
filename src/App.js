import './App.css'
import React from 'react'
import { Box, Button, TextField, Card, CardContent, CardActions, Typography, Grid } from '@mui/material'
import { toast } from 'react-toastify'

class App extends React.Component{
  state = {
    showForm: false,
    todos: [],
    todo: {
      title: '',
      description: ''
    }
  }

  toggleShowForm = () => {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  handleTitleChange = e => {
    if(e.target.value.length <= 32){
      this.setState({
        todo: {...this.state.todo, title: e.target.value}
      })
    }
  }

  handleDescriptionChange = e => {
    this.setState({
      todo: {...this.state.todo, description: e.target.value}
    })
  }

  handleCreateClick = () => {
    if(this.state.todo.title.length === 0 || this.state.todo.description.length === 0){
      toast.error('All fields are required!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    else{
      const d = new Date()
      const todo = {
        id: d.getUTCFullYear().toString() + d.getUTCMonth().toString() + d.getUTCDate().toString() + d.getUTCHours().toString() + d.getUTCMinutes().toString() + d.getUTCSeconds().toString() + d.getUTCMilliseconds().toString(),
        title: this.state.todo.title,
        description: this.state.todo.description,
        isCompleted: false,
      }
      const todos = [...this.state.todos]
      todos.push(todo)
      this.setState({
        todos,
        todo: {
          title: '',
          description: ''
        }
      })
      toast.success('Todo has been added!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  handleToggleCompleted = id => {
    const todos = [...this.state.todos]
    todos.map(todo => {
      if(todo.id.toString() === id.toString()){
        todo.isCompleted = !todo.isCompleted
      }
      return todo
    })
    this.setState({todos})
  }

  handleDeleteClick = id => {
    const todos = [...this.state.todos]
    this.setState({
      todos: todos.filter(todo => todo.id.toString() !== id.toString())
    })
  }

  render(){
    return(
      <Box className="App">
        <Box style={{textAlign: 'center', marginTop: '5rem'}}>
          <Button onClick={this.toggleShowForm} variant="contained" color="primary">
            { this.state.showForm ? "Hide" : "Show" } Form
          </Button>
          {
            this.state.showForm ?
              <Box id="create-form" sx={{p: 5}}>
                <Box sx={{p: 2}}>
                  <TextField onChange={this.handleTitleChange} value={this.state.todo.title} fullWidth variant="outlined" label="Title" />
                </Box>
                <Box sx={{px: 2}}>
                  <TextField onChange={this.handleDescriptionChange} value={this.state.todo.description} fullWidth variant="outlined" label="Description" multiline maxRows={6}/>
                </Box>
                <Box sx={{mt: 2}}>
                  <Button onClick={this.handleCreateClick} variant="outlined" color="success">Create</Button>
                </Box>
              </Box>
            :
              null
          }
        </Box>
        {
          !this.state.showForm ?
            <Box sx={{ textAlign: 'center', mt: 5 }}>
              <h3>Todo List</h3>
              <Grid container id="todo-list">
                  {
                    this.state.todos.map((todo) => (
                      <Grid item key={todo.id} sx={{maxWidth: '300px', p:2}}>
                        <Card sx={{ minWidth: 275, m: 2, pb: 5 , position: 'relative' }}>
                          <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                              {todo.id}
                            </Typography>
                            <Typography variant="h5" component="div">
                              {todo.title}
                            </Typography>
                            <Typography variant="body2">
                              {todo.description}
                            </Typography>
                          </CardContent>
                          <CardActions sx={{justifyContent: 'space-around', position: 'absolute', bottom: 0, display: 'flex', width: '250px'}}>
                            <Button onClick={() => this.handleDeleteClick(todo.id)} color="error" size="small">DELETE</Button>
                            <Button color="warning" size="small">EDIT</Button>
                            <Button onClick={() => this.handleToggleCompleted(todo.id)} color={todo.isCompleted ? "success" : "secondary"} size="small">{todo.isCompleted ? "Completed" : "Incomplete"}</Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))
                  }
              </Grid>
            </Box>
          : null
        }
      </Box>
    )
  }
}

export default App;