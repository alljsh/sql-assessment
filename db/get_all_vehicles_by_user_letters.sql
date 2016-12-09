SELECT make, model, year, first_name
FROM Vehicles JOIN Users ON Users.id = Vehicles.owner_id
WHERE first_name LIKE $1 || '%';
