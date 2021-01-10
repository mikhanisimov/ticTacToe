using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using PWA2.Models;

namespace PWA2.Services
{
    public class HubService:Hub
    {
        public async Task Send(string message)
        {
            await this.Clients.All.SendAsync("Send", message);
        }        

        public void Register(string tableName, string playerName)
        {
            Player player = new Player();
            player.Name = playerName;
            player.ConnectionId = Context.ConnectionId;
            player.TableName = tableName;
            player.Registered = DateTime.Now;
            PlayerService.Players.Add(player);
        }

        public async Task CellClick(string tableName, string playerName, int i, int j, string symbol)
        {
            string connectionId = "";
            if(PlayerService.Players.Count(x=>x.TableName == tableName) == 2)
            {
                string ConcurentName = PlayerService.Players.First(x => x.Name != playerName).Name;
                connectionId = PlayerService.Players.First(x => x.Name != playerName).ConnectionId;
                await this.Clients.Client(connectionId).SendAsync("CellClick", ConcurentName, i, j);
            }            
        }
        
    }
}
