using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderInventory.DAL.Models
{
    public class Order
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string C_Name { get; set; }
        [Required]
        public string P_Name { get; set; }
        [Required]
        public int Order_Qty { get; set; }
        [Required]
        public string C_Address { get; set; }
        [Required]
        public double UnitPrice { get; set; }
        [Required]
        public double Discount { get; set; }
        [Required]
        public double TotalPrice { get; set; }
        [Required]
        public DateTime Order_Date { get; set; } = DateTime.Now;

    }
}
