
RegisterServerEvent('baseevents:enteringVehicle')
AddEventHandler('baseevents:enteringVehicle', function(targetVehicle, vehicleSeat, vehicleDisplayName, vehicleNetId)
    local src = source
    RconLog({
        msgType = 'enteringVehicle',
        subject = src,
        vehicle = targetVehicle,
        seat = vehicleSeat,
        display = vehicleDisplayName,
        netId = vehicleNetId,
    })
end)

RegisterServerEvent('baseevents:enteringAborted')
AddEventHandler('baseevents:enteringAborted', function()
    RconLog({ msgType = 'enteringAborted', subject = source })
end)

RegisterServerEvent('baseevents:enteredVehicle')
AddEventHandler('baseevents:enteredVehicle', function(currentVehicle, currentSeat, vehicleDisplayName, vehicleNetId)
    RconLog({
        msgType = 'enteredVehicle',
        subject = source,
        vehicle = currentVehicle,
        seat = currentSeat,
        display = vehicleDisplayName,
        netId = vehicleNetId,
    })
end)

RegisterServerEvent('baseevents:leftVehicle')
AddEventHandler('baseevents:leftVehicle', function(currentVehicle, currentSeat, vehicleDisplayName, vehicleNetId)
    RconLog({
        msgType = 'leftVehicle',
        subject = source,
        vehicle = currentVehicle,
        seat = currentSeat,
        display = vehicleDisplayName,
        netId = vehicleNetId,
    })
end)
