import { useEffect } from 'react'
import {Layout} from './Layout'
import { QueueForm } from './components/QueueForm'
import {useFormState} from './hooks/useFormState'


import './App.css'

function App() {
const {fetchServices, fetchQueues, subscribeToTickets, fetchIP} = useFormState()

useEffect(() => {
  fetchServices()
  fetchQueues()
  fetchIP()
}, [fetchServices, fetchQueues, fetchIP])

useEffect(() => {
  const unsubscribe = subscribeToTickets()
  return () => unsubscribe()
}, [subscribeToTickets])

  return (
    <Layout>
      <QueueForm/>
    </Layout>
  )
}

export default App
