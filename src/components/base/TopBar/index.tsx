import { SearchIcon, SignInIcon } from '@shared/icons'
import { memo } from 'react'
import useUserLogged from '@hooks/useUserLogged'
import Link from 'next/link'
import routes from '@data/routes'

const TopBar = () => {
  const { isLogged } = useUserLogged()
  return (
    <div className="w-full min-h-[80px] items-center flex flex-row">
      <div className="ml-auto relative">
        <SearchIcon className="absolute mt-auto top-[25%] left-4" color="#0a0a0a" size={22} />
        <input
          className="w-[480px] rounded-full p-4 pl-12 h-[48px] z-1 text-black"
          placeholder="Digite aqui o titulo para pesquisar..."
        />
      </div>
      {isLogged() && (
        <div className="ml-auto flex items-center flex-row mr-10">
          <div className="flex items-center justify-center bg-primary m-auto w-[48px] h-[48px] rounded-full mr-2">
            CE
          </div>
          <p className="text-xl text-primary">Carlos Eduardo</p>
        </div>
      )}

      {!isLogged() && (
        <div className="ml-auto mr-10">
          <Link
            href={routes.login}
            className="bg-primary text-white rounded-full flex flex-row items-center px-4 py-2 hover:opacity-95 transition-all"
          >
            <p>Acesse o sistema</p>
            <SignInIcon className="ml-2 rotate-180" color="#fff" size={22} />
          </Link>
        </div>
      )}
    </div>
  )
}

export default memo(TopBar)
