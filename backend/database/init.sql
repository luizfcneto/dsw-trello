-- Tabela Users
CREATE TABLE Users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  recovery_token VARCHAR(255)
);

-- Tabela Boards
CREATE TABLE Boards (
  board_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES Users(user_id),
  title VARCHAR(255),
  background_color VARCHAR(255),
  text_color VARCHAR(255)
);

-- Tabela Lists
CREATE TABLE Lists (
  list_id SERIAL PRIMARY KEY,
  board_id INTEGER REFERENCES Boards(board_id),
  title VARCHAR(255),
  order_index INTEGER
);

-- Tabela Cards
CREATE TABLE Cards (
  card_id SERIAL PRIMARY KEY,
  list_id INTEGER REFERENCES Lists(list_id),
  content TEXT,
  creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela Card_Sharing
CREATE TABLE Card_Sharing (
  card_id INTEGER REFERENCES Cards(card_id),
  user_id INTEGER REFERENCES Users(user_id),
  can_edit BOOLEAN,
  PRIMARY KEY (card_id, user_id)
);

-- Tabela Favorite_Boards
CREATE TABLE Favorite_Boards (
  user_id INTEGER REFERENCES Users(user_id),
  board_id INTEGER REFERENCES Boards(board_id),
  PRIMARY KEY (user_id, board_id)
);

-- Tabela Attachments
CREATE TABLE Attachments (
  attachment_id SERIAL PRIMARY KEY,
  card_id INTEGER REFERENCES Cards(card_id),
  file_name VARCHAR(255),
  file_path VARCHAR(255)
);

-- Tabela Collections
CREATE TABLE Collections (
  collection_id SERIAL PRIMARY KEY,
  title VARCHAR(255)
);

-- Tabela Collection_Boards
CREATE TABLE Collection_Boards (
  collection_id INTEGER REFERENCES Collections(collection_id),
  board_id INTEGER REFERENCES Boards(board_id),
  PRIMARY KEY (collection_id, board_id)
);