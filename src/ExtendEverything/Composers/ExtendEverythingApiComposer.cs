using Microsoft.OpenApi;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Api.Common.OpenApi;
using Umbraco.Cms.Api.Management.OpenApi;

namespace ExtendEverything.Composers;

public class ExtendEverythingApiComposer : IComposer {
    public void Compose(IUmbracoBuilder builder) =>
        builder.AddBackOfficeOpenApiDocument(
            Constants.ApiName,
            document => document
                .WithTitle("Umbraco Extension Backoffice API")
                .WithBackOfficeAuthentication()
                .WithJsonOptions(Umbraco.Cms.Core.Constants.JsonOptionsNames.BackOffice)
                .ConfigureOpenApiOptions(options =>
                    options.AddDocumentTransformer((doc, _, _) => {
                        doc.Info.Version = "1.0";
                        doc.Info.Contact = new OpenApiContact {
                            Name = "Karl-Johan Sjögren",
                            Url = new Uri("https://github.com/karl-sjogren/umbraco-extend-everything/")
                        };
                        return Task.CompletedTask;
                    })));
}
