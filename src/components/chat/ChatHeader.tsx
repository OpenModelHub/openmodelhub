import { InformationCircleIcon } from '@heroicons/react/24/outline'
import Typography from '../Typography'
import Tooltip from '../Tooltip'
import Status from '../Status'

interface ChatHeaderProps {
  model: Model
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ model }) => {
  const specifications: Record<string, string> = {
    'Model Name': model.name,
    'Model Size': `${model.size} bytes`,
    'Parameter Size': model.details.parameter_size,
    'Model Family': model.details.family,
    'Modified At': new Date(model.modified_at).toLocaleString(),
  }

  return (
    <>
      <div className='flex space-x-2 items-center'>
        <Typography variant='h4'>
          {model.name} (Local, {(model.size / 1e9).toFixed(1)}GB)
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
    </>
  )
}

export default ChatHeader
