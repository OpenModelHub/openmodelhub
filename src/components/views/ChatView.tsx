import React from 'react'
import ChatDisplayArea from '../chat/ChatDisplayArea'
import ChatArea from '../chat/ChatTextArea'
import Status from '../chat/Status'
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
      <div className='sticky top-0 pt-3 py-2 bg-primary-100'>
        <div className='flex space-x-2 items-center'>
          <Typography variant='h4'>
            {model} (Local, {(models[model].size / 1e9).toFixed(1)}GB)
          </Typography>

          <Tooltip
            direction='down'
            message={
              <>
                {Object.keys(specifications).map((specKey, i) => (
                  <Typography variant='caption' key={i}>
                    <b>{specKey}:</b> {specifications[specKey]}
                  </Typography>
                ))}
              </>
            }
          >
            <InformationCircleIcon className='w-5 mt-1' />
          </Tooltip>
        </div>
        <Status status='available' />
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
