import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AddProduct, Constants, Product, ResponseDto } from '../../core/constants/constants';
import { BehaviorSubject, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsSource = new BehaviorSubject<Product[]>([])
  private editProductIdSource = new BehaviorSubject<string>("")
  private cartSource = new BehaviorSubject<Product[]>([])
  cart$ = this.cartSource.asObservable()
  editProductId$ = this.editProductIdSource.asObservable()
  products$ = this.productsSource.asObservable()
  success = false
 
  constructor(private http:HttpClient) { 
    this.getAllProducts()
  }

  getAllProducts(){
     (this.http.get(Constants.PRODUCTS_API_URL)as Observable<ResponseDto>).subscribe((res)=>{
      this.productsSource.next(res.result)
     })
  }
  deleteProduct(id:string){
    (this.http.delete(Constants.PRODUCTS_API_URL+id) as Observable<ResponseDto>).subscribe((res)=>{

      this.productsSource.next(this.productsSource.getValue().filter((product)=>product.id!==id))
    })
  }

  getProduct(id:string){
    return (this.http.get(Constants.PRODUCTS_API_URL+id) as Observable<ResponseDto>)
  }

  addProduct(product:AddProduct){
     (this.http.post(Constants.PRODUCTS_API_URL+"add", product) as Observable<ResponseDto>).subscribe((res)=>{
      this.productsSource.next([...this.productsSource.getValue(),res.result])
  })
  }
  setEditProductId(id:string){
    this.editProductIdSource.next(id)
  }
  clearEditProductId(){
    this.editProductIdSource.next("")
  }
  
  addToCart(id:string){
    const productAdded = this.productsSource.getValue().find(product=>product.id === id)
    this.cartSource.next([...this.cartSource.getValue() , productAdded as Product])

    this.cart$.subscribe(sub=>{
      console.log(sub)
    } )
  }

 updateProduct(id: string, updatedProduct: Product) {
  (this.http.put(`${Constants.PRODUCTS_API_URL}update/${id}`, updatedProduct) as Observable<ResponseDto>).subscribe((res) => {
    // Assuming 'res.result' contains the updated product or a success message
    if (res.result === "Product Updated Successfully") {
      const updatedProducts = this.productsSource.getValue().map(product => {
        // Ensure the updated product is used if IDs match
        return product.id === id ? { ...product, ...updatedProduct } : product;
      });
      this.productsSource.next(updatedProducts); 
    }
  }, error => {
    console.error('Error updating product:', error);
  });
}
}
