using AuFeedback.WebApi.BackendData;
using System.Web.Http;
using Unity;
using Unity.WebApi;

namespace AuFeedback.WebApi
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
			var container = new UnityContainer();
            
            container.RegisterType<IRepository, Repository>();
            GlobalConfiguration.Configuration.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}