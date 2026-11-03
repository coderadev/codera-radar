# codera-radar
<img width="1916" height="1079" alt="image" src="https://github.com/user-attachments/assets/bbc645ac-6eb2-4b41-a298-7191718fcbe7" />


Police radar for FiveM (QBCore / QBX / ESX). 

## Install

1. Put the `codera-radar` folder in your `resources` folder.
2. Add `ensure codera-radar` to `server.cfg`.
3. Requires `oxmysql` (for plate lookups) and `qb-core`, `qbx_core` or `es_extended`.
4. Set your framework in `build/sh_config.js`:

```js
Config.Framework = 'QBCore';   // or 'QBX' or 'ESX'
Config.CoreFolder = 'qb-core'; // 'qbx_core' for QBX, 'es_extended' for ESX
```

For QBX use:

```js
Config.Framework = 'QBX';
Config.CoreFolder = 'qbx_core';
```

The Lua scripts detect the framework automatically (`qbx_core` first, then `qb-core`, then `es_extended`).

## Allowed jobs

Edit the `AllowedJobs` table at the top of `build/cl_main.lua`.

## Adding a vehicle to the radar

The radar only works in vehicles listed in `Config.WhitelistedVehicles`
(`build/sh_config.js`). The list holds **model hashes**, not spawn names, so
convert the spawn name to a hash first.

### 1. Get the hash from the spawn name

Use the spawn name in lowercase (for example `police`, `sheriff2`, `fbi2`).

**Option A: Node.js** (save as `hash.js`, run `node hash.js police2`):

```js
function joaat(str) {
  let h = 0;
  for (const c of Buffer.from(str.toLowerCase())) {
    h = (h + c) >>> 0; h = (h + (h << 10)) >>> 0; h = (h ^ (h >>> 6)) >>> 0;
  }
  h = (h + (h << 3)) >>> 0; h = (h ^ (h >>> 11)) >>> 0; h = (h + (h << 15)) >>> 0;
  return h | 0; // signed 32-bit, the format the config uses
}
console.log(joaat(process.argv[2]));
```

**Option B: in game** (F8 console cannot run Lua, so use any Lua script/resource):

```lua
print(GetHashKey('police2'))
```

If the number is bigger than `2147483647`, subtract `4294967296` to get the signed value.
You can also use any online "joaat" hash calculator and convert the result the same way.

Quick check: `police` = `2046537925`, `sheriff` = `-1683328900`.

### 2. Add it to the config

Open `build/sh_config.js` and add the number to the list. A short name comment is optional:

```js
Config.WhitelistedVehicles = [
  2046537925 /*police*/,
  -1683328900 /*sheriff*/,
  -1205689942 /*riot*/,
  1234567890 /*mycar*/   // <- your new vehicle
];
```

