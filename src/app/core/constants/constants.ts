export const Constants = {
    AUTH_API_URL: 'http://localhost:5221/api/Auth/',
    PRODUCTS_API_URL:'http://localhost:5031/api/Product/',
    METHODS:{
        LOGIN: 'login',
        REGISTER: 'register',

    }
}

export const Roles = {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
    GUEST: 'User' 
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
    result:any,
    issuccess:boolean,
    errorMessage:string
}

export type ResponseDto = {
    result:any,
    issuccess:boolean,
    errorMessage:string
}
export type Product = {
      id: string,
      name: string,
      description: string
      quantity: number,
      price: number
}

export type AddProduct = {
    name: string,
    description: string
    quantity: number,
    price: number
}

export type ActionResponse = {
    issuccess:boolean,
    message:string
}