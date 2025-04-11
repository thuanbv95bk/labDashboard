﻿using Microsoft.AspNetCore.Mvc;
using App.Common.BaseControllers;
using App.Lab.Service.Interface;
using App.Lab.Model;
using App.Lab.App.Service.Interface;
using App.Lab.App.Model;
namespace App.Admin.Controllers
{
    [ApiController]
    [Route("api/groups")]
    public class VehicleGroupsController : BaseController
    {
        private readonly IVehicleGroupsService _service;

        public VehicleGroupsController(IVehicleGroupsService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("GetById")]
        public async Task<IActionResult> GetById(string id)
        {
            var ret = await Task.Run(() => _service.GetById(id));
            return Success(ret);
        }

        [HttpPost]
        [Route("Delete")]
        public async Task<IActionResult> Delete(string id)
        {
            await Task.Run(() => _service.Delete(id));
            return Success();
        }

        [HttpPost]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var ret = await Task.Run(() => _service.GetAll());
            return Success(ret);
        }

        [HttpPost]
        [Route("GetList")]
        public async Task<IActionResult> GetList(VehicleGroupsFilter filter)
        {
            var ret = await Task.Run(() => _service.GetList(filter));
            return Success(ret);
        }


    }
}