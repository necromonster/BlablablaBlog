using BlablablaBlog.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Yarp.ReverseProxy.Transforms;
using Microsoft.AspNetCore.Authentication;
using System.Net.Http.Headers;
using BlablablaBlog.Server.Controllers;
using BlablablaBlog.Server.Model;
using System.Reflection.Metadata;

var builder = WebApplication.CreateBuilder(args);

//var configuration = builder.Configuration;

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString = builder.Configuration.GetConnectionString("DBConnection")
    ?? throw new InvalidOperationException("Connection string"
    + "'DBConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));
/*
builder.Services.AddAuthorization(options =>
{
    options.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});
builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
})
    .AddCookie()
    .AddOpenIdConnect(options =>
    {
        var oidcConfig = builder.Configuration.GetSection("OpenIDConnectSettings");

        options.Authority = oidcConfig["Authority"];
        options.ClientId = oidcConfig["ClientId"];
        options.ClientSecret = oidcConfig["ClientSecret"];

        options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.ResponseType = OpenIdConnectResponseType.Code;

        options.SaveTokens = true;
        options.GetClaimsFromUserInfoEndpoint = true;

        options.MapInboundClaims = false;
        options.TokenValidationParameters.NameClaimType = JwtRegisteredClaimNames.Name;
        options.TokenValidationParameters.RoleClaimType = "roles";
             
        options.RequireHttpsMetadata = false;
    });


*/
/*
builder.Services
    .AddAuthorization()
    .AddAuthentication(options => configuration.Bind("Authentication", options))
    .AddCookie()
    .AddOpenIdConnect(options => configuration.Bind("OpenIdConnect", options));
*/
builder.Services.AddControllers();
builder.Services.AddHttpForwarder();
/*
builder.Services.AddCors(
    options => options.AddPolicy(
        AuthenticationController.CorsPolicyName,
        policyBuilder =>
        {
            var allowedOrigins = configuration.GetSection("CorsSettings:AllowedOrigins").Get<string[]>();

            if (allowedOrigins is { Length: > 0 })
                policyBuilder.WithOrigins(allowedOrigins);

            policyBuilder
                .WithMethods(HttpMethods.Get)
                .AllowCredentials();
        }));
*/



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseStaticFiles();
//app.UseCors(AuthenticationController.CorsPolicyName);
//app.UseAuthentication();
//app.UseAuthorization();
/*
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

const string key = "OpenIdConnect:Resource";
var destinationPrefix = configuration.GetValue<string>(key)
                        ?? throw new InvalidOperationException($"The value {key} must be set");

app.MapForwarder(
    "/bff/{**catch-all}",
    destinationPrefix,
    builderContext =>
    {
        // Cut the "/bff" prefix from the request path
        builderContext.AddPathRemovePrefix("/bff");
        builderContext.AddRequestTransform(async transformContext =>
        {
            // Get the access token received earlier during the authentication process
            var accessToken = await transformContext.HttpContext.GetTokenAsync(OpenIdConnectParameterNames.AccessToken);

            // Append a header with access token to the proxy request
            transformContext.ProxyRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        });
    }).RequireAuthorization();
*/
app.MapFallbackToFile("/index.html");
app.Run();


