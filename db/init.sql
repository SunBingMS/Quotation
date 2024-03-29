create table m_hotel(level, price_adult, price_child);
DELETE FROM m_hotel;
insert into m_hotel values('3', '10000', '10000');
insert into m_hotel values('4', '18000', '18000');
insert into m_hotel values('5', '55000', '55000');

create table m_car(kind, upper_limit, price);
DELETE FROM m_car;
insert into m_car values('0', '5', '35000');
insert into m_car values('0', '10', '60000');
insert into m_car values('0', '18', '75000');
insert into m_car values('0', '30', '110000');
insert into m_car values('0', '45', '125000');
insert into m_car values('1', '5', '25000');
insert into m_car values('1', '10', '40000');
insert into m_car values('1', '18', '55000');
insert into m_car values('1', '30', '90000');
insert into m_car values('1', '45', '95000');

-- create table m_guide(price_adult, price_child);
-- DELETE FROM m_guide;
-- insert into m_guide values('30000', '30000');

create table m_food(price_adult, price_child);
DELETE FROM m_food;
insert into m_food values('3000', '2000');

create table m_project(id, name, price_adult, price_child);
DELETE FROM m_project;
insert into m_project values('1', 'Sumo Wrestler', '15000', '15000');
insert into m_project values('2', 'Tea Ceremony', '9000', '9000');
insert into m_project values('3', 'Geisha Show', '7500', '7500');
insert into m_project values('4', 'Kimono Experience With Expert Photographer ', '13000', '13000');
insert into m_project values('5', 'Sword Marking', '65000', '65000');

create table m_ticket(id, name, price_adult, price_child);
DELETE FROM m_ticket;
insert into m_ticket values('1', 'USJ or Disney', '11000', '6000');
insert into m_ticket values('2', 'Temple', '500', '500');
insert into m_ticket values('3', 'Bullet Train(Tokyo-Osaka)', '16000', '8000');
insert into m_ticket values('4', 'Bullet Train(Tokyo-Nagoya)', '12000', '6000');
insert into m_ticket values('5', 'Bullet Train(Tokyo-Hakata)', '24000', '12000');
insert into m_ticket values('6', 'Bullet Train(Osaka-Nagoya)', '7000', '3500');
insert into m_ticket values('7', 'Bullet Train(Osaka-Hakata)', '17000', '8500');
insert into m_ticket values('8', 'Airplane(Tokyo-Sapporo)', '40000', '20000');
insert into m_ticket values('9', 'Airplane(Osaka-Sapporo)', '52000', '26000');
insert into m_ticket values('10', 'Owakudani valley & Hakone Rope Way', '4000', '2000');
insert into m_ticket values('11', 'Pirate ship cruise on Lake Ashi', '3000', '2000');
insert into m_ticket values('12', 'Team Lab Planet Tokyo', '5000', '2000');
insert into m_ticket values('13', 'Sky Tree', '3500', '3500');
insert into m_ticket values('14', 'Cruise ride in Dotobori River', '1300', '500');
insert into m_ticket values('15', 'Hello Kitty Smile Museum', '2500', '1000');
insert into m_ticket values('16', 'Aquaignis-Awaji Onsen', '3500', '2000');
insert into m_ticket values('17', 'Osaka Castle', '800', '800');

create table t_log(id, time, ip, num_adults, num_children, travel_dates, amount);
create table t_log_detail(id, time, num_day, ck_guide, ck_lunch, ck_dinner, ck_car, br_car, ck_hotel, br_area, br_hotel, ck_experiences, dd_experiences, ck_ticket, dd_ticket, num_other);

create table m_user(account, password);
DELETE FROM m_user;
insert into m_user values('admin', 'admin');
insert into m_user values('test', 'test');