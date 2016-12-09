UPDATE Vehicles
SET owner_id = null
WHERE id = $2 AND owner_id = $1;
