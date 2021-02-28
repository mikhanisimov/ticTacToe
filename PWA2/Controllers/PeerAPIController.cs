using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PWA2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWA2.Controllers
{
    [ApiController]
    public class PeerAPIController : ControllerBase
    {

        [HttpPost("api/offer/register")]
        public SdpOffer RegisterPeer(SdpOffer iceDescription)
        {
            ConnectionManager.Offers.Add(iceDescription);
            return iceDescription;
        }

        [HttpGet("api/offers/{name}")]
        public List<SdpOffer> PeerList(string name)
        {            
            return ConnectionManager.Offers.Where(x=>x.PeerName != name).ToList();
        }


    }
}
