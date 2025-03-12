import React from 'react'
import { GlobalContext } from '../../pages/preview'
import Typography from '../Typography'
import Button from '../Button'
import { ArrowPathIcon, FolderOpenIcon } from '@heroicons/react/24/outline'
import ModelButton from './ModelButton'
import { fetchModels } from '../../lib/ollamaChat'
import { NotificationContext } from '../Notification'
import { ChatDisplayMessage } from '../chat/ChatDisplayArea'

const ModelsGroup = () => {
  const { models, setModels, setMessages } = React.useContext(GlobalContext)
  const [fetchLoading, setLoading] = React.useState(false)
  const [filterValue, setFilter] = React.useState('')
  const { pushNotification } = React.useContext(NotificationContext)

  const retrieveModels = (isInitialLoad: boolean = false) => {
    // prevent spam
    setLoading(true)
    fetchModels()
      .then((models) => {
        const initModelMessages: Record<string, ChatDisplayMessage[]> = {}
        const initModelInfo: Record<string, Model> = {}
        models.models.forEach((model) => {
          initModelInfo[model.name] = model
          if (isInitialLoad) initModelMessages[model.name] = []
        })

        if (isInitialLoad) setMessages(initModelMessages)
        setModels(initModelInfo)
        pushNotification('success', 'Successfully retrieved models.')
      })
      .catch((e) => {
        const err: string = e.toString()
        if (err.includes('error sending')) {
          pushNotification(
            'error',
            `Ollama server might be inactive, unable to fetch Ollama models.\nError: ${e}`
          )
        } else pushNotification('error', e)
      })
      .finally(() => setLoading(false))
  }

  const filtered = Object.values(models)
    .filter((model) => model.name.startsWith(filterValue))
    .sort((model1, model2) => model1.name.localeCompare(model2.name))

  React.useEffect(() => {
    // TODO: add loading screen
    retrieveModels(true)
  }, [])

  return (
    <div className='relative px-2'>
      <Typography variant='caption' className='mb-1 text-primary-800'>
        {filtered.length} models found
      </Typography>
      <div className='flex mb-2 relative'>
        <input
          type='text'
          className='grow resize-none w-full outline-none placeholder-primary-900 bg-primary-300 px-4 py-2 rounded-md text-sm'
          value={filterValue}
          onChange={(e) => setFilter(e.target.value)}
          placeholder='Search Models...'
        />
        <Button
          variant='icon'
          onClick={() => retrieveModels()}
          disabled={fetchLoading}
          className='absolute right-1 top-0.5 p-2 disabled:cursor-not-allowed disabled:opacity-40'
        >
          <ArrowPathIcon className={`w-4 ${fetchLoading && 'animate-spin'}`} />
        </Button>
      </div>

      {filtered.length > 0 ? (
        filtered.map((model, i) => <ModelButton model={model.name} key={i} />)
      ) : (
        <div className='select-none w-full mt-20 items-center justify-center grid space-y-1'>
          <FolderOpenIcon
            className='w-full items-center justify-center text-gray-400'
            width={50}
            height={50}
          />
          <Typography
            className='text-center w-30 text-wrap text-gray-400'
            variant='caption'
          >
            Whoops! Cannot find any models.
          </Typography>
        </div>
      )}
    </div>
  )
}

export default ModelsGroup
