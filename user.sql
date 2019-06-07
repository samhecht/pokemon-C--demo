--name: get_pokemon_types
SELECT poke_type
FROM pokemon
inner JOIN types
on pokemon.poke_id = types.poke_id 
WHERE pokemon.poke_name = :poke_name

--name: get_good_against_types
SELECT foe_type
FROM good_against 
WHERE user_type in :user_type 



--name: get_poke_ids_from_types
SELECT poke_id
FROM types 
WHERE poke_type in :poke_type 


--name: get_names_from_ids
SELECT poke_name 
FROM pokemon 
WHERE poke_id in :poke_id 





