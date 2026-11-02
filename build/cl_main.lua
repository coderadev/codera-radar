local AllowedJobs = {
    police = true,
    sheriff = true,
    bcso = true,
    sasp = true,
    state = true,
}
local RequireOnDuty = true

local Framework, Core

local function detectFramework()
    if GetResourceState('qbx_core') == 'started' then
        return 'QBX', nil
    elseif GetResourceState('qb-core') == 'started' then
        return 'QBCore', exports['qb-core']:GetCoreObject()
    elseif GetResourceState('es_extended') == 'started' then
        return 'ESX', exports['es_extended']:getSharedObject()
    end
    return nil, nil
end

local function isAllowed(job)
    if not job or not job.name or not AllowedJobs[job.name] then
        return false
    end
    if RequireOnDuty and (Framework == 'QBCore' or Framework == 'QBX') and job.onduty == false then
        return false
    end
    return true
end

local function apply(job)
    if isAllowed(job) then
        TriggerEvent('baseevents:leftVehicle')
    else
        TriggerEvent('wk:disableRadar')
    end
end

local function currentJob()
    if Framework == 'QBX' then
        local data = exports.qbx_core:GetPlayerData()
        return data and data.job
    elseif Framework == 'QBCore' then
        local data = Core.Functions.GetPlayerData()
        return data and data.job
    elseif Framework == 'ESX' then
        local data = Core.GetPlayerData()
        return data and data.job
    end
end

CreateThread(function()
    while not Framework do
        Framework, Core = detectFramework()
        if not Framework then Wait(1000) end
    end
    Wait(2000)
    apply(currentJob())
end)

RegisterNetEvent('QBCore:Client:OnPlayerLoaded', function()
    Wait(1000)
    apply(currentJob())
end)
RegisterNetEvent('QBCore:Client:OnJobUpdate', function(job) apply(job) end)
RegisterNetEvent('QBCore:Client:SetDuty', function()
    Wait(200)
    apply(currentJob())
end)

RegisterNetEvent('esx:playerLoaded', function(xPlayer) apply(xPlayer and xPlayer.job) end)
RegisterNetEvent('esx:setJob', function(job) apply(job) end)
