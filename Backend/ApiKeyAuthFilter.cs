using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Backend
{
    public class ApiKeyAuthFilter : IAuthorizationFilter
    {
        private readonly IConfiguration _configuration;

        public ApiKeyAuthFilter(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if(!context.HttpContext.Request.Headers.TryGetValue("X-BACKEND-KEY", out var extractedApiKey))
            {
                context.Result = new ContentResult()
                {
                    StatusCode = 401,
                    Content = "Api Key was not provided."
                };
                return;
            }

            string apiKey = Environment.GetEnvironmentVariable("X-BACKEND-KEY");
            if(string.IsNullOrEmpty(apiKey))
            {
                apiKey = _configuration["X-BACKEND-KEY"];
            }
            if (!apiKey.Equals(extractedApiKey))
            {
                context.Result = new ContentResult()
                {
                    StatusCode = 401,
                    Content = "Invalid Api key."
                };
                return;
            }
        }
    }
}
