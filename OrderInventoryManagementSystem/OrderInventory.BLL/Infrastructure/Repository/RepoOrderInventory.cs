using Microsoft.EntityFrameworkCore;
using OrderInventory.BLL.Infrastructure.IRepository;
using OrderInventory.DAL.Context;
using OrderInventory.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderInventory.BLL.Infrastructure.Repository
{
    public class RepoOrderInventory : IOrderInventory
    {
        private readonly InventoryDbContext _context;

        public RepoOrderInventory(InventoryDbContext context)
        {
            _context = context;
        }

        public async Task ADD(Order model)
        {
            await _context.OrderTable.AddAsync(model);
            await Save(); 
        }

        public async Task Delete(int id)
        {
            var obj = await _context.OrderTable.FindAsync(id);
            if (obj != null)
            {
                _context.OrderTable.Remove(obj);
                await Save();
            }

        }

        public async Task<IEnumerable<Order>> GetALL()
        {
            var OrderList = await _context.OrderTable.ToListAsync();
            return OrderList;
        }

        public async Task<Order> GEtByID(int id)
        {
            return await _context.OrderTable.FindAsync(id);
        }

        public async Task Update(Order model)
        {
           var obj = await _context.OrderTable.FindAsync(model.ID);
            if (obj != null)
            {
                obj.C_Name = model.C_Name;
                obj.P_Name = model.P_Name;
                obj.Order_Qty = model.Order_Qty;
                obj.C_Address = model.C_Address;
                obj.UnitPrice = model.UnitPrice;
                obj.Discount = model.Discount;
                obj.TotalPrice = model.TotalPrice;
                obj.Order_Date = model.Order_Date;
                _context.Update(obj);
                await Save();
            }
        }

        private async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}
