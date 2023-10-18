create table if not exists hacks
(
    id   int auto_increment
        primary key,
    teamId int,
    hackType varchar(100),
    name varchar(256),
    description varchar(256),
    CONSTRAINT FK_team FOREIGN KEY (teamId)
        REFERENCES users(id)
);