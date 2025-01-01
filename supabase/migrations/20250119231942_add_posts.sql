create schema if not exists "X_DEMO";

create table "X_DEMO"."posts" (
    "postId" uuid not null,
    "title" text,
    "text" text,
    "userId" uuid not null,
    "attachments" text[] not null,
    "createdAt" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


alter table "X_DEMO"."posts" enable row level security;

CREATE UNIQUE INDEX posts_pkey ON "X_DEMO".posts USING btree ("postId");

alter table "X_DEMO"."posts" add constraint "posts_pkey" PRIMARY KEY using index "posts_pkey";



