-- INSERT TO TABLE users.roles
INSERT INTO users.roles(role_id,role_name)
VALUES (1,'Guest'),(2,'Manager'),(3,'Office Boy'),(4,'Admin'),(5,'User');


-- INSERT TO TABLE users.users
INSERT INTO users.users(
user_id,
user_full_name,
user_type,
user_company_name,
user_email,
user_phone_number,
user_modified_date
) VALUES (
1,
'Faqih Pratama Muhti',
'T', --Travel Agent
'muhtiTravel',
'faqihpratamamuhti@gmail.com',
'+6281212499837',
'2023/01/08 03:00:00'
), (
2,
'Fadli Pratama Muhti',
'C', --Corporate
'MuhtiCorporate',
'fadlipratamamuhti@gmail.com',
'+6289342968303',
'2023/01/08 02:00:00'
), (
3,
'Firly Isnaeni Muhti',
'I', --Individual
'muhtiIndividual',
'firlyisnaenimuhti@gmail.com',
'+6283920429405',
'2023/01/07 01:00:00'
), (
4,
'Fitrya Muhti',
'T', --Travel Agent
'muhtiTravel',
'fitryamuhti@gmail.com',
'+6285830596205',
'2023/01/06 00:00:00'
), (
5,
'Uzumaki Naruto',
'C', --Corporate
'shinobiCorporate',
'uzumakinaruto@gmail.com',
'+6284320985945',
'2023/01/05 23:00:00'
), (
6,
'Uchiha Sasuke',
'I', --Individual
'shinobiIndividual',
'uchihasasuke@gmail.com',
'+6286565748375',
'2023/01/04 22:00:00'
), (
7,
'Orochimaru',
'T', --Travel Agent
'shinobiTravel',
'orochimaru@gmail.com',
'+6281029384756',
'2023/01/03 21:00:00'
), (
8,
'Kakashi Hatake',
'C', --Corporate
'shinobiCorporate',
'kakashihatake@gmail.com',
'+6288745095382',
'2023/01/02 20:00:00'
), (
9,
'Uchiha Itachi',
'I', --Individual
'shinobiIndividual',
'uchihaitachi@gmail.com',
'+6288473994839',
'2023/01/01 19:00:00'
), (
10,
'Senju Tsunade',
'T', --Travel Agent
'shinobiTravel',
'senjutsunade@gmail.com',
'+62846392058396',
'2023/01/02 18:00:00'
), (
11,
'Uzumaki Nagato',
'C', --Corporate
'shinobiCorporate',
'uzumakinagato@gmail.com',
'+6284590567834',
'2023/01/03 17:00:00'
), ( 12,
'Uchiha Obito',
'I', --Individual
'shinobiIndividual',
'uchihaobito@gmail.com',
'+6281212495467',
'2023/01/04 16:00:00'
), (
13,
'Sai',
'T', --Travel Agent
'shinobiTravel',
'sai@gmail.com',
'+6281211234837',
'2023/01/05 15:00:00'
), (
14,
'Yahiko',
'C', --Corporate
'shinobiCorporate',
'yahiko@gmail.com',
'+6281234499837',
'2023/01/06 14:00:00'
), (
15,
'Hoshigaki Kisame',
'I', --Individual
'shinobiIndividual',
'hoshigakikisame@gmail.com',
'+6281214321837',
'2023/01/07 13:00:00'
), (
16,
'Jiraiya',
'T', --Travel Agent
'shinobiTravel',
'jiraiya@gmail.com',
'+6281212497654',
'2023/01/08 12:00:00'
), (
17,
'Senju Tobirama',
'C', --Corporate
'shinobiCorporate',
'senjutobirama@gmail.com',
'+6284538798967',
'2023/01/07 11:00:00'
), (
18,
'Uchiha Shisui',
'I', --Individual
'shinobiIndividual',
'uchihashisui@gmail.com',
'+6281456799837',
'2023/01/06 10:00:00'
), (
19,
'Yakushi Kabuto',
'T', --Travel Agent
'shinobiTravel',
'yakushikabuto@gmail.com',
'+6285634344526',
'2023/01/05 09:00:00'
), (
20,
'Namikaze Minato',
'C', --Corporate
'shinobiCorporate',
'namikazeminato@gmail.com',
'+62812124934627',
'2023/01/04 08:00:00'
), (
21,
'Hyuuga Neji',
'I', --Individual
'shinobiIndividual',
'hyuuganeji@gmail.com',
'+62835462897685',
'2023/01/03 07:00:00'
), (
22,
'Momochi Zabuza',
'T', --Travel Agent
'shinobiTravel',
'momochizabuza@gmail.com',
'+6285634123456',
'2023/01/05 09:00:00'
), (
23,
'Senju Hashirama',
'C', --Corporate
'shinobiCorporate',
'senjuhashirama@gmail.com',
'+62812124912345',
'2023/01/04 08:00:00'
), (
24,
'Hyuuga Neji',
'I', --Individual
'shinobiIndividual',
'hyuuganeji@gmail.com',
'+62835462899837',
'2023/01/03 07:00:00'
);

