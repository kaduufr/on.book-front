import { SearchIcon, SignInIcon } from '@shared/icons'
import { FormEvent, memo, useState } from 'react'
import useUserLogged from '@hooks/useUserLogged'
import Link from 'next/link'
import routes from '@data/routes'
import { useRouter } from 'next/router'

const TopBar = () => {
  const { isLogged, name } = useUserLogged()
  const { push } = useRouter()
  const [firstname, surname] = name.split(' ')
  let siglas = 'NN'

  if (firstname && surname) {
    siglas = firstname[0] + surname[0]
  } else if (firstname) {
    siglas = firstname[0]
  }

  const [searchText, setSearchText] = useState('')

  function searchBook(evt: FormEvent) {
    evt.preventDefault()
    push(routes.books + `/pesquisar?title=${searchText}`)
  }

  return (
    <div className="w-full min-h-[80px] items-center flex flex-row">
      <form className="ml-auto relative" onSubmit={searchBook}>
        <div className=" relative">
          <button type="submit">
            <SearchIcon className="absolute mt-auto top-[25%] left-4" color="#0a0a0a" size={22} />
          </button>
          <input
            className="w-[480px] rounded-full p-4 pl-12 h-[48px] z-1 text-black"
            placeholder="Digite aqui o titulo para pesquisar..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </form>
      {isLogged && (
        <div className="ml-auto flex items-center flex-row mr-10">
          <div className="flex items-center justify-center bg-primary m-auto w-[42px] h-[42px] rounded-full mr-2 text-grayIce">
            {siglas || 'NN'}
          </div>
          <p className="text-xl text-primary">{name}</p>
        </div>
      )}

      {!isLogged && (
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
