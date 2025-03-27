import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { VehicleDataService } from '../service/vehicle-data/vehicle-data.service';
import { Vehicle } from '../common/model/vehicle/vehicle.model';
import {
  ClassCol,
  Dashboard,
  DashboardClassCol,
} from '../common/model/dashboard/dashboard.model';
import { LocationEnum } from '../common/model/vehicle/location.enum';
import { DashboardDoughnutComponent } from '../common/widget-item/dashboard-doughnut/dashboard-doughnut.component';

@Component({
  selector: 'app-dash-board-grid',
  templateUrl: './dash-board-grid.component.html',
  styleUrl: './dash-board-grid.component.scss',
})
export class DashBoardGridComponent implements OnInit, OnDestroy {
  vehicles: Vehicle[] = [];
  totalVehicles: number = 0;
  dashboardModel = new Dashboard();
  locationEnum = LocationEnum;
  filteredVehicles: Vehicle[] = [];
  isAllSelectedVehicles: boolean = false;

  myClass = 'col-4';

  arrCol = new DashboardClassCol();

  /**
   * Interval refresh of dash board component
   * @description Thời gian để tải lại dữ liệu
   * @value Mặc đinh 5 phút
   */
  intervalRefresh: number = 300000; //5000
  intervalId: any;
  /**
   * Determines whether visible overview is
   *@description Ẩn hiện widget TỔNG QUAN CÔNG TY
   *@value true: hiện
   *@value false: Ẩn đi
   */
  isVisibleOverView: boolean = true;
  /**
   * Determines whether visible overview is
   *@description Ẩn hiện widget TỔNG QUAN CÔNG TY
   *@value True: hiện
   *@value false: Ẩn đi
   */

  /**
   * @description biến lưu giá trị width của widget  TỔNG QUAN CÔNG TY
   * @value mặc định :0-> chế độ tự động
   * @value mặc định :1-> 1/3 chiều rộng màn hình
   * @value mặc định :2-> 2/3 chiều rộng màn hình
   * @value mặc định :3-> 3/3 chiều rộng màn hình
   */
  widthSelectedOverView: number = 0;
  /**
   * Determines whether visible border gate is
   * @description Ẩn hiện widget PHƯƠNG TIỆN TẠI CỬA KHẨU
   * true: hiện
   * false: Ẩn đi
   */
  isVisibleBorderGate: boolean = true;

  /**
   * Determines whether visible on the road is
   * @description Ẩn hiện widget PHƯƠNG TIỆN ĐANG TRÊN ĐƯỜNG
   * @value true: hiện
   * @value false: Ẩn đi
   */
  isVisibleOnTheRoad: boolean = true;
  /**
   * Determines whether visible at the factory
   * @description Ẩn hiện widget PHƯƠNG TIỆN TẠI NHÀ MÁY
   * @value true: hiện
   * @value false: Ẩn đi
   */
  isVisibleAtTheFactory: boolean = true;

  /**
   * Determines whether visible at the port is
   * @description Ẩn hiện widget PHƯƠNG TIỆN TẠI CẢNG
   * @value true: hiện
   * @value false: Ẩn đi
   */
  isVisibleAtThePort: boolean = true;

  widthSelected: string = '';

  constructor(private vehicleService: VehicleDataService) {
    this.totalVehicles = this.vehicles.length;
    this.arrCol.setUp();
    this.setupCol();
  }

  async ngOnInit(): Promise<void> {
    await this.initData();
    this.getDataToDashBoard(this.filteredVehicles);
    this.startInterval();
    // this.arrCol.setUp();
    console.log('this.arrCol');
    console.log(this.arrCol);
  }
  ngOnDestroy() {
    this.stopInterval();
  }

  /**
   * Inits data
   * @description Khởi tạo dữ liệu của danh sách xe
   * @author thuan.bv
   */
  async initData() {
    this.isAllSelectedVehicles = true;
    this.vehicles = await this.vehicleService.getVehicles();
    this.filteredVehicles = [...this.vehicles];
  }

  /**
   * Starts interval
   * @description Bật time để cho loading dữ liệu :
   * Theo thời gian : intervalRefresh : 5 phút
   */
  startInterval() {
    this.intervalId = setInterval(async () => {
      await this.initData();
      this.getDataToDashBoard(this.filteredVehicles);
    }, this.intervalRefresh);
  }

  stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  /**
   * Determines whether selected change vehicle on
   * @description event khi chọn xe từ select màn hình
   * @param selectedItems : danh sách xe đã chọn/click ở màn hình
   * @description Hàm này đồng thời tính toán dữ liệu để đẩy sang đồng bộ với các widget
   */
  onSelectedChangeVehicle(selectedItems: Vehicle[]) {
    this.getDataToDashBoard(selectedItems);
  }

