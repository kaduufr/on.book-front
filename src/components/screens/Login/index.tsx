import { memo, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import routes from '@data/routes'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '@schemas/login.schema'
import { FormLoginType } from '@services/UserService'
import UserProvider from '@providers/UserProvider'
import { useRouter } from 'next/router'
import Loading from '@/components/widgets/Loading'

const LoginScreen = () => {
  const schemaMemo = useMemo(() => loginSchema, [])
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()
  const [loginErrorMessage, setLoginErrorMessage] = useState<string | null>(null)

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schemaMemo),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    register('email')
    register('password')
  }, [register])

  const onSubmit = (data: FormLoginType) => {
    setLoading(true)
    UserProvider.login(data)
      .then(() => {
        push(routes.home).then(() => {
          setLoading(false)
        })
      })
      .catch(() => {
        setLoginErrorMessage('Usuário ou senha incorretos')
        setLoading(false)
      })
  }

  return (
    <div
      className="relative flex justify-center items-center w-full min-h-screen !bg-cover !bg-fixed !bg-center"
      style={{ background: "url('/assets/bg-login-book.avif')" }}
    >
      <div className="w-[500px] min-h-[420px] h-auto rounded-2xl bg-brownLight flex flex-col items-center justify-center gap-y-3 py-2">
        <h1 className="text-primary text-3xl font-bold ">On.Book</h1>
        <h2 className="font-medium text-xl text-primary">Acesse o sistema</h2>

        <form className="flex flex-col gap-y-3 w-full px-16" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label htmlFor="email" className="mb-2 pl-2 font-normal text-primary">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setValue('email', e.target.value)}
              placeholder="Ex: john.doe@mail.com"
              className="input"
            />
            {errors.email && (
              <span className="text-red-500 pt-1 pl-2">{errors?.email?.message || ''}</span>
            )}
          </div>
          <div className="form-control w-full">
            <label htmlFor="password" className="mb-2 pl-2 font-normal text-blue">
              Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setValue('password', e.target.value)}
              placeholder="********"
              className="input w-full max-w-md"
            />
            {errors.password && (
              <span className="text-red-500 pt-1 pl-2">{errors?.password?.message || ''}</span>
            )}
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
        {loginErrorMessage && (
          <span className="text-red-500 pt-1 pl-2">{loginErrorMessage || ''}</span>
        )}

        {loading && <Loading />}
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
