import { useFetchBooks } from '@hooks/useFetchBooks'
import WrapperContent from '@/components/widgets/WrapperContent'
import Image from 'next/image'
import { ChevronRightIcon } from '@shared/icons'
import Link from 'next/link'
import routes from '@data/routes'

export default function Home() {
  const { books: bookGrouped } = useFetchBooks()

  return (
    <WrapperContent>
      <div className="flex flex-row flex-wrap">
        {bookGrouped?.map((group, index) => (
          <div key={index} className="w-1/2 relative">
            <div className="flex flex-row items-center">
              <h2 className="text-2xl">{group.category_name}</h2>
              <Link href={`/${routes.showBooksByCategories}/${group.category_id}`}>
                <button className="flex flex-row items-center px-4 mt-2 underline text-blueDark">
                  <span className="text-sm">Ver todos</span>
                  <ChevronRightIcon />
                </button>
              </Link>
            </div>
            <div className="flex flex-row flex-wrap lg:gap-x-16 items-start">
              {group.books.map((book, indexBook) => (
                <div className="flex flex-row pt-4" key={indexBook}>
                  <div className="flex flex-col items-center justify-center max-w-[250px]">
                    <Image
                      src={`http://localhost:3000${book.image_url}`}
                      width={160}
                      height={200}
                      alt={'book_image'}
                      className="h-[230px] w-[160px] object-cover"
                    />
                    <p className="font-normal text-center">{book.title}</p>
                    <small className="font-thin">{book.available}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </WrapperContent>
  )
}