  /**
   * Gets data to dash board
   * @description tính toán dữ liệu để đẩy vào widget
   * @param listVehicles : danh sách xe đã chọn
   */
  getDataToDashBoard(listVehicles: Vehicle[]) {
    this.dashboardModel.isReloadView = !this.dashboardModel.isReloadView;
    this.dashboardModel.totalVehicles = listVehicles.length;

    this.dashboardModel.emptyVehicles = listVehicles.filter(
      (x) => x.isLoaded == false
    ).length;

    this.dashboardModel.loadedVehicles = listVehicles.filter(
      (x) => x.isLoaded == true
    ).length;

    this.dashboardModel.vehicleBorderGate = this.vehicleService.getSummary(
      listVehicles,
      this.locationEnum.CuaKhau
    );
    this.dashboardModel.vehicleOnTheRoad = this.vehicleService.getSummary(
      listVehicles,
      this.locationEnum.TrenDuong
    );

    this.dashboardModel.listVehicleAtTheFactory =
      this.vehicleService.getCompanySummary(
        listVehicles.filter((x) => x.location == this.locationEnum.NhaMay)
      );

    this.dashboardModel.listVehicleAtThePort =
      this.vehicleService.getCompanySummary(
        listVehicles.filter((x) => x.location == this.locationEnum.TaiCang)
      );
  }

  /**
   * Refresh over view
   * @event loading dữ liệu, tính toán lại để đưa vào widget tương ứng
   */
  refreshOverView() {
    this.dashboardModel.isReloadView = !this.dashboardModel.isReloadView;
    this.dashboardModel.totalVehicles = 0;
    this.dashboardModel.emptyVehicles = 0;
    this.dashboardModel.loadedVehicles = 0;

    this.dashboardModel.totalVehicles = this.filteredVehicles.length;
    this.dashboardModel.emptyVehicles = this.filteredVehicles.filter(
      (x) => x.isLoaded == false
    ).length;
    this.dashboardModel.loadedVehicles = this.filteredVehicles.filter(
      (x) => x.isLoaded == true
    ).length;
  }
  /**
   * Refresh over BorderGate
   * @event loading dữ liệu, tính toán lại để đưa vào widget cửa khẩu
   */

  refreshBorderGate() {
    this.dashboardModel.vehicleBorderGate = this.vehicleService.getSummary(
      this.filteredVehicles,
      this.locationEnum.CuaKhau
    );
  }

  /**
   * Refresh on the road
   * @event loading dữ liệu, tính toán lại để đưa vào widget xe đang trên đường
   */
  refreshOnTheRoad() {
    this.dashboardModel.vehicleOnTheRoad = this.vehicleService.getSummary(
      this.filteredVehicles,
      this.locationEnum.TrenDuong
    );
  }

  /**
   * Refresh at the factory
   * @event loading dữ liệu, tính toán lại để đưa vào widget xe tại nhà máy
   */
  refreshAtTheFactory() {
    this.dashboardModel.listVehicleAtTheFactory =
      this.vehicleService.getCompanySummary(
        this.filteredVehicles.filter(
          (x) => x.location == this.locationEnum.NhaMay
        )
      );
  }

  /**
   * Refresh at the port
   * @event loading dữ liệu, tính toán lại để đưa vào widget xe tại cảng
   */
  refreshAtThePort() {
    this.dashboardModel.listVehicleAtThePort =
      this.vehicleService.getCompanySummary(
        this.filteredVehicles.filter(
          (x) => x.location == this.locationEnum.TaiCang
        )
      );
  }

  /**
   * Changes width selected
   * @event sự kiện click chọn option thay đỗi kích
   * thước màn hình của các widget
   * @param selectWidth
   * @param locationEnum vị trí tương ứng định nghĩa ở enum location
   */
  changeWidthSelected(selectWidth: number, locationEnum: string) {
    this.widthSelectedOverView = selectWidth;
    console.log(selectWidth);
    console.log(locationEnum);

    if (
      this.widthSelectedOverView == 1 &&
      locationEnum == this.locationEnum.TongQuan
    ) {
      this.myClass = this.arrCol.A.small;
      console.log(this.myClass);
    } else if (
      this.widthSelectedOverView == 0 &&
      locationEnum == this.locationEnum.TongQuan
    ) {
      this.myClass = this.arrCol.A.auto;
    } else if (
      this.widthSelectedOverView == 2 &&
      locationEnum == this.locationEnum.TongQuan
    ) {
      this.myClass = this.arrCol.A.medium;
    } else if (
      this.widthSelectedOverView == 3 &&
      locationEnum == this.locationEnum.TongQuan
    ) {
      this.myClass = this.arrCol.A.big;
    }
  }

  setupCol() {
    this.myClass = this.arrCol.A.auto;
  }
}
