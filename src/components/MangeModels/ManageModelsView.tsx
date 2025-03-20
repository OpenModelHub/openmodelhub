import React from 'react'
import Typography from '../Typography'
import Button from '../Button'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import Status from '../Status'

const ManageModelsView: React.FC = () => {
  return (
    <div className='p-4 max-w-3xl'>
      <Typography variant='h4' className='mb-8'>
        Manage Models
      </Typography>

      <Typography variant='h2'>Ollama Models</Typography>
      <Status status='offline' message='Server Not Running' />

      <div className='bg-red-50 px-4 py-4 border border-red-500 rounded-lg mt-4'>
        <Typography className='text-red-900'>
          <b>Ollama installation not detected:</b> Ollama is a lightweight,
          extensible framework for building and running language models on the
          local machine. It is required to run ollama models.
        </Typography>
      </div>
      <Button variant='contained' className='flex space-x-2 py-2 mt-4 mb-1'>
        <ArrowDownTrayIcon className='w-5' />
        <Typography>Install Ollama (1.0 GB)</Typography>
      </Button>
      <Typography variant='caption'>
        👆 This will be added to Downloads.
      </Typography>
    </div>
  )
}

export default ManageModelsView
