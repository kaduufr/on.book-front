import WrapperContent from '@/components/widgets/WrapperContent'
import { BookIcon } from '@shared/icons'
import IBook from '@interfaces/IBook'
import Image from 'next/image'
import useUserLogged from '@hooks/useUserLogged'

type Props = {
  book: IBook
}

const ShowBookComponent = ({ book }: Props) => {
  const { isLogged } = useUserLogged()

  return (
    <WrapperContent>
      <div className="flex flex-row items-start">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <BookIcon size={22} className="mr-2" />
              <h1 className="text-2xl font-bold">{book.title}</h1>
            </div>
            {isLogged && (
              <button className="btn bg-yellowTheme">
                <span className="text-grayIce">Reservar</span>
              </button>
            )}
          </div>
          <div className="flex flex-col md:flex-row pt-8">
            <div className="">
              <Image
                src={`http://localhost:3000${book.image_url}`}
                alt="bookPicture"
                height="1000"
                width="800"
                className="w-auto min-w-[260px] max-h-[500]"
              />
            </div>
            <div className="flex flex-col w-full mt-6 md:mt-0 ml-6">
              <div className="w-full">
                <p className="text-lg mb-1">
                  <b>Autor / Autora:</b>
                </p>
                <p className="bg-gray-200 p-2 text-md rounded-xl w-max md:w-1/2">{book.author}</p>
              </div>
              <div className="w-full pt-2">
                <p className="text-lg mb-1">
                  <b>Categoria:</b>
                </p>
                <p className="bg-gray-200 p-2 text-md rounded-xl w-max md:w-1/2">
                  {book.category_name}
                </p>
              </div>
              <div className="w-full pt-2">
                <p className="text-lg mb-1">
                  <b>Ano de Publicação:</b>
                </p>
                <p className="bg-gray-200 p-2 text-md rounded-xl w-max md:w-1/2">
                  {book.published_at}
                </p>
              </div>
              <div className="w-full pt-2">
                <p className="text-lg mb-1">
                  <b>Descrição:</b>
                </p>
                <p className="bg-gray-200 p-2 text-md rounded-xl w-max md:w-1/2">
                  {book.description}
                </p>
              </div>
              <div className="w-full pt-2">
                <p className="text-lg mb-1">
                  <b>Status:</b>
                </p>
                <p className="bg-gray-200 p-2 text-md rounded-xl w-max md:w-1/2">
                  {book.available}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WrapperContent>
  )
}

export default ShowBookComponent