-- INSERT TO TABLE users.user_roles
INSERT INTO users.user_roles
(usro_user_id,usro_role_id)
VALUES
--Travel Agency
--Corporate
--Individual
(1,1),
(2,1),
(3,1),

(4,1),
(5,1),
(6,1),

(7,1),
(8,1),
(9,1),

(10,1),
(11,1),
(12,1),

(13,2),
(14,2),
(15,2),

(16,3),
(17,3),
(18,3),

(19,4),
(20,4),
(21,4),

(22,5),
(23,5),
(24,5);

-- INSERT TO TABLE users.user_password
INSERT INTO users.user_password
(
uspa_user_id,
uspa_passwordHash,
uspa_passwordSalt
)
VALUES
(
1,
md5('password'),
'md5'
),
(
2,
md5('password'),
'md5'
),
(
3,
md5('password'),
'md5'
),
(
4,
md5('password'),
'md5'
),
(
5,
md5('password'),
'md5'
),
(
6,
md5('password'),
'md5'
),
(
7,
md5('password'),
'md5'
),
(
8,
md5('password'),
'md5'
),
(
9,
md5('password'),
'md5'
),
(
10,
md5('password'),
'md5'
),
(
11,
md5('password'),
'md5'
),
(
12,
md5('password'),
'md5'
),
(
13,
md5('password'),
'md5'
),
(
14,
md5('password'),
'md5'
),
(
15,
md5('password'),
'md5'
),
(
16,
md5('password'),
'md5'
),
(
17,
md5('password'),
'md5'
),
(
18,
md5('password'),
'md5'
),
(
19,
md5('password'),
'md5'
),
(
20,
md5('password'),
'md5'
),
(
21,
md5('password'),
'md5'
),
(
22,
md5('password'),
'md5'
),
(
23,
md5('password'),
'md5'
),
(
24,
md5('password'),
'md5'
);

-- INSERT TO TABLE users.user_members
INSERT INTO users.user_members
(
usme_user_id,
usme_memb_name, -- SILVER / GOLD / VIP / WIZARD
usme_promote_date,
usme_points,
usme_type -- default / expired
)
VALUES
(
1,
'WIZARD',
'2023/01/01',
12,
'default'
),
(
2,
'WIZARD',
'2023/01/01',
11,
'default'
),
(
3,
'WIZARD',
'2023/01/01',
10,
'default'
),

(
4,
'VIP',
'2023/01/01',
12,
'default'
),
(
5,
'VIP',
'2023/01/01',
11,
'default'
),
(
6,
'VIP',
'2023/01/01',
10,
'default'
),

(
7,
'GOLD',
'2023/01/01',
12,
'default'
),
(
8,
'GOLD',
'2023/01/01',
11,
'default'
),
(
9,
'GOLD',
'2023/01/01',
10,
'default'
),

(
10,
'SILVER',
'2023/01/01',
12,
'default'
),
(
11,
'SILVER',
'2023/01/01',
11,
'default'
),
(
12,
'SILVER',
'2023/01/01',
10,
'default'
),

(
13,
'WIZARD',
'2023/01/01',
12,
'default'
),
(
14,
'WIZARD',
'2023/01/01',
11,
'default'
),
(
15,
'WIZARD',
'2023/01/01',
10,
'default'
),

(
16,
'VIP',
'2023/01/01',
12,
'default'
),
(
17,
'VIP',
'2023/01/01',
11,
'default'
),
(
18,
'VIP',
'2023/01/01',
10,
'default'
),

(
19,
'GOLD',
'2023/01/01',
12,
'default'
),
(
20,
'GOLD',
'2023/01/01',
11,
'default'
),
(
21,
'GOLD',
'2023/01/01',
10,
'default'
),

(
22,
'SILVER',
'2023/01/01',
12,
'default'
),
(
23,
'SILVER',
'2023/01/01',
11,
'default'
),
(
24,
'SILVER',
'2023/01/01',
10,
'default'
);

