create table if not exists investments
(
    id   int auto_increment
    primary key,
    investorId int,
    pocoId int,
    capital int,
    CONSTRAINT FK_investor FOREIGN KEY (investorId)
    REFERENCES users(id),
    CONSTRAINT FK_poco FOREIGN KEY (pocoId)
    REFERENCES users(id)
    );

alter table investments add hackId int;
alter table investments add CONSTRAINT FK_hack FOREIGN KEY (hackId) references hacks(id);

