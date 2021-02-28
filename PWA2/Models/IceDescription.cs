using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWA2.Models
{
    public class SdpOffer
    {
        public string IceDescription { get; set; }
        public string PeerName { get; set; }
        public string ConnectionId { get; set; }
        public DateTime Created { get; set; }
        public DateTime Connected { get; set; }
    }
}
