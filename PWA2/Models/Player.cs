using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWA2.Models
{
    public class Player
    {
        public string TableName { get; set; }
        public string Name { get; set; }
        public string ConnectionId { get; set; }
        public DateTime Registered { get; set; }
    }
}
