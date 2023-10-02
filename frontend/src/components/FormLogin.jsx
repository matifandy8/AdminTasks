"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import Error from "@/components/Error"
import useAuth from "@/hooks/useAuth"

const FormLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alerta, setAlerta] = useState(false)

  const { setAuth, handleprofile } = useAuth()

  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()

    if ([email, password].includes("")) {
      setAlerta({ msg: "Por favor rellene los campos", error: true })
      return
    }
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/usuario/login",
        { email, password }
      )
      localStorage.setItem("token", data.token)
      setAuth(data)
      router.push("/adminTask")
    } catch (error) {
      console.log(error)
    }
  }

  const { msg } = alerta

  return (
    <>
      <h1 className="text-6xl font-bold mt-20">
        Bienvenido a AdminTask
        {""}
        <span className="block text-[#7c44f3] bg-gradient-to-r from-violet-300 to-violet-600 text-transparent bg-clip-text">
          Un administrador de tareas
        </span>
      </h1>
      {msg && <Error alerta={alerta} />}

      <div className="bg-[#393c71] w-[40rem] h-[30rem] mt-20 rounded-xl mx-auto shadow-xl">
        <form onSubmit={handleLogin} className="p-10">
          <div className="flex-col items-center mt-[3rem]">
            <label className="flex justify-start text-xl text-gray-400 p-1">
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su correo"
              className=" outline-none bg-[#1a2040] p-4 rounded-lg text-gray-500 w-full shadow-inner"
            />
            <label className="flex justify-start text-xl text-gray-400 mt-5 p-1">
              Password:
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Ingrese su contraseña"
              className=" outline-none bg-[#1a2040] w-full p-4 rounded-lg text-gray-500 shadow-inner"
            />
          </div>

          <button
            onClick={handleprofile}
            type="submit"
            className="bg-[#1a2040] p-4 rounded-xl w-full mt-20 uppercase shadow-xl hover:transition-colors text-gray-500">
            Iniciar sesion
          </button>
        </form>

        <nav className="lg:flex lg:justify-between mt-5">
          <Link
            href="/registro"
            className="block text-center my-3 text-slate-500 uppercase text-sm">
            Registrate si no tienes una cuenta
          </Link>
          <div className="top-28">
            <Link
              href="/olvidastePassword"
              className="block text-center my-3 text-slate-500 uppercase text-sm">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}

export default FormLogin