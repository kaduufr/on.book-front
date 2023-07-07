import { memo } from 'react'
import Link from 'next/link'
import routes from '@data/routes'

const RegisterScreen = () => {
  return (
    <div
      className="relative flex justify-center items-center w-full min-h-screen !bg-cover !bg-fixed !bg-center"
      style={{ background: "url('/assets/bg-login-book.avif')" }}
    >
      <div className="w-[500px] min-h-[420px] h-auto rounded-2xl bg-brownLight flex flex-col items-center justify-center py-4 gap-y-3">
        <h1 className="text-primary text-3xl font-bold ">On.Book</h1>
        <h2 className="font-medium text-xl text-primary">Registre-se</h2>

        <form className="flex flex-col gap-y-2 w-full px-16">
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
          <div className="form-control w-full">
            <label htmlFor="password" className="mb-2 pl-2 font-normal text-blue">
              CPF
            </label>
            <input
              type="text"
              name="document"
              id="document"
              placeholder="000.000.000-00"
              className="input w-full max-w-md"
            />
          </div>
          <div className="w-full">
            <p>Genero</p>
            <div className="flex flex-row">
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    className="radio checked:bg-blueDark"
                    checked
                    value="male"
                  />
                  <span className="label-text pl-2">Masculino</span>
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    className="radio checked:bg-blueDark"
                    value="female"
                  />
                  <span className="label-text pl-2">Feminino</span>
                </label>
              </div>
            </div>
          </div>
          <div className="w-full relative mt-4 flex justify-center">
            <button
              type="submit"
              className="btn btn-wide bg-secondary text-white hover:text-brownLight hover:bg-primary hover:border-1 hover:border-primary mx-auto"
            >
              Cadastrar
            </button>
          </div>
        </form>
        <div>
          <Link href={routes.login} className="text-blueDark font-medium">
            Já possui conta?
            <b className="pl-1">Acesse o sistema</b>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default memo(RegisterScreen)
