import { memo } from 'react'
import Link from 'next/link'
import routes from '@data/routes'

const LoginScreen = () => {
  return (
    <div
      className="relative flex justify-center items-center w-full min-h-screen !bg-cover !bg-fixed !bg-center"
      style={{ background: "url('/assets/bg-login-book.avif')" }}
    >
      <div className="w-[500px] h-[420px] rounded-2xl bg-brownLight flex flex-col items-center justify-center gap-y-3">
        <h1 className="text-primary text-3xl font-bold ">On.Book</h1>
        <h2 className="font-medium text-xl text-primary">Acesse o sistema</h2>

        <form className="flex flex-col gap-y-4 w-full px-16">
          <div className="form-control w-full">
            <label htmlFor="email" className="mb-2 pl-2 font-normal text-primary">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Ex: john.doe@mail.com"
              className="input"
            />
          </div>
          <div className="form-control w-full">
            <label htmlFor="password" className="mb-2 pl-2 font-normal text-blue">
              Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              className="input w-full max-w-md"
            />
          </div>
          <div className="w-full relative mt-4 flex justify-center">
            <button
              type="submit"
              className="btn btn-wide bg-secondary text-white hover:text-brownLight hover:bg-primary hover:border-1 hover:border-primary mx-auto"
            >
              Entrar
            </button>
          </div>
        </form>
        <div>
          <Link href={routes.register} className="text-blueDark font-medium">
            Ainda não possui cadastro?
            <b className="pl-1">Cadastre-se</b>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default memo(LoginScreen)
