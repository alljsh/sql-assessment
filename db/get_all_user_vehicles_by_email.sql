SELECT make, model, year, email
FROM Vehicles JOIN Users ON Users.id = Vehicles.owner_id
WHERE email = $1;
