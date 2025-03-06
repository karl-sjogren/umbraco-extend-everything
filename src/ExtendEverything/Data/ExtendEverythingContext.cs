using ExtendEverything.Models;
using Microsoft.EntityFrameworkCore;

namespace ExtendEverything.Data;

public class ExtendEverythingContext : DbContext {
    public ExtendEverythingContext(DbContextOptions<ExtendEverythingContext> options)
        : base(options) {
    }

    public required DbSet<ExtendEverythingSettings> ExtendEverythingSettings { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) =>
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ExtendEverythingContext).Assembly);
}
