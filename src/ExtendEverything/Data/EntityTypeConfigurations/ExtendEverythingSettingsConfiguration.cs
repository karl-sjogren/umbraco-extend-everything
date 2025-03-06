using ExtendEverything.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ExtendEverything.Data.EntityTypeConfigurations;

public class ExtendEverythingSettingsConfiguration : IEntityTypeConfiguration<ExtendEverythingSettings> {
    public void Configure(EntityTypeBuilder<ExtendEverythingSettings> entity) {
        entity
            .HasKey(e => e.Id);

        entity
            .ToTable("ExtendEverythingSettings");

        entity
            .Property(e => e.Id);

        entity
            .Property(e => e.GreetingText)
            .IsRequired();

        entity
            .Property(e => e.AwesomeLevel)
            .HasDefaultValue(98)
            .IsRequired();
    }
}
