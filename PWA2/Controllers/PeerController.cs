﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWA2.Controllers
{
    public class PeerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
