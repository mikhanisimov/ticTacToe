using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PWA2.Models;
using PWA2.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PWA2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : ControllerBase
    {
        [HttpGet("players/{tableName}")]
        public List<Player> getPlayers(string tableName)
        {
            return PlayerService.Players.Where(x => x.TableName == tableName).ToList();
        }

        [HttpGet("freetables")]
        public List<string> getFreeTables()
        {
            List<string> ret = new List<string>();
            foreach (var p in PlayerService.Players)
            {
                if (PlayerService.Players.Count(x=>x.TableName == p.TableName) == 1)
                {
                    ret.Add(p.TableName);
                }
            }

            if (ret.Count() < 4)
            {
                List<int> tableNumbers = PlayerService.Players.Select(x => int.Parse(x.TableName.Replace(PlayerService.TableName, ""))).ToList();
                int maxNumber = tableNumbers.Count() > 0? tableNumbers.Max():1;
                for (int i = maxNumber; i <= (4 + maxNumber) - ret.Count(); i++)
                {
                    ret.Add(PlayerService.TableName+i.ToString());
                }
            }           
            return ret;
        }
    }
}
