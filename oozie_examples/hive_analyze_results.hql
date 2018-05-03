drop table users;

create external table users (user_id int, age string, gender string, occupation string, zip string) row format delimited fields terminated by '|' location '/home/maria_dev/userInfo/';

insert overwrite directory '${OUTPUT}' select * from users where occupation="student"; 
