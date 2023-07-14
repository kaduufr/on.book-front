import { Inter } from 'next/font/google'
import SideBar from '@/components/base/SideBar'
import TopBar from '@/components/base/TopBar'

const inter = Inter({ subsets: ['latin'] })

export default function WrapperContent({ children }: { children: React.ReactNode }) {
  return (
    <main className={`${inter} flex min-h-screen flex-row bg-brownLight`}>
      <SideBar />
      <div className="flex flex-col w-full ml-[220px]">
        <TopBar />
        <div className="flex-1 max-w-full bg-grayIce ml-6 rounded-tl-xl py-3 px-6 text-primary">
          {children}
        </div>
      </div>
    </main>
  )
}
