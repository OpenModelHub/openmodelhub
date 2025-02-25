import TextareaAutosize from 'react-textarea-autosize'
import { ArrowTurnDownRightIcon } from '@heroicons/react/24/solid'
import Button from './Button'
import Typography from './Typography'

const ChatArea = () => {
  return (
    <div>
      <TextareaAutosize
        maxRows={4}
        className='w-full px-6 py-4 rounded-xl outline-none placeholder-primary-900 bg-primary-300 text-primary-900 resize-none'
        placeholder='Type a Message...'
      />

      <Button variant='contained' className='absolute top-5 right-3'>
        <ArrowTurnDownRightIcon className='w-6' />
      </Button>

      <Typography variant='caption'>
        Press <b>Ctrl+Enter</b> to send
      </Typography>
    </div>
  )
}

export default ChatArea
