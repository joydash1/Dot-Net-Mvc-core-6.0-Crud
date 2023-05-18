using OrderInventory.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderInventory.BLL.Infrastructure.IRepository
{
    public interface IOrderInventory
    {
        Task<IEnumerable<Order>> GetALL();
        Task<Order> GEtByID(int id);
        Task ADD(Order model);
        Task Update(Order model);
        Task Delete(int id);
 
    }
}
