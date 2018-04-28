drop table if exists movie_data;

drop table if exists movie_info;

create table movie_data (
	user_id int,
	movie_id int,
	rating int,
	time_stamp string
)
row format delimited
fields terminated by '\t'
stored as textfile;

create table movie_info (
	movie_id string,
	movie_name string,
	movie_release_date string,
	col1 string,
	col2 string,
	col3 string,
	col4 string,
	col5 string,
	col6 string,
	col7 string
)
row format delimited
fields terminated by '|'
stored as textfile;

load data local inpath '/movie_data/u.data' overwrite into table movie_data;
load data local inpath 'movie_data/u.item' overwrite into table movie_info;

select * from movie_data limit 5;
select * from movie_info limit 5;




