-- Active: 1692648314283@@127.0.0.1@3306

CREATE TABLE  users ( 
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  nickName TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME()) NOT NULL
);
CREATE TABLE posts (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  creator_id TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT (0) NOT NULL,
  dislikes INTEGER DEFAULT (0) NOT NULL,
  comments INTEGER DEFAULT (0) NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
drop TABLE post_comments;

CREATE TABLE likes_dislikes (
  user_id TEXT NOT NULL,
  post_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES posts (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE comments (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  creator_id TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT (0) NOT NULL,
  dislikes INTEGER DEFAULT (0) NOT NULL,
  createdAt TEXT NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE likes_dislikes_comments (
  user_id TEXT NOT NULL,
  comment_id TEXT NOT NULL,
  like INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comments(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE
    post_comments (
        post_id TEXT NOT NULL,
        comment_id TEXT NOT NULL,
        FOREIGN KEY (post_id) REFERENCES posts (id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (comment_id) REFERENCES comments (id) ON UPDATE CASCADE ON DELETE CASCADE
    );
SELECT * FROM posts;
SELECT * FROM comments;
SELECT * FROM users;
SELECT* FROM likes_dislikes;
SELECT * FROM post_comments;
