using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using PWA2.Models;

namespace PWA2.Services
{
    public class HubService: Hub
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
            //this.Clients.Client(player.ConnectionId).SendAsync("CellClick", "ConcurentName", 1, 1).Wait();
        }
        public async Task CellClick(string tableName, string playerName, int i, int j, string symbol)
        {
            string connectionId = "";
            if(PlayerService.Players.Count(x=>x.TableName == tableName) == 2)
            {
                //string ConcurentName = PlayerService.Players.First(x => x.Name != playerName && x.TableName == tableName).Name;
                connectionId = PlayerService.Players.First(x => x.Name != playerName && x.TableName == tableName).ConnectionId;
                await this.Clients.Client(connectionId).SendAsync("CellClick", playerName, i, j);
            }            
        }
        public async Task Restart(string tableName, string playerName)
        {
            string connectionId = "";
            if (PlayerService.Players.Count(x => x.TableName == tableName) == 2)
            {
                //string ConcurentName = PlayerService.Players.First(x => x.Name != playerName && x.TableName == tableName).Name;
                connectionId = PlayerService.Players.First(x => x.Name != playerName && x.TableName == tableName).ConnectionId;
                await this.Clients.Client(connectionId).SendAsync("Restart");
            }
        }
        public async Task RightArrow(string tableName, string playerName)
        {
            string connectionId = "";
            if (PlayerService.Players.Count(x => x.TableName == tableName) == 2)
            {
                //string ConcurentName = PlayerService.Players.First(x => x.Name != playerName && x.TableName == tableName).Name;
                connectionId = PlayerService.Players.First(x => x.Name != playerName && x.TableName == tableName).ConnectionId;
                await this.Clients.Client(connectionId).SendAsync("RightArrow");
            }
        }
        public async Task LeftArrow(string tableName, string playerName)
        {
            string connectionId = "";
            if (PlayerService.Players.Count(x => x.TableName == tableName) == 2)
            {
                //string ConcurentName = PlayerService.Players.First(x => x.Name != playerName && x.TableName == tableName).Name;
                connectionId = PlayerService.Players.First(x => x.Name != playerName && x.TableName == tableName).ConnectionId;
                await this.Clients.Client(connectionId).SendAsync("LeftArrow");
            }
        }
        public async Task ping(string tableName, string playerName)
        {
            try
            {
                string connectionId = "";
                if (PlayerService.Players.Count(x => x.TableName == tableName) == 2)
                {
                    //string ConcurentName = PlayerService.Players.First(x => x.Name != playerName && x.TableName == tableName).Name;
                    connectionId = PlayerService.Players.First(x => x.Name != playerName && x.TableName == tableName).ConnectionId;
                    await this.Clients.Client(connectionId).SendAsync("ping", playerName);
                }
            }
            catch (Exception)
            {
                string connectionId = "";
                if (PlayerService.Players.Count(x => x.TableName == tableName) == 2)
                {
                    //string ConcurentName = PlayerService.Players.First(x => x.Name != playerName && x.TableName == tableName).Name;
                    connectionId = PlayerService.Players.First(x => x.Name != playerName && x.TableName == tableName).ConnectionId;
                    await this.Clients.Client(connectionId).SendAsync("ping", playerName);
                }
            }
            
        }
        public async Task pong(string tableName, string playerName)
        {
            string connectionId = "";
            if (PlayerService.Players.Count(x => x.TableName == tableName) == 2)
            {
                //string ConcurentName = PlayerService.Players.First(x => x.Name != playerName && x.TableName == tableName).Name;
                connectionId = PlayerService.Players.First(x => x.Name != playerName && x.TableName == tableName).ConnectionId;
                await this.Clients.Client(connectionId).SendAsync("pong", playerName);
            }
        }
    }
}
