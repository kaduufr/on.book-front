import { memo, MouseEvent } from 'react'
import { BookmarkIcon, ChevronRightIcon, HalfBookIcon } from '@shared/icons'
import useFetchCategories from '@hooks/useFetchCategories'
import Link from 'next/link'
import routes from '@data/routes'
import useUserLogged from '@hooks/useUserLogged'
import {useRouter} from "next/router";
import UserProvider from "@providers/UserProvider";

const SideBar = () => {
  const { categories } = useFetchCategories()
  const { isLogged, logoff } = useUserLogged()
  const {push} = useRouter()

  function handleLogout(evt: MouseEvent) {
    evt.preventDefault()
    UserProvider.logout()
    push(routes.home)
    logoff()
  }

  return (
    <div className="flex flex-col w-[260px] pt-6  gap-y-5">
      <div className={`text-2xl font-bold text-center pb-8 text-primary`}>On.Book</div>
      <div className="flex flex-col px-8 text-primary gap-y-2 h-full">
        <Link href={routes.home}>
          <button className="w-full flex flex-row items-center gap-x-2 hover:underline hover:font-bold hover:text-[16px] transition-all">
            <HalfBookIcon />
            <p>Home</p>
          </button>
        </Link>
        <div className="w-full flex flex-col gap-y-3">
          <div className="flex flex-row items-center gap-x-2">
            <BookmarkIcon />
            <p className="font-normal">Categorias</p>
          </div>

          <div className="w-full flex flex-col gap-y-3 pl-3">
            {categories &&
              categories?.map((category, index) => (
                <Link href={`${routes.showBooksByCategories}/${category.id}`} key={index}>
                  <button className="flex justify-start items-center flex-row gap-x-2 hover:underline hover:font-bold hover:text-[16px] transition-all">
                    <ChevronRightIcon />
                    <p>{category.name}</p>
                  </button>
                </Link>
              ))}
            <Link href={routes.showCategories}>
              <button className="flex justify-start items-center flex-row gap-x-2 hover:underline hover:font-bold hover:text-[16px] transition-all">
                <ChevronRightIcon />
                <p>Todas</p>
              </button>
            </Link>
          </div>
        </div>
        {isLogged && (
          <div className="mt-auto mb-[60%] flex flex-col gap-y-3">
            <Link href={routes.profile}>
              <button className="flex justify-start items-center flex-row gap-x-2 hover:underline hover:font-bold hover:text-[16px] transition-all">
                <BookmarkIcon />
                <p>Meus Perfil</p>
              </button>
            </Link>
            <button className="flex justify-start items-center flex-row gap-x-2 " onClick={handleLogout}>
              <BookmarkIcon />
              <p>Sair</p>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(SideBar)
