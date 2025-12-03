namespace Umbraco.Aspire.AppHost.Extensions;

public static partial class IDistributedApplicationBuilderExtensions {
    public static IDistributedApplicationBuilder AddAzureSql(
            this IDistributedApplicationBuilder builder,
            IResourceBuilder<ProjectResource> umbracoProject,
            string serverName,
            string databaseName) {
        var azureSql = builder.AddAzureSqlServer(serverName);

        if(builder.ExecutionContext.IsRunMode) {
            azureSql
                .RunAsContainer(x => {
                    x.WithDataVolume();
                    x.WithLifetime(ContainerLifetime.Persistent);
                });
        }

        var azureSqlDatabase = azureSql
            .AddDatabase(databaseName);

        umbracoProject
            .WithReference(azureSqlDatabase)
            .WaitFor(azureSqlDatabase)
            .WithEnvironment("ConnectionStrings__umbracoDbDSN", azureSqlDatabase);

        return builder;
    }
}
