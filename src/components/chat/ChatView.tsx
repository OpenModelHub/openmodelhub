import React from 'react'
import ChatDisplayArea from './ChatDisplayArea'
import ChatArea from './ChatTextArea'
import Status from '../Status'
import Typography from '../Typography'
import { GlobalContext } from '../../pages/preview'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Tooltip from '../Tooltip'

interface ChatViewProps {
  model: string
}

const ChatView: React.FC<ChatViewProps> = ({ model }) => {
  const { messages, models } = React.useContext(GlobalContext)

  const specifications: Record<string, string> = {
    'Model Name': model,
    'Model Size': `${models[model].size} bytes`,
    'Parameter Size': models[model].details.parameter_size,
    'Model Family': models[model].details.family,
    'Modified At': new Date(models[model].modified_at).toLocaleString(),
  }

  return (
    <>
      {/* heading, titles etc */}
      <div className='sticky top-0 z-10 pt-3 py-2 bg-primary-100'>
        <div className='flex space-x-2 items-center'>
          <Typography variant='h4'>
            {model} (Local, {(models[model].size / 1e9).toFixed(1)}GB)
          </Typography>
          <div className='group'>
            <InformationCircleIcon className='w-5 mt-1' />
            <Tooltip direction='down'>
              {Object.keys(specifications).map((specKey, i) => (
                <Typography variant='caption' key={i}>
                  <b>{specKey}:</b> {specifications[specKey]}
                </Typography>
              ))}
            </Tooltip>
          </div>
        </div>
        <Status status='available' message='Available' />
      </div>
      {/* texts */}
      <ChatDisplayArea messages={messages[model]} />
      {/* footer, textarea etc */}
      <div className='sticky bottom-0 pb-4 py-2 bg-primary-100'>
        <ChatArea currentModel={model} />
      </div>
    </>
  )
}

export default ChatView
