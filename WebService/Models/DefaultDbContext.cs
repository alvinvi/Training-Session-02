namespace WebService.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class DefaultDbContext : DbContext
    {
        public DefaultDbContext()
            : base("name=DefaultContextModel")
        {
        }

        public virtual DbSet<Product> Products { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(e => e.PartNumber)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.PartDescription)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.Price)
                .HasPrecision(19, 4);
        }
    }
}
