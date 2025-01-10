alter table "X_DEMO"."post" drop constraint "post_userId_fkey";

alter table "X_DEMO"."post_like" drop constraint "post-like_userId_fkey";

create table "X_DEMO"."comment" (
    "commentId" uuid not null,
    "text" text not null,
    "userId" uuid not null,
    "postId" uuid not null,
    "attachments" text[] not null,
    "createdAt" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


alter table "X_DEMO"."comment" enable row level security;

create table "X_DEMO"."profile" (
    "userId" uuid not null,
    "name" text not null,
    "avatarUrl" text not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "X_DEMO"."profile" enable row level security;

alter table "X_DEMO"."post" add column "canComment" boolean not null default true;

alter table "X_DEMO"."post" alter column "text" set not null;

alter table "X_DEMO"."post" alter column "title" set not null;

alter table "X_DEMO"."post" alter column "userId" drop default;

alter table "X_DEMO"."post_like" drop column "created_at";

alter table "X_DEMO"."post_like" add column "createdAt" timestamp with time zone not null default now();

CREATE UNIQUE INDEX comment_pkey ON "X_DEMO".comment USING btree ("commentId");

CREATE UNIQUE INDEX profile_pkey ON "X_DEMO".profile USING btree ("userId");

alter table "X_DEMO"."comment" add constraint "comment_pkey" PRIMARY KEY using index "comment_pkey";

alter table "X_DEMO"."profile" add constraint "profile_pkey" PRIMARY KEY using index "profile_pkey";

alter table "X_DEMO"."comment" add constraint "comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "X_DEMO".post("postId") not valid;

alter table "X_DEMO"."comment" validate constraint "comment_postId_fkey";

alter table "X_DEMO"."comment" add constraint "comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "X_DEMO".profile("userId") not valid;

alter table "X_DEMO"."comment" validate constraint "comment_userId_fkey";

alter table "X_DEMO"."post" add constraint "post_userId_fkey1" FOREIGN KEY ("userId") REFERENCES "X_DEMO".profile("userId") not valid;

alter table "X_DEMO"."post" validate constraint "post_userId_fkey1";

alter table "X_DEMO"."post_like" add constraint "post_like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "X_DEMO".profile("userId") not valid;

alter table "X_DEMO"."post_like" validate constraint "post_like_userId_fkey";

alter table "X_DEMO"."profile" add constraint "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) not valid;

alter table "X_DEMO"."profile" validate constraint "profile_userId_fkey";

grant delete on table "X_DEMO"."comment" to "anon";

grant insert on table "X_DEMO"."comment" to "anon";

grant references on table "X_DEMO"."comment" to "anon";

grant select on table "X_DEMO"."comment" to "anon";

grant trigger on table "X_DEMO"."comment" to "anon";

grant truncate on table "X_DEMO"."comment" to "anon";

grant update on table "X_DEMO"."comment" to "anon";

grant delete on table "X_DEMO"."comment" to "authenticated";

grant insert on table "X_DEMO"."comment" to "authenticated";

grant references on table "X_DEMO"."comment" to "authenticated";

grant select on table "X_DEMO"."comment" to "authenticated";

grant trigger on table "X_DEMO"."comment" to "authenticated";

grant truncate on table "X_DEMO"."comment" to "authenticated";

grant update on table "X_DEMO"."comment" to "authenticated";

grant delete on table "X_DEMO"."comment" to "service_role";

grant insert on table "X_DEMO"."comment" to "service_role";

grant references on table "X_DEMO"."comment" to "service_role";

grant select on table "X_DEMO"."comment" to "service_role";

grant trigger on table "X_DEMO"."comment" to "service_role";

grant truncate on table "X_DEMO"."comment" to "service_role";

grant update on table "X_DEMO"."comment" to "service_role";

grant delete on table "X_DEMO"."profile" to "anon";

grant insert on table "X_DEMO"."profile" to "anon";

grant references on table "X_DEMO"."profile" to "anon";

grant select on table "X_DEMO"."profile" to "anon";

grant trigger on table "X_DEMO"."profile" to "anon";

grant truncate on table "X_DEMO"."profile" to "anon";

grant update on table "X_DEMO"."profile" to "anon";

grant delete on table "X_DEMO"."profile" to "authenticated";

grant insert on table "X_DEMO"."profile" to "authenticated";

grant references on table "X_DEMO"."profile" to "authenticated";

grant select on table "X_DEMO"."profile" to "authenticated";

grant trigger on table "X_DEMO"."profile" to "authenticated";

grant truncate on table "X_DEMO"."profile" to "authenticated";

grant update on table "X_DEMO"."profile" to "authenticated";

grant delete on table "X_DEMO"."profile" to "service_role";

grant insert on table "X_DEMO"."profile" to "service_role";

grant references on table "X_DEMO"."profile" to "service_role";

grant select on table "X_DEMO"."profile" to "service_role";

grant trigger on table "X_DEMO"."profile" to "service_role";

grant truncate on table "X_DEMO"."profile" to "service_role";

grant update on table "X_DEMO"."profile" to "service_role";


grant usage on schema "X_DEMO" to postgres, anon, authenticated, service_role;

grant all privileges on all tables in schema "X_DEMO" to postgres, anon, authenticated, service_role;
grant all privileges on all functions in schema "X_DEMO" to postgres, anon, authenticated, service_role;
grant all privileges on all sequences in schema "X_DEMO" to postgres, anon, authenticated, service_role;

alter default privileges in schema "X_DEMO" grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema "X_DEMO" grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema "X_DEMO" grant all on sequences to postgres, anon, authenticated, service_role;