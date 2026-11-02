
local Framework, Core

local function detectFramework()
    if GetResourceState('qbx_core') == 'started' then
        return 'QBX', nil
    elseif GetResourceState('qb-core') == 'started' then
        return 'QBCore', exports['qb-core']:GetCoreObject()
    elseif GetResourceState('es_extended') == 'started' then
        return 'ESX', exports['es_extended']:getSharedObject()
    end
end

CreateThread(function()
    while not Framework do
        Framework, Core = detectFramework()
        if not Framework then Wait(1000) end
    end
end)

local function notify(src, msg, typ)
    if Framework == 'QBX' then
        exports.qbx_core:Notify(src, msg, typ or 'inform', 7000)
    elseif Framework == 'QBCore' then
        TriggerClientEvent('QBCore:Notify', src, msg, typ or 'primary', 7000)
    else
        TriggerClientEvent('esx:showNotification', src, msg)
    end
end

local function query(sql, params)
    local p = promise.new()
    exports.oxmysql:single(sql, params, function(result) p:resolve(result) end)
    return Citizen.Await(p)
end

local function lookupOwner(plate)
    if Framework == 'QBCore' or Framework == 'QBX' then
        local row = query([[
            SELECT p.charinfo, v.vehicle FROM player_vehicles v
            LEFT JOIN players p ON p.citizenid = v.citizenid
            WHERE TRIM(v.plate) = ? LIMIT 1
        ]], { plate })
        if not row then return nil end
        local info = row.charinfo and json.decode(row.charinfo) or {}
        local name = ((info.firstname or '') .. ' ' .. (info.lastname or '')):gsub('^%s+', '')
        return { owner = name ~= '' and name or 'Unknown', model = row.vehicle }
    else
        local row = query([[
            SELECT u.firstname, u.lastname, v.vehicle FROM owned_vehicles v
            LEFT JOIN users u ON u.identifier = v.owner
            WHERE TRIM(v.plate) = ? LIMIT 1
        ]], { plate })
        if not row then return nil end
        local name = ((row.firstname or '') .. ' ' .. (row.lastname or '')):gsub('^%s+', '')
        return { owner = name ~= '' and name or 'Unknown', model = row.vehicle }
    end
end

local lastCheck = {}

RegisterNetEvent('np:vehicles:plateCheck', function(plate)
    local src = source
    if type(plate) ~= 'string' then
        return notify(src, 'No plate captured.', 'error')
    end

  
    local now = GetGameTimer()
    if lastCheck[src] and now - lastCheck[src] < 1000 then return end
    lastCheck[src] = now

    plate = plate:gsub('^%s+', ''):gsub('%s+$', ''):upper()
    if plate == '' then
        return notify(src, 'No plate captured.', 'error')
    end
    if not Framework then
        return notify(src, ('Plate %s: no supported framework found.'):format(plate), 'error')
    end

    local ok, result = pcall(lookupOwner, plate)
    if not ok then
        print(('[codera-radar] plate lookup failed: %s'):format(tostring(result)))
        return notify(src, ('Plate %s: lookup failed.'):format(plate), 'error')
    end

    if result then
        notify(src, ('Plate %s — Registered to: %s'):format(plate, result.owner), 'success')
    else
        notify(src, ('Plate %s — Not registered / unknown.'):format(plate), 'error')
    end
end)

AddEventHandler('playerDropped', function()
    lastCheck[source] = nil
end)
