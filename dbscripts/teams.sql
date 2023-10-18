create table if not exists teams
(
    id   int auto_increment
        primary key,
    repId int,
    name varchar(256),
    budget int,
    CONSTRAINT FK_team_rep FOREIGN KEY (repId)
        REFERENCES users(id)
);