require('dotenv').config()
//allows us to import Client 
const { Client } = require('discord.js');
const cheerio = require('cheerio')
const axios = require('axios');

// instance of client class (used for API)
const client = new Client();


const mythic_dps = "https://www.icy-veins.com/wow/mythic-dps-tier-list";

const raid_dps = "https://www.icy-veins.com/wow/dps-rankings-tier-list";

const mythic_heal = "https://www.icy-veins.com/wow/mythic-healer-tier-list";

const mythic_tank = "https://www.icy-veins.com/wow/mythic-tank-tier-list";

const raid_tank = "https://www.icy-veins.com/wow/tank-rankings-tier-list";

const raid_heal = "https://www.icy-veins.com/wow/healer-rankings-tier-list";


// message when bot logs in
client.on('ready', () => {
  console.log(`${client.user.username} has logged in.`);
})

let temp_url;
let return_message;

let valid_commands = ["mythic_dps", "raid_dps", "mythic_heal", "mythic_tank", "raid_tank", "raid_heal"];

// RETURNS TEIR LISTS FOR DPS/HEAL/TANK FOR M+/RAIDS

client.on('message', (message) => {
  let temp_message = message.content;
  if(valid_commands.includes(temp_message)){

    if(temp_message == "mythic_dps"){
      temp_url = mythic_dps;
      return_message = "Mythic DPS Teir List";

    } else if(temp_message == "raid_dps"){
      temp_url = raid_dps;
      return_message = "Raid DPS Teir List";

    } else if(temp_message == "mythic_heal"){
      temp_url = mythic_heal;
      return_message = "Mythic Heal Teir List";

    } else if(temp_message == "mythic_tank"){
      temp_url = mythic_tank;
      return_message = "Mythic Tank Teir List";

    } else if(temp_message == "raid_tank"){
      temp_url = raid_tank;
      return_message = "Raid Tank Teir List";

    } else if(temp_message == "raid_heal"){
      temp_url = raid_heal;
      return_message = "Raid Heal Teir List";

    }

  // if message is mythic+ return mythic teir list
    message.channel.send(return_message);

    axios.get(temp_url).then(urlResponse => {
      const $ = cheerio.load(urlResponse.data);

      $("ol").each((i, element) => {
        const link = $(element)
        .text();

        console.log(link);
        message.channel.send(link);
      });
    });
  }


});


client.login(process.env.DISCORD_BOT_TOKEN);
 