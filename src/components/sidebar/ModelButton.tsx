import React from 'react'
import Button from '../Button'
import Typography from '../Typography'
import { cutStrLen } from '../../lib/util'
import { GlobalContext } from '../../pages/preview'

interface ModelButtonProps {
  model: string
}

const MAX_MODELNAME_LENGTH = 16

const ModelButton: React.FC<ModelButtonProps> = ({ model }) => {
  const { setPage, page } = React.useContext(GlobalContext)
  return (
    <Button
      onClick={() => {
        setPage(`chat:${model}`)
      }}
      variant='text'
      className={`${
        model == page.slice(5) && 'bg-primary-300'
      } flex items-center space-x-2 w-full select-none`}
    >
      <Typography variant='body1' className='text-primary-900 text-sm'>
        {cutStrLen(model, MAX_MODELNAME_LENGTH)}
      </Typography>
    </Button>
  )
}

export default ModelButton
