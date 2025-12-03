using ExtendEverything.Umbraco;
using Serilog;
using Serilog.Configuration;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddSerilog();
builder.Services.AddSingleton<ILoggerSettings, DefaultLoggerSettings>();

builder.CreateUmbracoBuilder()
    .AddBackOffice()
    .AddWebsite()
    .AddComposers()
    .Build();

var app = builder.Build();

await app.BootUmbracoAsync();

app.UseUmbraco()
    .WithMiddleware(u => {
        u.UseBackOffice();
        u.UseWebsite();
    })
    .WithEndpoints(u => {
        u.UseBackOfficeEndpoints();
        u.UseWebsiteEndpoints();
    });

await app.RunAsync();
