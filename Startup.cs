﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
//using CoExp_Web.Models.Email;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;


namespace CoExp_Web
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }


        public IConfiguration Configuration { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddMvc();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            //ATN_5843218Gt
            //coexp_test
            //coexp

            //if (env.IsProduction())
            //{
                app.UsePathBase("/coexp");
                app.UseHttpsRedirection();
            //} 
            /*else if (env.IsDevelopment())
            {
                app.UsePathBase("/coexp_test");
                app.UseHttpsRedirection();
            }
            else if (env.IsEnvironment("Docker"))
            {
                app.UsePathBase("/docker/");
            }
            else if (env.IsEnvironment("Private"))
            {
                app.UsePathBase("/ATN_5843218Gt/");
                app.UseHttpsRedirection();
                
            }*/

            app.UseExceptionHandler("/Home/Error");
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Run}/{action=Index}/{id?}");
            });


        }
    }
}
