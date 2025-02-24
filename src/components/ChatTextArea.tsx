import TextareaAutosize from 'react-textarea-autosize'
import { ArrowTurnDownRightIcon } from '@heroicons/react/24/solid'
import Button from './Button'

const ChatArea = () => {
  return (
    <div className='relative'>
      <TextareaAutosize
        maxRows={4}
        className='w-full px-6 py-4 rounded-xl outline-none placeholder-primary-900 bg-primary-300 text-primary-900 resize-none'
        placeholder='Type a Message...'
      />

      <Button variant='contained' className='absolute top-3 right-5'>
        <ArrowTurnDownRightIcon className='w-6' />
      </Button>

      <p className='text-xs'>
        Press <b>Ctrl+Enter</b> to send
      </p>
    </div>
  )
}

export default ChatArea
