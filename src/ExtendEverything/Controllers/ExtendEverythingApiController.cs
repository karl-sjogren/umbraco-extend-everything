using System.Reflection;
using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExtendEverything.Controllers;

[ApiVersion("1.0")]
[ApiExplorerSettings(GroupName = "ExtendEverything")]
public class ExtendEverythingApiController : ExtendEverythingApiControllerBase {
    [HttpGet("ping")]
    [ProducesResponseType<string>(StatusCodes.Status200OK)]
    public string Ping() => "Pong";

    [HttpGet("version")]
    [ProducesResponseType<string>(StatusCodes.Status200OK)]
    public string Version() => Assembly.GetExecutingAssembly().GetName().Version?.ToString() ?? "Unknown";
}
