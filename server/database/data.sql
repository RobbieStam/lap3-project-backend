DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS user_account;

CREATE TABLE tasks(
  id INT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (100) NOT NULL,
  description VARCHAR (1000) NOT NULL,
  mood VARCHAR (15) NOT NULL,
  completed_at VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO tasks (name, description, mood, completed_at)
VALUES
('Deploying_Backend', 'creating an MVC quickly with a single model to deploy our backend by 1pm', 'Good', '11:39PM-9/11/2023');

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    PRIMARY KEY (post_id)
);

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
);

