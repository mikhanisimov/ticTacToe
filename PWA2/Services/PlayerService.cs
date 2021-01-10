using PWA2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWA2.Services
{
    public static class PlayerService
    {
        private static List<Player> _players;
        public static List<Player> Players { 
            get {
                if (_players == null)
                {
                    _players = new List<Player>();
                }
                return _players;
            } 
            set {
                _players = value;
            } }

    }
}
