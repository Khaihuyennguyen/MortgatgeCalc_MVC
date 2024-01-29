using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MortgatgeCalc_MVC.Models;

namespace MortgatgeCalc_MVC.Controllers
{
	public class HomeController : Controller
	{
		private readonly ILogger<HomeController> _logger;

		public HomeController(ILogger<HomeController> logger)
		{
			_logger = logger;
		}
		[HttpGet]
		public IActionResult MortgagePage()
		{

			return View();
		}
		[HttpPost]
		[ValidateAntiForgeryToken]
        public IActionResult MortgagePage(Loan loan)
        {

            return View();
        }
        public IActionResult Index()
		{
			return View();
		}

		public IActionResult Privacy()
		{
			return View();
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error()
		{
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}
	}
}
