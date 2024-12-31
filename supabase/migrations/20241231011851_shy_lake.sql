/*
  # Initial Schema Setup for Social Tasks Bot

  1. New Tables
    - users
      - id (uuid, primary key)
      - telegram_id (bigint, unique)
      - points (int)
      - created_at (timestamp)
    
    - tasks
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - points (int)
      - active (boolean)
      - created_at (timestamp)
    
    - completed_tasks
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - task_id (uuid, references tasks)
      - completed_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id bigint UNIQUE NOT NULL,
  points int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Tasks table
CREATE TABLE tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  points int NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Completed tasks table
CREATE TABLE completed_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  task_id uuid REFERENCES tasks(id),
  completed_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE completed_tasks ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read access to tasks" 
  ON tasks FOR SELECT TO authenticated 
  USING (true);

CREATE POLICY "Allow users to view their own data" 
  ON users FOR SELECT TO authenticated 
  USING (auth.uid() = id);

CREATE POLICY "Allow users to update their own points" 
  ON users FOR UPDATE TO authenticated 
  USING (auth.uid() = id);

CREATE POLICY "Allow users to record completed tasks" 
  ON completed_tasks FOR INSERT TO authenticated 
  WITH CHECK (auth.uid() = user_id);