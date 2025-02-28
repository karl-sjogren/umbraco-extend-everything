using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;

namespace ExtendEverything.Controllers;

[ApiController]
[BackOfficeRoute("extendeverything/api/v{version:apiVersion}")]
[Authorize(Policy = AuthorizationPolicies.SectionAccessContent)]
[MapToApi(Constants.ApiName)]
public class ExtendEverythingApiControllerBase : ManagementApiControllerBase {
}
