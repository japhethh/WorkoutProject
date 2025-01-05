import { useState } from 'react'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const apiURL = "https://jsonplaceholder.typicode.com/todos";

const fetchTodos = async () => {
  const res = await axios.get(`${apiURL}`)

  return res.data
}

export const addTodo = async (newTodo: any) => {
  const response = await axios.post(`${apiURL}`, newTodo)
  console.log(response)
  return response.data
}

console.log(fetchTodos)

const ReactQuery = () => {

  const [title, setTitle] = useState<string>("")

  const queryClient = useQueryClient()

  const { data, isLoading, error, isError } = useQuery({ queryKey: ["todos"], queryFn: fetchTodos })


  // const addMutation = useMutation(addTodo,);
  // const handleTodo = async () => {
  //   addMutation.mutate({ title })
  // }
  return (
    <div>
      <label htmlFor="title">Title</label>
      <input className="block" id="title" type="text" />
{/* 
      <button type="submit" onClick={handleTodo}>
        Add Todo
      </button> */}

    </div>
  )
}

export default ReactQuery