import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/constants/constants';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor(private productservice:ProductService){}
  ngOnInit(): void {
    this.productservice.cart$.subscribe(sub=>{
      console.log(sub)
      this.cartproducts = sub
    })
    
  }

  subscription:Subscription = new Subscription();
  cartproducts:Product[] = []

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
