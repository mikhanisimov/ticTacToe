using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PWA2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace PWA2.Controllers
{
    [ApiController]
    public class PeerAPIController : ControllerBase
    {

        //[HttpGet("api/offers/{name}")]
        //public List<SdpOffer> PeerList(string name)
        //{            
        //    return ConnectionManager.Offers.Where(x=>x.PeerName != name).ToList();
        //}

        [HttpGet("api/offers/free")]
        public SdpOffer GetFirstFree()
        {
            if(ConnectionManager.Offers.Count(x=>x.Connected == null || x.Connected == DateTime.MinValue) > 0)
            {
                return ConnectionManager.Offers.First(x => x.Connected == null || x.Connected == DateTime.MinValue);
            }
            else
            {
                return null;
            }
        }
    }
}
