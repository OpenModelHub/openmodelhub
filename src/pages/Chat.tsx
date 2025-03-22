import React from 'react'
import ChatDisplayArea from '../components/Chat/ChatDisplayArea'
import ChatArea from '../components/Chat/ChatTextArea'
import Status from '../components/Status'
import Typography from '../components/Typography'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Tooltip from '../components/Tooltip'
import { GlobalContext } from '.'

interface ChatViewProps {
  model: string
}

const ChatPage: React.FC<ChatViewProps> = ({ model }) => {
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

export default ChatPage
