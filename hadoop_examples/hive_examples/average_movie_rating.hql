
create  table if not exists movie_data (
        user_id int,
        movie_id int,
        rating int,
        time_stamp string
)
row format delimited
fields terminated by '\t'
stored as textfile

create  table if not exists movie_info (
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
stored as textfile

load data local inpath 'u.data' into table movie_data;
load data local inpath 'u.item' into table movie_info;

select mi.movie_name, avg(md.rating) from movie_info mi join movie_data md on (mi.movie_id=md.movie_id)
group by md.movie_id, mi.movie_name order by avg(md.rating) desc limit 10;


