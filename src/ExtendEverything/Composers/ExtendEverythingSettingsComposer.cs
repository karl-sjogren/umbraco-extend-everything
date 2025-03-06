using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using ExtendEverything.Data;
using Umbraco.Extensions;

namespace ExtendEverything.Composers;

public class ExtendEverythingSettingsComposer : IComposer {
    public void Compose(IUmbracoBuilder builder) {
        builder.Services.AddUmbracoDbContext<ExtendEverythingContext>((serviceProvider, options) => {
            options.UseUmbracoDatabaseProvider(serviceProvider);
        });
    }
}
