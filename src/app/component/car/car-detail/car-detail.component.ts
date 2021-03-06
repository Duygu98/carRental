import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';
import { CartImagesService } from 'src/app/services/cart-images.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carDetail:CarDetail;
  carImages:CarImage[]=[];
  currentImage:CarImage;
  imageBasePath=environment.imageUrl;
 
  constructor(private carService:CarService,
              private carImageService:CartImagesService,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"]);
        this.getCarImages(params["carId"]);
    

      }
    })
  }
  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetails(carId).subscribe((response) => {
      this.carDetail = response.data[0];
    });
  }
  getCarImages(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe((response)=>{
      this.carImages = response.data;
    })
  }
  getCurrentImageClass(image:CarImage){
    if(image==this.carImages[0]){
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }
  getButtonClass(image:CarImage){
    if(image==this.carImages[0]){
      return "active"
    } else {
      return ""
    }
  }
  rentOnClick(){
    this.toastrService.info("Lütfen müşteri ve tarih seçin");
  }
}
