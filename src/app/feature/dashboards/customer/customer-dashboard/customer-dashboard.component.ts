import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/constants/constants';
import { ProductService } from '../../../../shared/services/product.service';
import { Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit {
  
  subscription:Subscription = new Subscription()
  products:Product[] = []
  
  constructor(private productservice:ProductService){}
  ngOnInit(): void {
    this.subscription = this.productservice.products$.subscribe(sub=>{
      this.products = sub
    })

  }

addToCart (id:string){
  this.productservice.addToCart(id)
}

ngOnDestroy(){
  this.subscription.unsubscribe();
}

}
