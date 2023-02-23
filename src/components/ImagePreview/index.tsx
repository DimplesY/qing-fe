import clsxm from '@/utils/clsxm'
import Image from 'next/image'

interface ImagePreviewProps {
  src: string
  alt: string
  imageProps: { height: number; width: number }
  onClose: () => void
}

const ImagePreview = ({ src, alt, onClose, imageProps }: ImagePreviewProps) => {
  return (
    <div
      className={clsxm('fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50')}
      onClick={onClose}>
      <div className="max-h-[90%] absolute top-[50%] left-[50%] -translate-x-[50%]  -translate-y-[50%] bg-white mx-auto my-auto">
        <Image
          height={imageProps.height}
          width={imageProps.width}
          src={src}
          alt={alt}
          priority
          className="w-full h-full object-cover bg-white"
        />
      </div>
    </div>
  )
}
export default ImagePreview
