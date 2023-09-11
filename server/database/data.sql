DROP TABLE IF EXISTS tasks;

CREATE TABLE tasks(
  id INT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (100) NOT NULL,
  description VARCHAR (1000) NOT NULL,
  completed_at VARCHAR(200) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO tasks (name, description, completed_at)
VALUES
('Deploying_Backend', 'creating an MVC quickly with a single model to deploy our backend by 1pm', '11:39PM-9/11/2023');

