var Config = {};

Config.Framework = 'QBCore'; // or 'QBX' or 'ESX'
Config.CoreFolder = 'qb-core'; // 'qbx_core' for QBX, 'es_extended' for ESX

// Allowed vehicle model hashes (signed ints). See README.md for how to add one.
Config.WhitelistedVehicles = [-1343069695, 813942688, 1873853430, -1521313008, 1879841865, -1603943060, -125348122, -645245207, 273235516, 445719495, 1876239508, -1967705142, 1193693314, -1021881379, -118243447, 1142825674, 1958049656, -1596507207, 1330452010, -567115340,
  // Default GTA/FiveM police vehicles
  2046537925 /*police*/, -1627000575 /*police2*/, 1912215274 /*police3*/, -1973172295 /*police4*/, -34623805 /*policeb*/, 456714581 /*policet*/, -1683328900 /*sheriff*/, 1922257928 /*sheriff2*/, 1127131465 /*fbi*/, -1647941228 /*fbi2*/, -1205689942 /*riot*/, 741586030 /*pranger*/, -1233767450 /*polgauntlet*/
];

let CODERA;

if (Config.Framework === 'QBX') {
    CODERA = null;
} else if (Config.Framework === 'QBCore') {
    CODERA = exports[Config.CoreFolder].GetCoreObject();
} else {
    CODERA = exports[Config.CoreFolder].getSharedObject();
}

function Notify(msg, typ) {
    if (Config.Framework === 'QBX') {
        exports.qbx_core.Notify(msg, typ);
    } else if (Config.Framework === 'QBCore') {
        CODERA.Functions.Notify(msg, typ);
    } else {
        CODERA.ShowHelpNotification(msg);
    }
}

