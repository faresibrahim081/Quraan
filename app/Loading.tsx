import Image from 'next/image'
import Img from '../public/images/loading.svg'

function Loading() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <Image className="w-20 h-20 animate-spin" src={Img} alt="Loading icon" />
        </div>
    )
}

export default Loading
