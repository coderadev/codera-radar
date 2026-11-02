
local isInVehicle = false
local isEnteringVehicle = false
local currentVehicle = 0
local currentSeat = 0

local function getSeat(ped, vehicle)
    for seat = -1, GetVehicleModelNumberOfSeats(GetEntityModel(vehicle)) - 2 do
        if GetPedInVehicleSeat(vehicle, seat) == ped then
            return seat
        end
    end
    return -2
end

local function vehicleInfo(vehicle)
    local model = GetEntityModel(vehicle)
    local displayName = GetDisplayNameFromVehicleModel(model)
    local netId = VehToNet(vehicle)
    return displayName, netId
end

CreateThread(function()
    while true do
        Wait(100)
        local ped = PlayerPedId()

        if not isInVehicle and not IsPlayerDead(PlayerId()) then
       
            if DoesEntityExist(GetVehiclePedIsTryingToEnter(ped)) and not isEnteringVehicle then
                local vehicle = GetVehiclePedIsTryingToEnter(ped)
                local seat = GetSeatPedIsTryingToEnter(ped)
                local displayName, netId = vehicleInfo(vehicle)
                isEnteringVehicle = true
                TriggerServerEvent('baseevents:enteringVehicle', vehicle, seat, displayName, netId)
      
            elseif not DoesEntityExist(GetVehiclePedIsTryingToEnter(ped)) and not IsPedInAnyVehicle(ped, true) and isEnteringVehicle then
                TriggerServerEvent('baseevents:enteringAborted')
                isEnteringVehicle = false
            elseif IsPedInAnyVehicle(ped, false) then
                isEnteringVehicle = false
                isInVehicle = true
                currentVehicle = GetVehiclePedIsIn(ped, false)
                currentSeat = getSeat(ped, currentVehicle)
                local displayName, netId = vehicleInfo(currentVehicle)
                TriggerEvent('baseevents:enteredVehicle', currentVehicle, currentSeat, displayName, netId)
                TriggerServerEvent('baseevents:enteredVehicle', currentVehicle, currentSeat, displayName, netId)
            end
        elseif isInVehicle then

            if not IsPedInAnyVehicle(ped, false) or IsPlayerDead(PlayerId()) then
                local displayName, netId = 'Unknown', 0
                if DoesEntityExist(currentVehicle) then
                    displayName, netId = vehicleInfo(currentVehicle)
                end
                TriggerEvent('baseevents:leftVehicle', currentVehicle, currentSeat, displayName, netId)
                TriggerServerEvent('baseevents:leftVehicle', currentVehicle, currentSeat, displayName, netId)
                isInVehicle = false
                currentVehicle = 0
                currentSeat = 0
            end
        end
    end
end)
