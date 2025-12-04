namespace Umbraco.Aspire.AppHost.Extensions;

public static partial class IDistributedApplicationBuilderExtensions {
    public static IDistributedApplicationBuilder AddBackofficeExtension(
            this IDistributedApplicationBuilder builder,
            IResourceBuilder<ProjectResource> umbracoProject,
            string resourceName) {
        if(builder.ExecutionContext.IsRunMode) {
            var backofficeExtension = builder.AddJavaScriptApp(resourceName, "../ExtendEverything/Client", runScriptName: "watch");

            umbracoProject.WithReference(backofficeExtension)
                .WaitFor(backofficeExtension);
        }

        return builder;
    }
}
