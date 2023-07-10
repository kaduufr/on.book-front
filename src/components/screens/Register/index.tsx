import {memo, useEffect, useMemo, useState} from 'react'
import Link from 'next/link'
import routes from '@data/routes'
import {registerSchema} from "@schemas/register.schema";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Loading from "@/components/widgets/Loading";
import UserProvider from "@providers/UserProvider";
import {useRouter} from "next/router";

type FormRegisterType = {
  name: string
  email: string
  password: string
  document: string
}

const RegisterScreen = () => {
  const schemaMemo = useMemo(() => registerSchema, [])
  const [loading, setLoading] = useState(false)
  const [registerErrorMessage, setRegisterErrorMessage] = useState<string | null>(null)
  const { push } = useRouter()

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
    register('name')
    register('email')
    register('password')
    register('document')
  }, [register])

  const onSubmit = (data: FormRegisterType) => {
    setLoading(true)
    UserProvider.register(data)
      .then(() => {
        push(routes.home).then(() => {
          setLoading(false)
        })
      })
      .catch(() => {
        setRegisterErrorMessage('Erro ao cadastrar usuario')
        setLoading(false)
      })
  }

  return (
    <div
      className="relative flex justify-center items-center w-full min-h-screen !bg-cover !bg-fixed !bg-center"
      style={{ background: "url('/assets/bg-login-book.avif')" }}
    >
      <div className="w-[500px] min-h-[420px] h-auto rounded-2xl bg-brownLight flex flex-col items-center justify-center py-4 gap-y-3">
        <h1 className="text-primary text-3xl font-bold ">On.Book</h1>
        <h2 className="font-medium text-xl text-primary">Registre-se</h2>

        <form className="flex flex-col gap-y-2 w-full px-16" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label htmlFor="name" className="mb-2 pl-2 font-normal text-primary">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Ex: John Doe"
              className="input"
              onChange={(e) => setValue('name', e.target.value)}
            />
            {
              errors.name && (
                <span className="text-red-500 text-sm font-medium">
                  {errors?.name?.message || ''}
                </span>
              )
            }
          </div>
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
              onChange={(e) => setValue('email', e.target.value)}
            />
            {
              errors.email && (
                <span className="text-red-500 text-sm font-medium">
                    {errors?.email?.message || ''}
                  </span>
              )
            }
          </div>
          <div className="form-control w-full">
            <label htmlFor="password" className="mb-2 pl-2 font-normal text-primary">
              Senha
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              className="input w-full max-w-md"
              onChange={(e) => setValue('password', e.target.value)}
            />
            {
              errors.password && (
                <span className="text-red-500 text-sm font-medium">
                  {errors?.password?.message || ''}
                </span>
              )
            }
          </div>
          <div className="form-control w-full">
            <label htmlFor="password" className="mb-2 pl-2 font-normal text-primary">
              CPF
            </label>
            <input
              type="text"
              name="document"
              id="document"
              placeholder="000.000.000-00"
              className="input w-full max-w-md"
              onChange={(e) => setValue('document', e.target.value)}
            />
            {
              errors.document && (
                <span className="text-red-500 text-sm font-medium">
                  {errors?.document?.message || ''}
                </span>
              )
            }
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
        {
          registerErrorMessage && (
            <span className="text-red-500 text-sm font-medium">
              {registerErrorMessage}
            </span>
          )
        }
        {
          loading && (
            <Loading/>
          )
        }
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