-- INSERT TO TABLE users.user_bonus_points
INSERT INTO users.user_bonus_points
(
ubpo_user_id,
ubpo_total_points,
ubpo_bonus_type, -- ubpo_bonus_type :
-- R : Rating
-- P : Promote
ubpo_create_on
)
VALUES
(
1,
32,
'R',
'2023/01/09'
),
(
2,
31,
'R',
'2023/01/09'
),
(
3,
30,
'R',
'2023/01/09'
),

(
4,
32,
'P',
'2023/01/08'
),
(
5,
31,
'P',
'2023/01/08'
),
(
6,
30,
'P',
'2023/01/08'
),

(
7,
32,
'R',
'2023/01/07'
),
(
8,
31,
'R',
'2023/01/07'
),
(
9,
30,
'R',
'2023/01/07'
),

(
10,
32,
'P',
'2023/01/06'
),
(
11,
31,
'P',
'2023/01/06'
),
(
12,
30,
'P',
'2023/01/06'
),

(
13,
32,
'R',
'2023/01/05'
),
(
14,
31,
'R',
'2023/01/05'
),
(
15,
30,
'R',
'2023/01/05'
),

(
16,
32,
'P',
'2023/01/04'
),
(
17,
31,
'P',
'2023/01/04'
),
(
18,
30,
'P',
'2023/01/04'
),

(
19,
32,
'R',
'2023/01/03'
),
(
20,
31,
'R',
'2023/01/03'
),
(
21,
30,
'R',
'2023/01/03'
),

(
22,
32,
'P',
'2023/01/02'
),
(
23,
31,
'P',
'2023/01/02'
),
(
24,
30,
'P',
'2023/01/02'
);

-- INSERT TO TABLE user_profiles
INSERT INTO users.user_profiles(
uspro_id,
uspro_national_id, -- NO. KTP
uspro_birth,
uspro_job_title,
uspro_marital_status, -- M / S => Married / Singel
uspro_gender, -- F / M => Female / Male
uspro_addr_id,
uspro_user_id
)
VALUES
(
1,
'345678910111213',
'1995/01/12',
'Full-Stack Developer',
'S',
'M',
1,
1
),
(
2,
'345678910111214',
'195/01/12',
'Mechanical Engineer',
'M',
'M',
1,
2
),
(
3,
'345678910111215',
'2004/01/04',
'Accountant',
'S',
'F',
1,
3
),
(
4,
'345678910111216',
'2013/09/29',
'Chef',
'M',
'F',
1,
4
),
(
5,
'345678910111217',
'1996/01/11',
'UI/UX Designer',
'S',
'M',
1,
5
),
(
6,
'345678910111218',
'1997/02/12',
'Database Administrator',
'M',
'M',
2,
6
),
(
7,
'345678910111219',
'1998/03/13',
'IT Support',
'S',
'M',
3,
7
),
(
8,
'345678910111220',
'1999/04/14',
'Data Analyst',
'M',
'M',
4,
8
),
(
9,
'345678910111221',
'1995/05/15',
'Doctor',
'S',
'F',
5,
9
),
(
10,
'345678910111222',
'1996/06/16',
'Librarian',
'M',
'M',
6,
10
),
(
11,
'345678910111223',
'1997/01/17',
'Entrepreneur',
'M',
'M',
7,
11
),
(
12,
'345678910111224',
'1998/08/18',
'Public Relations',
'S',
'M',
8,
12
),
(
13,
'345678910111225',
'1999/09/19',
'Programmer',
'M',
'M',
9,
13
),
(
14,
'345678910111226',
'1995/10/20',
'Data Analyst',
'M',
'M',
10,
14
),
(
15,
'345678910111227',
'1991/01/21',
'Database Administrator',
'M',
'M',
11,
15
),
(
16,
'345678910111228',
'1992/02/22',
'Mechanical Engineer',
'S',
'M',
12,
16
),
(
17,
'345678910111229',
'1993/03/23',
'Electrical Engineer',
'M',
'M',
13,
17
),
(
18,
'345678910111230',
'1994/04/24',
'IT Support',
'S',
'M',
14,
18
),
(
19,
'345678910111231',
'1995/05/25',
'Software Engineer',
'M',
'M',
15,
19
),
(
20,
'345678910111232',
'1996/06/26',
'Data Analyst',
'M',
'M',
16,
20
),
(
21,
'345678910111233',
'1997/07/27',
'IT Suppurt',
'S',
'M',
17,
21
),
(
22,
'345678910111234',
'1998/08/28',
'Database Administrator',
'M',
'M',
18,
22
),
(
23,
'345678910111235',
'1999/09/29',
'Chef',
'S',
'M',
19,
23
),
(
24,
'345678910111236',
'2000/10/30',
'Doctor',
'M',
'M',
20,
24
);