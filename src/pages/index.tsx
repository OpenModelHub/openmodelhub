import Button from '../components/Button'
import Link from '../components/Link'

export default function Home() {
  return (
    <>
      <div className='bg-primary-100 text-black h-screen p-10'>
        <img src='/omhlogo-dark.svg' width={50} />
        <div className='mt-5 mb-5'>
          <h1 className='text-xl font-bold'>Welcome to OpenModelHub!</h1>
          <p>
            This project is WIP. You are currently seeing the initial codebase
            preview.
          </p>
          <p>
            You can contribute{' '}
            <Link href='https://github.com/OpenModelHub/openmodelhub' external>
              here
            </Link>
            .
          </p>
        </div>

        <div className='flex space-x-2'>
          <Button element='link' variant='outlined' href='/preview'>
            See Preview
          </Button>
        </div>
      </div>
    </>
  )
}
