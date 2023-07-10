import { memo } from 'react'
import WrapperContent from '@/components/widgets/WrapperContent'
import useUserLogged from "@hooks/useUserLogged";

const Profile = () => {
  const {name} = useUserLogged()
  return (
    <WrapperContent>
      <div className="flex flex-row w-full items-center">
        <h1 className="text-2xl font-bold mb-4">Perfil:</h1>
      </div>
      <div className="flex flex-row flex-nowrap w-full">
        <div className="flex flex-col w-full w-1/2 gap-y-3">
          <div className="w-1/2">
            <p className="text-lg mb-1">
              <b>Nome Completo:</b>
            </p>
            <p className="bg-gray-200 p-2 text-md rounded-xl w-max md:w-full">Carlos Eduardo</p>
          </div>
          <div className="w-1/2">
            <p className="text-lg mb-1">
              <b>E-mail:</b>
            </p>
            <p className="bg-gray-200 p-2 text-md rounded-xl w-max md:w-full">Carlos Eduardo</p>
          </div>
          <div className="w-1/2">
            <p className="text-lg mb-1">
              <b>Possui algum livro em atraso:</b>
            </p>
            <p className="bg-red-300 p-2 text-md rounded-xl w-max md:w-full">Carlos Eduardo</p>
          </div>
        </div>
        <div className="flex flex-col w-full w-1/2">
          <h1 className="text-xl font-medium mb-4">Livros reservados:</h1>
          <div className="flex flex-col w-full w-full gap-y-3">
            <div className="bg-brownLight rounded-xl p-2">
              Ola
            </div>
          </div>
        </div>
      </div>
    </WrapperContent>
  )
}

export default memo(Profile)
