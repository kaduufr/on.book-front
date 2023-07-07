import { useFetchBooks } from '@hooks/useFetchBooks'
import WrapperContent from '@/components/widgets/WrapperContent'
import Image from 'next/image'

export default function Home() {
  const { books } = useFetchBooks()
  return (
    <WrapperContent>
      <div>
        <h2 className="text-2xl">Escola</h2>

        <div className="w-full flex flex-row pt-4">
          {books.length > 0 && (
            <div className="flex flex-col items-center justify-center">
              <Image
                src={`http://localhost:3000${books[0].image_url}`}
                width={160}
                height={200}
                alt={'book_image'}
              />
              <p className="font-normal">{books[0].title}</p>
              <small className="font-thin">{books[0].available}</small>
            </div>
          )}
        </div>
      </div>
    </WrapperContent>
  )
}
