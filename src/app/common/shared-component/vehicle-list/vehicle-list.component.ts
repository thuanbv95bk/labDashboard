import { Component, OnInit } from '@angular/core';
import { LocationEnum } from '../../model/enum/location.enum';
import { Vehicle } from '../../model/enum/vehicle.model';
import { VehicleDataService } from '../../../service/vehicle-data/vehicle-data.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss',
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  numberVehicle: number = 0;
  filteredVehicles: Vehicle[] = [];
  locations = Object.values(LocationEnum);
  selectedLocation: string = '';
  selectedIsLoaded: string = '';

  constructor(private vehicleService: VehicleDataService) {}

  ngOnInit(): void {
    this.vehicles = this.vehicleService.getVehicles();

    this.filteredVehicles = [...this.vehicles];
    this.numberVehicle = this.filteredVehicles.length;
  }

  async filterVehicles(): Promise<void> {
    this.filteredVehicles = await this.vehicles.filter(
      (vehicle) =>
        (this.selectedLocation
          ? vehicle.location == this.selectedLocation
          : true) &&
        (this.selectedIsLoaded !== ''
          ? vehicle.isLoaded.toString() == this.selectedIsLoaded
          : true)
    );
    this.numberVehicle = this.filteredVehicles.length;
  }
}
