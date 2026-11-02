fx_version "cerulean"
games { "gta5" }
lua54 "yes"
author 'Codera'
description "Codera Developments - Radar System V"
version "1.0.0"

ui_page 'web/index.html'

files {
    "web/*",
}

client_scripts { 
    "build/cl_*.js",
    "build/sh_config.js", 
    "build/cl_main.lua",
    "baseevents/vehiclechecker.lua"
}

server_scripts { 
    "build/sv_*.js",
    "build/sv_main.lua",
    "baseevents/server.lua" 
}

escrow_ignore {
    "build/sh_config.js"
}

dependency '/assetpacks'