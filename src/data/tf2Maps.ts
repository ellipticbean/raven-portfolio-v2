export type TF2Map = {
  name: string;
  mode: string;
  code: string;
  seasonal: "None" | "Halloween" | "Smissmas";
  beta?: boolean;
  image?: string;
};

export const maps: TF2Map[] = [
// CAPTURE THE FLAG

{
  name: "2Fort",
  mode: "Capture the Flag",
  code: "ctf_2fort",
  seasonal: "None",
  image: "https://images.gamebanana.com/img/ss/mods/69115529b3702.jpg",
},
{
  name: "2Fort Invasion",
  mode: "Capture the Flag",
  code: "ctf_2fort_invasion",
  seasonal: "None",
  image: "https://images.steamusercontent.com/ugc/1012689315292768401/F1374A9101ED5D0ABF3841162DEE8ED0A54F5C06/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
},
{
  name: "Applejack",
  mode: "Capture the Flag",
  code: "ctf_applejack",
  seasonal: "None",
  image: "https://wiki.teamfortress.com/w/images/thumb/0/0b/Ctf_applejack.png/300px-Ctf_applejack.png",
},
{
  name: "Double Cross",
  mode: "Capture the Flag",
  code: "ctf_doublecross",
  seasonal: "None",
  image: "https://wiki.teamfortress.com/w/images/thumb/a/ae/CTF_DoubleCross_RedBase.png/300px-CTF_DoubleCross_RedBase.png",
},
{
  name: "Landfall",
  mode: "Capture the Flag",
  code: "ctf_landfall",
  seasonal: "None",
  image: "https://images.steamusercontent.com/ugc/692773948339230180/6B1E2B166277177E562734B6224705E745A605D9/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true",
},
{
  name: "Pelican Peak",
  mode: "Capture the Flag",
  code: "ctf_pelican_peak",
  seasonal: "None",
  image: "https://wiki.teamfortress.com/w/images/thumb/9/96/Ctf_pelican_peak.png/300px-Ctf_pelican_peak.png",
},
{
  name: "Pressure",
  mode: "Capture the Flag",
  code: "ctf_pressure",
  seasonal: "None",
},
{
  name: "Sawmill",
  mode: "Capture the Flag",
  code: "ctf_sawmill",
  seasonal: "None",
},
{
  name: "Turbine",
  mode: "Capture the Flag",
  code: "ctf_turbine",
  seasonal: "None",
},
{
  name: "Well",
  mode: "Capture the Flag",
  code: "ctf_well",
  seasonal: "None",
},

// HALLOWEEN CAPTURE THE FLAG

{
  name: "Crasher",
  mode: "Capture the Flag",
  code: "ctf_crasher",
  seasonal: "Halloween",
},
{
  name: "Helltrain",
  mode: "Capture the Flag",
  code: "ctf_helltrain_event",
  seasonal: "Halloween",
},
{
  name: "Devilcross",
  mode: "Capture the Flag",
  code: "ctf_doublecross_event",
  seasonal: "Halloween",
},

// SMISSMAS CAPTURE THE FLAG

{
  name: "Doublefrost",
  mode: "Capture the Flag",
  code: "ctf_doublecross_snowy",
  seasonal: "Smissmas",
},
{
  name: "Frosty",
  mode: "Capture the Flag",
  code: "ctf_frosty",
  seasonal: "Smissmas",
},
{
  name: "Snowfall",
  mode: "Capture the Flag",
  code: "ctf_snowfall_final",
  seasonal: "Smissmas",
},
{
  name: "Turbine Center",
  mode: "Capture the Flag",
  code: "ctf_turbine_winter",
  seasonal: "Smissmas",
},
{
  name: "Penguin Peak",
  mode: "Capture the Flag",
  code: "ctf_penguin_peak",
  seasonal: "Smissmas",
},
{
  name: "Sidewinder",
  mode: "Capture the Flag",
  code: "ctf_sidewinder",
  seasonal: "Smissmas",
},
// CONTROL POINTS

{
  name: "5Gorge",
  mode: "Control Points",
  code: "cp_5gorge",
  seasonal: "None",
},
{
  name: "Badlands",
  mode: "Control Points",
  code: "cp_badlands",
  seasonal: "None",
},
{
  name: "Coldfront",
  mode: "Control Points",
  code: "cp_coldfront",
  seasonal: "None",
},
{
  name: "Fastlane",
  mode: "Control Points",
  code: "cp_fastlane",
  seasonal: "None",
},
{
  name: "Foundry",
  mode: "Control Points",
  code: "cp_foundry",
  seasonal: "None",
},
{
  name: "Freight",
  mode: "Control Points",
  code: "cp_freight_final1",
  seasonal: "None",
},
{
  name: "Granary",
  mode: "Control Points",
  code: "cp_granary",
  seasonal: "None",
},
{
  name: "Gullywash",
  mode: "Control Points",
  code: "cp_gullywash_final1",
  seasonal: "None",
},
{
  name: "Metalworks",
  mode: "Control Points",
  code: "cp_metalworks",
  seasonal: "None",
},
{
  name: "Powerhouse",
  mode: "Control Points",
  code: "cp_powerhouse",
  seasonal: "None",
},
{
  name: "Process",
  mode: "Control Points",
  code: "cp_process_final",
  seasonal: "None",
},
{
  name: "Reckoner",
  mode: "Control Points",
  code: "cp_reckoner",
  seasonal: "None",
},
{
  name: "Snakewater",
  mode: "Control Points",
  code: "cp_snakewater_final1",
  seasonal: "None",
},
{
  name: "Sunshine",
  mode: "Control Points",
  code: "cp_sunshine",
  seasonal: "None",
},
{
  name: "Vanguard",
  mode: "Control Points",
  code: "cp_vanguard",
  seasonal: "None",
},
{
  name: "Well",
  mode: "Control Points",
  code: "cp_well",
  seasonal: "None",
},
{
  name: "Yukon",
  mode: "Control Points",
  code: "cp_yukon_final",
  seasonal: "None",
},
{
  name: "Canaveral",
  mode: "Control Points",
  code: "cp_canaveral_5cp",
  seasonal: "None",
},
// DOMINATION

{
  name: "Standin",
  mode: "Domination",
  code: "cp_standin_final",
  seasonal: "None",
},
// HALLOWEEN CONTROL POINTS

{
  name: "Sinshine",
  mode: "Control Points",
  code: "cp_sunshine_event",
  seasonal: "Halloween",
},
{
  name: "Cowerhouse",
  mode: "Control Points",
  code: "cp_cowerhouse",
  seasonal: "Halloween",
},
{
  name: "Freaky Fair",
  mode: "Control Points",
  code: "cp_freaky_fair",
  seasonal: "Halloween",
},
// ATTACK / DEFEND

{
  name: "Altitude",
  mode: "Attack/Defend",
  code: "cp_altitude",
  seasonal: "None",
},
{
  name: "Cargo",
  mode: "Attack/Defend",
  code: "cp_cargo",
  seasonal: "None",
},
{
  name: "Conifer",
  mode: "Attack/Defend",
  code: "cp_conifer",
  seasonal: "None",
},
{
  name: "Dustbowl",
  mode: "Attack/Defend",
  code: "cp_dustbowl",
  seasonal: "None",
  image: "https://wiki.teamfortress.com/w/images/thumb/3/31/TF2_Dustbowl_Map.jpg/300px-TF2_Dustbowl_Map.jpg",
},
{
  name: "Egypt",
  mode: "Attack/Defend",
  code: "cp_egypt_final",
  seasonal: "None",
},
{
  name: "Fulgur",
  mode: "Attack/Defend",
  code: "cp_fulgur",
  seasonal: "None",
},
{
  name: "Gorge",
  mode: "Attack/Defend",
  code: "cp_gorge",
  seasonal: "None",
},
{
  name: "Gravel Pit",
  mode: "Attack/Defend",
  code: "cp_gravelpit",
  seasonal: "None",
},
{
  name: "Haarp",
  mode: "Attack/Defend",
  code: "ctf_haarp",
  seasonal: "None",
},
{
  name: "Hadal",
  mode: "Attack/Defend",
  code: "cp_hadal",
  seasonal: "None",
},
{
  name: "Hardwood",
  mode: "Attack/Defend",
  code: "cp_hardwood_final",
  seasonal: "None",
},
{
  name: "Junction",
  mode: "Attack/Defend",
  code: "cp_junction_final",
  seasonal: "None",
},
{
  name: "Mercenary Park",
  mode: "Attack/Defend",
  code: "cp_mercenarypark",
  seasonal: "None",
},
{
  name: "Mossrock",
  mode: "Attack/Defend",
  code: "cp_mossrock",
  seasonal: "None",
},
{
  name: "Mountain Lab",
  mode: "Attack/Defend",
  code: "cp_mountainlab",
  seasonal: "None",
},
{
  name: "Overgrown",
  mode: "Attack/Defend",
  code: "cp_overgrown",
  seasonal: "None",
},
{
  name: "Premuda",
  mode: "Attack/Defend",
  code: "cp_premuda",
  seasonal: "None",
},
{
  name: "Mojave",
  mode: "Attack/Defend",
  code: "cp_mojave",
  seasonal: "None",
},
{
  name: "Snowplow",
  mode: "Attack/Defend",
  code: "cp_snowplow",
  seasonal: "None",
},
{
  name: "Steel",
  mode: "Attack/Defend",
  code: "cp_steel",
  seasonal: "None",
},
{
  name: "Sulfur",
  mode: "Attack/Defend",
  code: "cp_sulfur",
  seasonal: "None",
},
{
  name: "Brew",
  mode: "Attack/Defend",
  code: "cp_brew",
  seasonal: "None",
},
// HALLOWEEN ATTACK / DEFEND

{
  name: "Darkmarsh",
  mode: "Attack/Defend",
  code: "cp_darkmarsh",
  seasonal: "Halloween",
},
{
  name: "Erebus",
  mode: "Attack/Defend",
  code: "cp_erebus",
  seasonal: "Halloween",
},
{
  name: "Gorge Event",
  mode: "Attack/Defend",
  code: "cp_gorge_event",
  seasonal: "Halloween",
},
{
  name: "Lava Pit",
  mode: "Attack/Defend",
  code: "cp_lavapit_final",
  seasonal: "Halloween",
},
{
  name: "Mann Manor",
  mode: "Attack/Defend",
  code: "cp_manor_event",
  seasonal: "Halloween",
},
{
  name: "Spookeyridge",
  mode: "Attack/Defend",
  code: "cp_spookeyridge",
  seasonal: "Halloween",
},

// SMISSMAS ATTACK / DEFEND

{
  name: "Carrier",
  mode: "Attack/Defend",
  code: "cp_carrier",
  seasonal: "Smissmas",
},
{
  name: "Coal Pit",
  mode: "Attack/Defend",
  code: "cp_gravelpit_snowy",
  seasonal: "Smissmas",
},
{
  name: "Fortezza",
  mode: "Attack/Defend",
  code: "cp_fortezza",
  seasonal: "Smissmas",
},
{
  name: "Frostwatch",
  mode: "Attack/Defend",
  code: "cp_frostwatch",
  seasonal: "Smissmas",
},
// ATTACK / DEFEND + PAYLOAD

{
  name: "Gavle",
  mode: "Attack/Defend + Payload",
  code: "cppl_gavle",
  seasonal: "Smissmas",
},
  // PAYLOAD
  {
  name: "Aquarius",
  mode: "Payload",
  code: "pl_aquarius",
  seasonal: "None",
},
{
  name: "Citadel",
  mode: "Payload",
  code: "pl_citadel",
  seasonal: "None",
},
{
  name: "Gold Rush",
  mode: "Payload",
  code: "pl_goldrush",
  seasonal: "None",
},
{
  name: "Badwater Basin",
  mode: "Payload",
  code: "pl_badwater",
  seasonal: "None",
  image: "https://www.teamfortress.com/heavy/images/03_badwater3.jpg",
},
{
  name: "Hoodoo",
  mode: "Payload",
  code: "pl_hoodoo_final",
  seasonal: "None",
},
{
  name: "Thunder Mountain",
  mode: "Payload",
  code: "pl_thundermountain",
  seasonal: "None",
},
{
  name: "Upward",
  mode: "Payload",
  code: "pl_upward",
  seasonal: "None",
  image: "https://wiki.teamfortress.com/w/images/thumb/9/92/Engineer_Update_Upward.png/300px-Engineer_Update_Upward.png",
},
{
  name: "Barnblitz",
  mode: "Payload",
  code: "pl_barnblitz",
  seasonal: "None",
},
{
  name: "Frontier",
  mode: "Payload",
  code: "pl_frontier_final",
  seasonal: "None",
},
{
  name: "Borneo",
  mode: "Payload",
  code: "pl_borneo",
  seasonal: "None",
},
{
  name: "Snowycoast",
  mode: "Payload",
  code: "pl_snowycoast",
  seasonal: "None",
},
{
  name: "Swiftwater",
  mode: "Payload",
  code: "pl_swiftwater_final1",
  seasonal: "None",
},
{
  name: "Enclosure",
  mode: "Payload",
  code: "pl_enclosure_final",
  seasonal: "None",
},
{
  name: "Pier",
  mode: "Payload",
  code: "pl_pier",
  seasonal: "None",
},
{
  name: "Bread Space",
  mode: "Payload",
  code: "pl_breadspace",
  seasonal: "None",
},
{
  name: "Phoenix",
  mode: "Payload",
  code: "pl_phoenix",
  seasonal: "None",
},
{
  name: "Cashworks",
  mode: "Payload",
  code: "pl_cashworks",
  seasonal: "None",
},
{
  name: "Venice",
  mode: "Payload",
  code: "pl_venice",
  seasonal: "None",
},
{
  name: "Embargo",
  mode: "Payload",
  code: "pl_embargo",
  seasonal: "None",
},
{
  name: "Odyssey",
  mode: "Payload",
  code: "pl_odyssey",
  seasonal: "None",
},
{
  name: "Redwood",
  mode: "Payload",
  code: "pl_redwood",
  seasonal: "None",
},
{
  name: "Camber",
  mode: "Payload",
  code: "pl_camber",
  seasonal: "None",
},
{
  name: "Emerge",
  mode: "Payload",
  code: "pl_emerge",
  seasonal: "None",
},
{
  name: "Cactus Canyon",
  mode: "Payload",
  code: "pl_cactuscanyon",
  seasonal: "None",
  beta: true,
},
// HALLOWEEN PAYLOAD
{
  name: "Hellstone",
  mode: "Payload",
  code: "pl_millstone_event",
  seasonal: "Halloween",
},
{
  name: "Brimstone",
  mode: "Payload",
  code: "pl_fifthcurve_event",
  seasonal: "Halloween",
},
{
  name: "Gravestone",
  mode: "Payload",
  code: "pl_rumble_event",
  seasonal: "Halloween",
},
{
  name: "Precipice",
  mode: "Payload",
  code: "pl_precipice_event_final",
  seasonal: "Halloween",
},
{
  name: "Bloodwater",
  mode: "Payload",
  code: "pl_bloodwater",
  seasonal: "Halloween",
},
{
  name: "Hassle Castle",
  mode: "Payload",
  code: "pl_hasslecastle",
  seasonal: "Halloween",
},
{
  name: "Terror",
  mode: "Payload",
  code: "pl_terror_event",
  seasonal: "Halloween",
},
{
  name: "Corruption",
  mode: "Payload",
  code: "pl_corruption",
  seasonal: "Halloween",
},
{
  name: "Spineyard",
  mode: "Payload",
  code: "pl_spineyard",
  seasonal: "Halloween",
},
{
  name: "Ghoulpit",
  mode: "Payload",
  code: "pl_sludgepit_event",
  seasonal: "Halloween",
},
// PAYLOAD RACE

{
  name: "Banana Bay",
  mode: "Payload Race",
  code: "plr_bananabay",
  seasonal: "None",
},
{
  name: "Hacksaw",
  mode: "Payload Race",
  code: "plr_hacksaw",
  seasonal: "None",
},
{
  name: "Hightower",
  mode: "Payload Race",
  code: "plr_hightower",
  seasonal: "None",
  image: "https://www.teamfortress.com/images/posts/hightower.jpg",
},
{
  name: "Nightfall",
  mode: "Payload Race",
  code: "plr_nightfall_final",
  seasonal: "None",
},
{
  name: "Pipeline",
  mode: "Payload Race",
  code: "plr_pipeline",
  seasonal: "None",
},

// HALLOWEEN PAYLOAD RACE

{
  name: "Bonesaw",
  mode: "Payload Race",
  code: "plr_hacksaw_event",
  seasonal: "Halloween",
},
{
  name: "Helltower",
  mode: "Payload Race",
  code: "plr_hightower_event",
  seasonal: "Halloween",
},

// SMISSMAS PAYLOAD RACE

{
  name: "Cutter",
  mode: "Payload Race",
  code: "plr_cutter",
  seasonal: "Smissmas",
},
{
  name: "Matterhorn",
  mode: "Payload Race",
  code: "plr_matterhorn",
  seasonal: "Smissmas",
},
{
  name: "Chilly",
  mode: "Payload",
  code: "pl_chilly",
  seasonal: "Smissmas",
},
{
  name: "Polar",
  mode: "Payload",
  code: "pl_coal_event",
  seasonal: "Smissmas",
},
{
  name: "Frostcliff",
  mode: "Payload",
  code: "pl_frostcliff",
  seasonal: "Smissmas",
},
{
  name: "Rumford",
  mode: "Payload",
  code: "pl_rumford_event",
  seasonal: "Smissmas",
},
{
  name: "Patagonia",
  mode: "Payload",
  code: "pl_patagonia",
  seasonal: "Smissmas",
},
// HOLD THE FLAG

{
  name: "Marshlands",
  mode: "Hold the Flag",
  code: "htf_marshlands",
  seasonal: "Halloween",
},
// PLAYER DESTRUCTION

{
  name: "Atom Smash",
  mode: "Player Destruction",
  code: "pd_atom_smash",
  seasonal: "None",
},
{
  name: "Selbyen",
  mode: "Player Destruction",
  code: "pd_selbyen",
  seasonal: "None",
},
{
  name: "Watergate",
  mode: "Player Destruction",
  code: "pd_watergate",
  seasonal: "None",
},
// ROBOT DESTRUCTION

{
  name: "Asteroid",
  mode: "Robot Destruction",
  code: "rd_asteroid",
  seasonal: "None",
  beta: true,
},
// HALLOWEEN PLAYER DESTRUCTION

{
  name: "Circus",
  mode: "Player Destruction",
  code: "pd_circus",
  seasonal: "Halloween",
},
{
  name: "Cursed Cove",
  mode: "Player Destruction",
  code: "pd_cursed_cove_event",
  seasonal: "Halloween",
},
{
  name: "Farmageddon",
  mode: "Player Destruction",
  code: "pd_farmageddon",
  seasonal: "Halloween",
},
{
  name: "Mannsylvania",
  mode: "Player Destruction",
  code: "pd_mannsylvania",
  seasonal: "Halloween",
},
{
  name: "Monster Bash",
  mode: "Player Destruction",
  code: "pd_monster_bash",
  seasonal: "Halloween",
},
{
  name: "Pit of Death",
  mode: "Player Destruction",
  code: "pd_pit_of_death_event",
  seasonal: "Halloween",
},

// SMISSMAS PLAYER DESTRUCTION

{
  name: "Galleria",
  mode: "Player Destruction",
  code: "pd_galleria",
  seasonal: "Smissmas",
},
{
  name: "Nutcracker",
  mode: "Player Destruction",
  code: "pd_nutcracker",
  seasonal: "Smissmas",
},
{
  name: "SnowVille",
  mode: "Player Destruction",
  code: "pd_snowville_event",
  seasonal: "Smissmas",
},
// PASS TIME

{
  name: "Brickyard",
  mode: "PASS Time",
  code: "pass_brickyard",
  seasonal: "None",
},
{
  name: "District",
  mode: "PASS Time",
  code: "pass_district",
  seasonal: "None",
},
{
  name: "Timbertown",
  mode: "PASS Time",
  code: "pass_timbertown",
  seasonal: "None",
},
// SPECIAL DELIVERY

{
  name: "Doomsday",
  mode: "Special Delivery",
  code: "sd_doomsday",
  seasonal: "None",
},

// HALLOWEEN SPECIAL DELIVERY

{
  name: "Carnival of Carnage",
  mode: "Special Delivery",
  code: "sd_doomsday_event",
  seasonal: "Halloween",
},
// TERRITORIAL CONTROL

{
  name: "Hydro",
  mode: "Territorial Control",
  code: "tc_hydro",
  seasonal: "None",
},
// MANN VS. MACHINE

{
  name: "Bigrock",
  mode: "Mann vs. Machine",
  code: "mvm_bigrock",
  seasonal: "None",
},
{
  name: "Coal Town",
  mode: "Mann vs. Machine",
  code: "mvm_coaltown",
  seasonal: "None",
},
{
  name: "Decoy",
  mode: "Mann vs. Machine",
  code: "mvm_decoy",
  seasonal: "None",
},
{
  name: "Mannhattan",
  mode: "Mann vs. Machine",
  code: "mvm_mannhattan",
  seasonal: "None",
},
{
  name: "Mannworks",
  mode: "Mann vs. Machine",
  code: "mvm_mannworks",
  seasonal: "None",
},
{
  name: "Rottenburg",
  mode: "Mann vs. Machine",
  code: "mvm_rottenburg",
  seasonal: "None",
},

// HALLOWEEN MANN VS. MACHINE

{
  name: "Ghost Town",
  mode: "Mann vs. Machine",
  code: "mvm_ghost_town",
  seasonal: "Halloween",
},
// MANNPOWER

{
  name: "Foundry",
  mode: "Mannpower",
  code: "ctf_foundry",
  seasonal: "None",
},
{
  name: "Gorge",
  mode: "Mannpower",
  code: "ctf_gorge",
  seasonal: "None",
},
{
  name: "Hellfire",
  mode: "Mannpower",
  code: "ctf_hellfire",
  seasonal: "None",
},
{
  name: "Thunder Mountain",
  mode: "Mannpower",
  code: "ctf_thundermountain",
  seasonal: "None",
},
// ARENA

{
  name: "Badlands",
  mode: "Arena",
  code: "arena_badlands",
  seasonal: "None",
},
{
  name: "Byre",
  mode: "Arena",
  code: "arena_byre",
  seasonal: "None",
},
{
  name: "Granary",
  mode: "Arena",
  code: "arena_granary",
  seasonal: "None",
},
{
  name: "Lumberyard",
  mode: "Arena",
  code: "arena_lumberyard",
  seasonal: "None",
},
{
  name: "Nucleus",
  mode: "Arena",
  code: "arena_nucleus",
  seasonal: "None",
},
{
  name: "Offblast",
  mode: "Arena",
  code: "arena_offblast_final",
  seasonal: "None",
},
{
  name: "Ravine",
  mode: "Arena",
  code: "arena_ravine",
  seasonal: "None",
},
{
  name: "Sawmill",
  mode: "Arena",
  code: "arena_sawmill",
  seasonal: "None",
},
{
  name: "Watchtower",
  mode: "Arena",
  code: "arena_watchtower",
  seasonal: "None",
},
{
  name: "Well",
  mode: "Arena",
  code: "arena_well",
  seasonal: "None",
},

// HALLOWEEN ARENA

{
  name: "Graveyard",
  mode: "Arena",
  code: "arena_lumberyard_event",
  seasonal: "Halloween",
},
{
  name: "Perks",
  mode: "Arena",
  code: "arena_perks",
  seasonal: "Halloween",
},
{
  name: "Afterlife",
  mode: "Arena",
  code: "arena_afterlife",
  seasonal: "Halloween",
},
// VERSUS SAXTON HALE

{
  name: "Distillery",
  mode: "Versus Saxton Hale",
  code: "vsh_distillery",
  seasonal: "None",
},
{
  name: "Nucleus VSH",
  mode: "Versus Saxton Hale",
  code: "vsh_nucleus",
  seasonal: "None",
},
{
  name: "Outburst",
  mode: "Versus Saxton Hale",
  code: "vsh_outburst",
  seasonal: "None",
},
{
  name: "Skirmish",
  mode: "Versus Saxton Hale",
  code: "vsh_skirmish",
  seasonal: "None",
},
{
  name: "Tiny Rock",
  mode: "Versus Saxton Hale",
  code: "vsh_tinyrock",
  seasonal: "None",
},

// SMISSMAS VERSUS SAXTON HALE

{
  name: "Maul",
  mode: "Versus Saxton Hale",
  code: "vsh_maul",
  seasonal: "Smissmas",
},
// ZOMBIE INFECTION

{
  name: "Atoll",
  mode: "Zombie Infection",
  code: "zi_atoll",
  seasonal: "Halloween",
},
{
  name: "Blazehattan",
  mode: "Zombie Infection",
  code: "zi_blazehattan",
  seasonal: "Halloween",
},
{
  name: "Devastation",
  mode: "Zombie Infection",
  code: "zi_devastation_final1",
  seasonal: "Halloween",
},
{
  name: "Murky",
  mode: "Zombie Infection",
  code: "zi_murky",
  seasonal: "Halloween",
},
{
  name: "Sanitarium",
  mode: "Zombie Infection",
  code: "zi_sanitarium",
  seasonal: "Halloween",
},
{
  name: "Woods",
  mode: "Zombie Infection",
  code: "zi_woods",
  seasonal: "Halloween",
},
// TUG OF WAR

{
  name: "Dynamite",
  mode: "Tug of War",
  code: "tow_dynamite",
  seasonal: "None",
},
// KING OF THE HILL
{
  name: "Badlands",
  mode: "King of the Hill",
  code: "koth_badlands",
  seasonal: "None",
},
{
  name: "Brazil",
  mode: "King of the Hill",
  code: "koth_brazil",
  seasonal: "None",
},
{
  name: "Cachoeira",
  mode: "King of the Hill",
  code: "koth_cachoeira",
  seasonal: "None",
},
{
  name: "Harvest",
  mode: "King of the Hill",
  code: "koth_harvest_final",
  seasonal: "None",
},
{
  name: "Highpass",
  mode: "King of the Hill",
  code: "koth_highpass",
  seasonal: "None",
},
{
  name: "Kong King",
  mode: "King of the Hill",
  code: "koth_king",
  seasonal: "None",
},
{
  name: "Lakeside",
  mode: "King of the Hill",
  code: "koth_lakeside_final",
  seasonal: "None",
},
{
  name: "Lazarus",
  mode: "King of the Hill",
  code: "koth_lazarus",
  seasonal: "None",
},
{
  name: "Megaton",
  mode: "King of the Hill",
  code: "koth_megaton",
  seasonal: "None",
},
{
  name: "Nucleus",
  mode: "King of the Hill",
  code: "koth_nucleus",
  seasonal: "None",
},
{
  name: "Probed",
  mode: "King of the Hill",
  code: "koth_probed",
  seasonal: "None",
},
{
  name: "Rotunda",
  mode: "King of the Hill",
  code: "koth_rotunda",
  seasonal: "None",
},
{
  name: "Sawmill",
  mode: "King of the Hill",
  code: "koth_sawmill",
  seasonal: "None",
},
{
  name: "Sharkbay",
  mode: "King of the Hill",
  code: "koth_sharkbay",
  seasonal: "None",
},
{
  name: "Suijin",
  mode: "King of the Hill",
  code: "koth_suijin",
  seasonal: "None",
},
{
  name: "Viaduct",
  mode: "King of the Hill",
  code: "koth_viaduct",
  seasonal: "None",
},

// SUMMER 2025 KOTH
{
  name: "Boardwalk",
  mode: "King of the Hill",
  code: "koth_boardwalk",
  seasonal: "None",
},
{
  name: "Blowout",
  mode: "King of the Hill",
  code: "koth_blowout",
  seasonal: "None",
},
{
  name: "Mannhole",
  mode: "King of the Hill",
  code: "koth_mannhole",
  seasonal: "None",
},
{
  name: "Demolition",
  mode: "King of the Hill",
  code: "koth_demolition",
  seasonal: "None",
},

// SUMMER 2026 KOTH
{
  name: "Dryfield",
  mode: "King of the Hill",
  code: "koth_dryfield",
  seasonal: "None",
},
{
  name: "Camp Saxton",
  mode: "King of the Hill",
  code: "koth_camp_saxton",
  seasonal: "None",
},
{
  name: "Shorelight",
  mode: "King of the Hill",
  code: "koth_shorelight",
  seasonal: "None",
},

// HALLOWEEN KOTH
{
  name: "Cauldron",
  mode: "King of the Hill",
  code: "koth_bagel_event",
  seasonal: "Halloween",
},
{
  name: "Eyeaduct",
  mode: "King of the Hill",
  code: "koth_viaduct_event",
  seasonal: "Halloween",
},
{
  name: "Ghost Fort",
  mode: "King of the Hill",
  code: "koth_lakeside_event",
  seasonal: "Halloween",
},
{
  name: "Harvest Event",
  mode: "King of the Hill",
  code: "koth_harvest_event",
  seasonal: "Halloween",
},
{
  name: "Laughter",
  mode: "King of the Hill",
  code: "koth_slaughter_event",
  seasonal: "Halloween",
},
{
  name: "Los Muertos",
  mode: "King of the Hill",
  code: "koth_los_muertos",
  seasonal: "Halloween",
},
{
  name: "Maple Ridge Event",
  mode: "King of the Hill",
  code: "koth_maple_ridge_event",
  seasonal: "Halloween",
},
{
  name: "Megalo",
  mode: "King of the Hill",
  code: "koth_megalo",
  seasonal: "Halloween",
},
{
  name: "Moldergrove",
  mode: "King of the Hill",
  code: "koth_undergrove_event",
  seasonal: "Halloween",
},
{
  name: "Moonshine Event",
  mode: "King of the Hill",
  code: "koth_moonshine_event",
  seasonal: "Halloween",
},
{
  name: "Sinthetic",
  mode: "King of the Hill",
  code: "koth_synthetic_event",
  seasonal: "Halloween",
},
{
  name: "Slasher",
  mode: "King of the Hill",
  code: "koth_slasher",
  seasonal: "Halloween",
},
{
  name: "Slime",
  mode: "King of the Hill",
  code: "koth_slime",
  seasonal: "Halloween",
},
{
  name: "Soul-Mill",
  mode: "King of the Hill",
  code: "koth_sawmill_event",
  seasonal: "Halloween",
},
{
  name: "Toxic",
  mode: "King of the Hill",
  code: "koth_toxic",
  seasonal: "Halloween",
},
{
  name: "Dusker",
  mode: "King of the Hill",
  code: "koth_dusker",
  seasonal: "Halloween",
},

// SMISSMAS KOTH
{
  name: "Cascade",
  mode: "King of the Hill",
  code: "koth_cascade",
  seasonal: "Smissmas",
},
{
  name: "Abbey",
  mode: "King of the Hill",
  code: "2koth_abbey",
  seasonal: "Smissmas",
},
{
  name: "Winter Ridge",
  mode: "King of the Hill",
  code: "koth_winter_ridge",
  seasonal: "Smissmas",
},
{
  name: "Krampus",
  mode: "King of the Hill",
  code: "koth_krampus",
  seasonal: "Smissmas",
},
{
  name: "Snowtower",
  mode: "King of the Hill",
  code: "koth_snowtower",
  seasonal: "Smissmas",
},
{
  name: "Overcast",
  mode: "King of the Hill",
  code: "koth_overcast_final",
  seasonal: "Smissmas",
},

// SMISSMAS PAYLOAD
{
  name: "Wutville",
  mode: "Payload",
  code: "pl_wutville_event",
  seasonal: "Smissmas",
},
// MEDIEVAL MODE

{
  name: "Burghausen",
  mode: "Medieval Mode",
  code: "cp_burghausen",
  seasonal: "None",
},
{
  name: "DeGroot Keep",
  mode: "Medieval Mode",
  code: "cp_degrootkeep",
  seasonal: "None",
},

// HALLOWEEN MEDIEVAL MODE

{
  name: "Sandcastle",
  mode: "Medieval Mode",
  code: "cp_degrootkeep_rats",
  seasonal: "Halloween",
},
// TRAINING MODE

{
  name: "Target",
  mode: "Training Mode",
  code: "tr_target",
  seasonal: "None",
},
{
  name: "Dustbowl (Training)",
  mode: "Training Mode",
  code: "tr_dustbowl",
  seasonal: "None",
},
];