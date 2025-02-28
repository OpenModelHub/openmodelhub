import Button from './Button'

const PreviewFloating = () => {
  return (
    <>
      <div className='fixed flex items-center space-x-4 bottom-5 z-50 right-5 bg-black rounded-md pl-4 pr-2 py-2 shadow-xl text-white'>
        <p>WIP Preview.</p>
        <Button color='dark' element='link' href='/preview'>
          Reload
        </Button>
      </div>
    </>
  )
}

export default PreviewFloating
