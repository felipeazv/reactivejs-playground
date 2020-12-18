
CREATE SCHEMA IF NOT EXISTS playground_schema;

CREATE TABLE IF NOT EXISTS playground_schema.task (
  id bigint NOT NULL,
  description varchar(200) NOT NULL,
  priority bigint,
  status integer,
  PRIMARY KEY (id)
);