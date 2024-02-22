import { Component, Injectable, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule,FormControl , FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../../shared/services/product.service';
import { Product, ResponseDto } from '../../../../core/constants/constants';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent implements OnInit {

  subscriptions = new Subscription()
  productId = ""

  constructor( private productservice:ProductService ) { }
  ngOnInit(): void {
    this.subscriptions.add(this.productservice.editProductId$.subscribe((id)=>{
      if(id){
        this.productId = id
        this.buttonName = "Edit Product"
        this.subscriptions.add(this.productservice.getProduct(id).subscribe((res)=>{
          const {id,...productWithoutId} = res.result
          this.addProductForm.patchValue(productWithoutId)
        }))
      }

    }))
    
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.productservice.clearEditProductId()
  }
  
  buttonName = "Add Product"
  initialFormState = {
    name: '',
    description: '',
    quantity: 1,
    price: 0
  }

  addProductForm = new FormGroup({
    name: new FormControl(this.initialFormState.name,[Validators.required]),
    description: new FormControl(this.initialFormState.description,[Validators.required]),
    quantity: new FormControl(this.initialFormState.quantity,[Validators.min(1),Validators.required]),
    price:new FormControl(this.initialFormState.price,[Validators.min(0),Validators.required])


  })

  addProduct(){
    if(this.buttonName === "Add Product"){
      this.productservice.addProduct(this.addProductForm.value as Product)
      this.addProductForm.reset(this.initialFormState)
    }
    if(this.buttonName === "Edit Product"){
      this.productservice.updateProduct(this.productId,this.addProductForm.value as Product)
      this.addProductForm.reset(this.initialFormState)
      this.buttonName = "Add Product"
      
    }
  }

}
