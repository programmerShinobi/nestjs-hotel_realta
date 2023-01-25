SELECT * FROM users.users uuu
LEFT JOIN users.user_roles uur ON uur.usro_user_id = uuu.user_id 
LEFT JOIN users.roles ur ON ur.role_id = uur.usro_role_id
LEFT JOIN users.user_bonus_points uubp ON uubp.ubpo_user_id = uuu.user_id
LEFT JOIN users.user_password uup ON uup.uspa_user_id = uuu.user_id
LEFT JOIN users.user_members uum ON uum.usme_user_id = uuu.user_id
LEFT JOIN master.members mm ON mm.memb_name = uum.usme_memb_name
LEFT JOIN users.user_profiles uups ON uups.uspro_user_id = uuu.user_id
LEFT JOIN master.address ma ON ma.addr_id = uups.uspro_addr_id
LEFT JOIN master.provinces mp ON mp.prov_id = ma.addr_prov_id
LEFT JOIN master.country mc ON mc.country_id = mp.prov_country_id
LEFT JOIN master.regions mr ON mr.region_code = mc.country_region_id
