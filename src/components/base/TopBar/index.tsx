import {SearchIcon} from "@shared/icons";
import {memo} from "react";

const TopBar = () => {
  return (
    <div className="w-full min-h-[80px] items-center flex flex-row">
      <div className="ml-auto relative">
        <SearchIcon className="absolute mt-auto top-[25%] left-4" color="#0a0a0a" size={22} />
        <input className="w-[480px] rounded-full p-4 pl-12 h-[48px] z-1 text-black" placeholder="Digite aqui o titulo para pesquisar..." />
      </div>
      <div className="ml-auto flex items-center flex-row mr-10">
        <div className="flex items-center justify-center bg-primary m-auto w-[48px] h-[48px] rounded-full mr-2">
          CE
        </div>
        <p className="text-xl text-primary">Carlos Eduardo</p>
      </div>
    </div>
  )
}

export default memo(TopBar)
