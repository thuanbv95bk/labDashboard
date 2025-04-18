﻿using App.Common.Helper;
using App.DataAccess;
using App.Lab.App.Model;
using App.Lab.App.Repository.Interface;
using App.Lab.Model;
using App.Lab.Repository.Interface;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Lab.Repository.Implement
{
    
    public class VehicleGroupsRepository : Repo, IVehicleGroupsRepository
    {
        public VehicleGroupsRepository(IUnitOfWork unitOfWork) : base(unitOfWork) { Schema = "Vehicle"; }
        public VehicleGroupsRepository(IHttpContextAccessor accessor, IUnitOfWork unitOfWork) : base(accessor, unitOfWork) { Schema = "Vehicle"; }


        /// <summary>Gets the view by identifier.</summary>
        /// <param name="PK_VehicleGroupID">The pk vehicle group identifier.</param>
        /// <returns>
        ///   <br />
        /// </returns>
        /// <Modified>
        /// Name       Date          Comments
        /// thuanbv 4/16/2025 	lấy thông nhóm phương tiện theo ID của nó
        /// </Modified>
        public UserVehicleGroupView GetViewById(int PK_VehicleGroupID)
        {
            string sql = @"select * from [Vehicle.Groups] where PK_VehicleGroupID = @PK_VehicleGroupID";
            var parameters = this.MapToSqlParameters(new { PK_VehicleGroupID });

            this.ExecCommand<UserVehicleGroupView>(out var retList, sql, parameters);
            return retList.FirstOrDefault();
        }

        public List<VehicleGroups> GetList(VehicleGroupsFilter filter)
        {
            var listOrderOption = new OrderOption[] {
            new OrderOption {
                Column = "Name",
                OrderType = "ASC",
            }};
            var listFilter = MapFilterToOptions(filter);
            this.GetTableData
            (
                out List<VehicleGroups> ret
                , "Groups", null, listFilter
            );
            return ret;

        }
    }
}
