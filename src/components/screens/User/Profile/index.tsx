import { memo } from 'react'
import WrapperContent from '@/components/widgets/WrapperContent'
import useUserLogged from '@hooks/useUserLogged'
import useFetchBooksBorrow from '@hooks/useFetchBooksBorrow'
import { UserIcon } from '@shared/icons'

const Profile = () => {
  const { name, document, email, isAdmin } = useUserLogged()
  const { data: booksBorrowed } = useFetchBooksBorrow()
  return (
    <WrapperContent>
      <div className="flex flex-row w-full items-center mb-4">
        <UserIcon size={22} />
        <h1 className="text-2xl font-bold ml-1">Perfil</h1>
      </div>
      <div className="flex flex-row flex-nowrap w-full">
        <div className="flex flex-col w-full w-1/2 gap-y-3">
          <div className="w-1/2">
            <p className="text-lg mb-1">
              <b>Nome Completo:</b>
            </p>
            <p className="bg-gray-100 p-2 text-md rounded-xl w-max md:w-full">{name}</p>
          </div>
          <div className="w-1/2">
            <p className="text-lg mb-1">
              <b>E-mail:</b>
            </p>
            <p className="bg-gray-100 p-2 text-md rounded-xl w-max md:w-full">{email}</p>
          </div>
          <div className="w-1/2">
            <p className="text-lg mb-1">
              <b>Documento:</b>
            </p>
            <p className="bg-gray-100 p-2 text-md rounded-xl w-max md:w-full">{document}</p>
          </div>
        </div>
        {!isAdmin && (
          <div className="flex flex-col w-full w-1/2">
            <h1 className="text-xl font-medium mb-4">Livros reservados:</h1>
            <div className="flex flex-col w-full w-full gap-y-2">
              {booksBorrowed?.map((book, index) => (
                <div className="bg-gray-100 rounded-xl p-2" key={index}>
                  <div className="text-lg">
                    <b className="pr-1">Título:</b>
                    <span>{book.title}</span>
                  </div>
                  <div className="text-xs mb-1">
                    <b className="pr-1">Data de devolução:</b>
                    <span>{book?.dueDate}</span>
                  </div>
                  <div className="text-xs mb-1">
                    <b className="pr-1">Status:</b>
                    <span>{book?.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </WrapperContent>
  )
}

export default memo(Profile)
