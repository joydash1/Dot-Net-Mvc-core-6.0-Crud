using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OrderInventory.BLL.Infrastructure.IRepository;
using OrderInventory.DAL.Context;
using OrderInventory.DAL.Models;
using System.Formats.Asn1;
using System.Reflection.Metadata.Ecma335;

namespace OrderInventory.Web.Controllers
{
    public class OrderInventoryController : Controller
    {
        private readonly IOrderInventory _orderRepo;
        public OrderInventoryController(IOrderInventory orderRepo)
        {
            _orderRepo = orderRepo;
        }

        public IActionResult Index()
        {
            return View();
        }
        public async Task<JsonResult> GetAllOrderList()
        {
            var List = await _orderRepo.GetALL();
            return new JsonResult(List);
        }
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Create(Order order)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    await _orderRepo.ADD(order);

                    return new JsonResult("Save SuccessFully");
                }
                else
                {
                    TempData["errorMessage"] = "Something Goes Weong";
                    return View();
                }
            }
            catch (Exception ex)
            {
                TempData["errorMessage"] = ex.Message;
                return View();

            }

        }
        [HttpGet]
        public async Task<JsonResult> Edit(int id)
        {
            var obj = await _orderRepo.GEtByID(id);
            return new JsonResult(obj);
        }
        [HttpPost]
        public async Task<IActionResult> Update(Order model)
        {
            await _orderRepo.Update(model);
            return new JsonResult("Product Update Successfully");
        }
        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            Order order = await _orderRepo.GEtByID(id);
            if (order != null)
            {
                return new JsonResult(order);
            }
            return View(nameof(Index));
        }
        [HttpPost, ActionName("Delete")]
        public async Task<IActionResult> DeleteRow(Order model)
        {
            await _orderRepo.Delete(model.ID);
            return new JsonResult(nameof(Index));
        }
    }
}
