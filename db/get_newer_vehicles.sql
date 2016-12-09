SELECT year, make, model, first_name, last_name
FROM Vehicles JOIN Users ON Users.id = Vehicles.owner_id
WHERE year > 2000 ORDER BY year DESC;
