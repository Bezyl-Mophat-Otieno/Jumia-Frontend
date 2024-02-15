export const Constants = {
    AUTH_API_URL: 'http://localhost:5221/api/Auth/',
    METHODS:{
        LOGIN: 'login',
        REGISTER: 'register'
    }
}

export  type IRegister = {
  name: string,
  email: string,
  password: string,
  phoneNumber: string,
  role?: string
}
export  type ILogin = {
  email: string,
  password: string
}

export type LoginResponseDto = {
    result:string,
    issuccess:boolean,
    errorMessage:string
}