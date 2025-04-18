﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using App.Lab.App.Model;

namespace App.Lab.Model
{
    /// <summary>
    ///   <br />
    /// </summary>
    /// <Modified>
    /// Name       Date          Comments
    /// thuanbv 4/16/2025 	nhóm phương tiện theo người dùng
    /// </Modified>
    public class AdminUserVehicleGroup
    {
        public string FK_UserID { get; set; }
        public int FK_VehicleGroupID { get; set; }
        public int? ParentVehicleGroupID { get; set; }
        public string CreatedByUser { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string UpdateByUser { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UpdatedByUser { get; set; }
        public bool? IsDeleted { get; set; }
    }

    public class AdminUserVehicleGroupFilter
    {
        public string FK_UserID { get; set; }
        public int? FK_VehicleGroupID { get; set; }
        public int? ParentVehicleGroupID { get; set; }
        public bool? IsDeleted { get; set; }
    }

    /// <summary>
    ///   <br />
    /// </summary>
    /// <Modified>
    /// Name       Date          Comments
    /// thuanbv 4/16/2025 	nhóm phương tiện theo người dùng- hiển thị view
    /// </Modified>
    public class UserVehicleGroupView : VehicleGroups
    {
        public string PK_UserID { get; set; }
        public override bool? IsDeleted { get; set; }
    }

    public class VehicleGroupModel
    {
        public string PK_UserID { get; set; }
        public List<UserVehicleGroupView> listGroup { get; set; }

    }

}
