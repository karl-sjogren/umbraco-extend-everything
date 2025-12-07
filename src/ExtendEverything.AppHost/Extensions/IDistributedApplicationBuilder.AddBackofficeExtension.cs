namespace Umbraco.Aspire.AppHost.Extensions;

public static partial class IDistributedApplicationBuilderExtensions {
    public static IDistributedApplicationBuilder AddBackofficeExtensions(
            this IDistributedApplicationBuilder builder,
            IResourceBuilder<ProjectResource> umbracoProject) {
        if(builder.ExecutionContext.IsRunMode) {
            var backofficeExtension = builder.AddJavaScriptApp("extendeverything-backoffice-extension", "../ExtendEverything/Client", runScriptName: "watch");

            umbracoProject.WithReference(backofficeExtension)
                .WaitFor(backofficeExtension);

            var tetrisExtension = builder.AddJavaScriptApp("extendeverything-tetris-dashboard", "../ExtendEverything.TetrisDashboard/Client", runScriptName: "watch")
                .WithYarn();

            umbracoProject.WithReference(tetrisExtension)
                .WaitFor(tetrisExtension);
        }

        return builder;
    }
}
