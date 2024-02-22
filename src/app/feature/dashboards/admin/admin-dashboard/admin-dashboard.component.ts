import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/constants/constants';
import { ProductService } from '../../../../shared/services/product.service';
import { Subscription } from 'rxjs';
import { AddproductComponent } from '../addproduct/addproduct.component';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AddproductComponent,AsyncPipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{


   subscription:Subscription = new Subscription()
   products:Product[] = []

	constructor(private productservice:ProductService) {}
	ngOnInit(): void {
		this.subscription = this.productservice.products$.subscribe((products)=>{
			this.products = products
		})
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe()
	}

	removeProduct(id:string){
		this.productservice.deleteProduct(id)
	}
	editProduct(id:string){
		this.productservice.setEditProductId(id)
	}
}
