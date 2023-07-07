interface IUserLogged {

}

export default function useUserLogged() {
  function isLogged(): boolean {
    return false
  }

  return {
    isLogged
  }
}
