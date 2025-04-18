import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Groups } from '../../model/groups';
import { UserVehicleGroupView } from '../../model/user-vehicle-group';
@Component({
  selector: 'app-select-row-groups',
  templateUrl: './select-row-groups.component.html',
  styleUrls: ['./select-row-groups.component.scss'],
})
export class SelectRowGroupsComponent {
  @Input()
  attribute!: UserVehicleGroupView;

  @Input() allSelected: boolean = false;
  @Output() selectedChange = new EventEmitter<UserVehicleGroupView>();

  /**
   * Toggles select all
   * @description chọn/ bỏ chọn check all
   * emit sự kiện ra ngoài: trả về danh sách
   */
  toggleSelectAll() {
    if (this.allSelected) {
      this.attribute.allComplete = true;
      this.attribute.isSelected = true;
      this.attribute.groupsChild.forEach((x) => (x.isSelected = true));
    } else {
      this.attribute.allComplete = false;
      this.attribute.isSelected = false;
      this.attribute.groupsChild.forEach((x) => (x.isSelected = false));
    }
    this.attribute.isUiCheck = this.allSelected;
    this.selectedChange.emit(this.attribute);
  }

  /**
   * Padding level
   * Thêm padding cho item nếu nó là cấp con
   * @param item
   * @returns
   */
  paddingLevel(item: UserVehicleGroupView) {
    if (item.parentVehicleGroupId) {
      return 'padding-' + (item.level - 1);
    }
    return 'padding-0';
  }

  /**
   * Updates all complete
   * chọn all từ 1 cấp cha
   * @param Attribute
   */
  updateAllComplete(attribute: UserVehicleGroupView) {
    attribute.allComplete = attribute.groupsChild != null && attribute.groupsChild.every((t) => t.isSelected);
    this.attribute.isSelected = attribute.allComplete;
  }

  someComplete(node: UserVehicleGroupView): boolean {
    if (node.groupsChild == null) {
      return false;
    }

    return node.groupsChild.filter((t) => t.isSelected).length > 0 && !node.allComplete;
  }

  onCheckboxChange(event: Event, item: UserVehicleGroupView): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    item.isSelected = isChecked;
    this.changeEditNode(isChecked, item);
    if (this.attribute.groupsChild.length == 1) this.attribute.isSelected = isChecked;
    this.attribute.isUiCheck = isChecked;
    this.selectedChange.emit(this.attribute);
  }

  changeEditNode(checked: boolean, attribute: UserVehicleGroupView) {
    attribute.allComplete = checked;
    attribute.isSelected = checked;
    if (attribute.groupsChild == null) {
      return;
    }
    attribute.groupsChild.forEach((t) => (t.isSelected = checked));
  }

  /**
   * Toggles visibility
   * Mở / đóng 1 cây
   * @param attribute
   */
  toggleVisibility(attribute: UserVehicleGroupView) {
    attribute.isHideChildren = !attribute.isHideChildren; // Mở hoặc đóng
  }
}
