using Umbraco.Aspire.AppHost.Extensions;

var builder = DistributedApplication.CreateBuilder(args);

var umbraco = builder.AddUmbracoProject<Projects.ExtendEverything_Umbraco>("extendeverything-umbraco");

builder
    .AddAzureSql(umbraco, "extendeverything-sql", "extendeverything-sqldb")
    .AddAzureStorage(umbraco, "extendeverything-storage", "umbracomedia")
    .AddRedisCache(umbraco, "extendeverything-redis")
    .AddBackofficeExtension(umbraco, "extendeverything-backoffice-extension");

builder.Build().Run();
