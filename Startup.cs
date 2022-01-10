using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using Microsoft.OpenApi.Models;
using Models;

namespace WEBProjekat
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

            services.AddDbContext<Context>(options =>

            {
                options.UseSqlServer(Configuration.GetConnectionString("BibliotekaCS"));
            });
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WEBProjekat", Version = "v1" });
            });

               services.AddCors(options =>
            {
                options.AddPolicy("Cors1", builder => { builder.WithOrigins( new string[]
                {  
                    "http://localhost:8080",
                    "https://localohost:8080",
                    "http://127.0.0.1:8080",
                    "https://127.0.0.1:8080",
                    "http://127.0.0.1:5500",
                    "https://127.0.0.1:5500",
                    "http://localhost:5500",
                    "https://localohost:5500",
                    
                }).AllowAnyHeader().AllowAnyMethod();}
            );
        });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WEBProjekat v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("Cors1");
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
