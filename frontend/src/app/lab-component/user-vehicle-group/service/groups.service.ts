import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../app.config';
import { BaseDataService } from '../../../service/API-service/base-data.service';
import { Urls } from '../model/urls/groups.urls';
import { RespondData } from '../../../service/API-service/base.service';

@Injectable({
  providedIn: 'root',
})
export class GroupsService extends BaseDataService {
  _getByIdUrl = AppConfig.apiEndpoint + Urls.getById;
  _getAllUrl = AppConfig.apiEndpoint + Urls.getAll;
  _getListUrl = AppConfig.apiEndpoint + Urls.getList;
  _addOrEditUrl = AppConfig.apiEndpoint + Urls.addOrEdit;
  _deleteUrl = AppConfig.apiEndpoint + Urls.delete;
  _getListUnassignGroupsUrl = AppConfig.apiEndpoint + Urls.getListUnassignGroups;
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getListUnassignGroups(filterModel: any, noLoadingMark = false): Promise<RespondData> {
    return this.postData(this._getListUnassignGroupsUrl, filterModel, noLoadingMark);
  }
}
