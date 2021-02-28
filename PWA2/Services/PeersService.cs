using Microsoft.AspNetCore.DataProtection.XmlEncryption;
using Microsoft.AspNetCore.SignalR;
using PWA2.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PWA2.Services
{
    public class PeersService:Hub
    {
        /// <summary>
        /// register Offer 
        /// </summary>
        /// <param name="sdpOffer"></param>
        /// <returns></returns>
        public async Task RegisterOffer(SdpOffer sdpOffer)
        {
            sdpOffer.ConnectionId = Context.ConnectionId;
            sdpOffer.Created = DateTime.Now;
            ConnectionManager.Offers.Add(sdpOffer);
        }

        /// <summary>
        /// send answer to designated peer
        /// </summary>
        /// <param name="sdpOffer"></param>
        /// <param name="PeerName"></param>
        /// <returns></returns>
        public async Task SendAnswer(Models.SdpOffer sdpOffer, string ConnectionId)
        {
            await this.Clients.Client(ConnectionId).SendAsync("ReceiveAnswer", sdpOffer);
        }
    }
}
