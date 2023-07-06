import {memo} from "react";
import {BookmarkIcon} from "@shared/icons";

const SideBar: React.FC = () => (
  <div className="flex flex-col w-[280px] pt-6  gap-y-5">
    <div className={`text-2xl font-bold text-center pb-8 text-primary`}>On.Book</div>
    <div className="flex flex-col px-8 text-primary gap-y-2 h-full">
      <div className="w-full flex flex-row items-center gap-x-2">
        <BookmarkIcon/>
        <p>Home</p>
      </div>
      <div className="w-full flex flex-col gap-y-3">
        <div className="flex flex-row items-center gap-x-2">
          <BookmarkIcon/>
          <p className="font-normal">Categorias</p>
        </div>

        <div className="w-full flex flex-col gap-y-3 pl-3">
          <button className="flex justify-start items-center flex-row gap-x-2">
            <BookmarkIcon/>
            <p>Escola</p>
          </button>
          <button className="flex justify-start items-center flex-row gap-x-2">
            <BookmarkIcon/>
            <p>Auto-Ajuda</p>
          </button>
          <button className="flex justify-start items-center flex-row gap-x-2">
            <BookmarkIcon/>
            <p>Ficção</p>
          </button>
          <button className="flex justify-start items-center flex-row gap-x-2">
            <BookmarkIcon/>
            <p>Finanças</p>
          </button>
          <button className="flex justify-start items-center flex-row gap-x-2">
            <BookmarkIcon/>
            <p>Saúde</p>
          </button>
          <button className="flex justify-start items-center flex-row gap-x-2">
            <BookmarkIcon/>
            <p>Entreterimento</p>
          </button>
          <button className="flex justify-start items-center flex-row gap-x-2">
            <BookmarkIcon/>
            <p>Todas</p>
          </button>
        </div>
      </div>
      <button className="flex justify-start items-center flex-row gap-x-2 mt-auto mb-[60%]">
        <BookmarkIcon/>
        <p>Sair</p>
      </button>
    </div>
  </div>
)

export default memo(SideBar)
