using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebService.Models;

namespace WebService.Controllers
{
    public class ProductsController : ApiController
    {
        DefaultDbContext context = null;

        public ProductsController()
        {
            context = new DefaultDbContext();
        }

        // GET: api/Products
        public IEnumerable<Product> Get()
        {
            return context.Products;
        }

        // GET: api/Products/5
        public Product Get(int id)
        {
            return context.Products.Find(id);
        }

        // POST: api/Products
        [Authorize]
        public void Post(Product value)
        {
            if (ModelState.IsValid)
            {
                context.Products.Add(value);
                context.SaveChanges();
            }
        }

        // PUT: api/Products/5
        [Authorize]
        public void Put(Product updated)
        {
            if (ModelState.IsValid)
            {
                var product = (from p in context.Products
                               where p.Id == updated.Id
                               select p).SingleOrDefault();
                if (product == null)
                    return;

                product.PartNumber = updated.PartNumber;
                product.PartDescription = updated.PartDescription;
                product.Price = updated.Price;

                context.Entry<Product>(product).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
            }
        }

        // DELETE: api/Products/5
        [Authorize]
        public void Delete(int id)
        {
            var product = context.Products.Find(id);
            if (product == null)
                return;

            context.Entry<Product>(product).State = System.Data.Entity.EntityState.Deleted;
            context.SaveChanges();
        }
    }
}
