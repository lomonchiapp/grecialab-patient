import { useState, useEffect } from 'react'
import {Layout} from './Layout'
import { QueueForm } from './components/QueueForm'
import {useFormState} from './hooks/useFormState'


import './App.css'

function App() {
const {fetchServices} = useFormState()

useEffect(() => {
  fetchServices()
}, [fetchServices])

  return (
    <Layout>
      <QueueForm/>
    </Layout>
  )
}

export default App
