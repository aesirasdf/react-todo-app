import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'

class TodoCard extends React.Component{
    render(){
        return(
            <Card sx={{ minWidth: 275, m: 2, pb: 5 , position: 'relative' }}>
                <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {this.props.todo.id}
                </Typography>
                <Typography variant="h5" component="div">
                    {this.props.todo.title}
                </Typography>
                <Typography variant="body2">
                    {this.props.todo.description}
                </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'space-around', position: 'absolute', bottom: 0, display: 'flex', width: '250px'}}>
                    <Button onClick={() => this.props.handleDeleteClick(this.props.todo.id)} color="error" size="small">DELETE</Button>
                    <Button onClick={() => this.props.handleEditClick(this.props.todo)} color="warning" size="small">EDIT</Button>
                    <Button onClick={() => this.props.handleToggleCompleted(this.props.todo.id)} color={this.props.todo.isCompleted ? "success" : "secondary"} size="small">{this.props.todo.isCompleted ? "Completed" : "Incomplete"}</Button>
                </CardActions>
            </Card>
        )
    }
}
export default TodoCard