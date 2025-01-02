create schema if not exists "X_DEMO";

create table "X_DEMO"."post" (
    "postId" uuid not null,
    "title" text,
    "text" text,
    "userId" uuid not null default auth.uid(),
    "attachments" text[] not null,
    "createdAt" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


alter table "X_DEMO"."post" enable row level security;

create table "X_DEMO"."post_like" (
    "postId" uuid not null,
    "userId" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "X_DEMO"."post_like" enable row level security;

CREATE UNIQUE INDEX "post-like_pkey" ON "X_DEMO".post_like USING btree ("postId", "userId");

CREATE UNIQUE INDEX posts_pkey ON "X_DEMO".post USING btree ("postId");

alter table "X_DEMO"."post" add constraint "posts_pkey" PRIMARY KEY using index "posts_pkey";

alter table "X_DEMO"."post_like" add constraint "post-like_pkey" PRIMARY KEY using index "post-like_pkey";

alter table "X_DEMO"."post" add constraint "post_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) not valid;

alter table "X_DEMO"."post" validate constraint "post_userId_fkey";

alter table "X_DEMO"."post_like" add constraint "post-like_userId_fkey" FOREIGN KEY ("userId") REFERENCES auth.users(id) not valid;

alter table "X_DEMO"."post_like" validate constraint "post-like_userId_fkey";

alter table "X_DEMO"."post_like" add constraint "post_like_postId_fkey" FOREIGN KEY ("postId") REFERENCES "X_DEMO".post("postId") not valid;

alter table "X_DEMO"."post_like" validate constraint "post_like_postId_fkey";

grant delete on table "X_DEMO"."post" to "anon";

grant insert on table "X_DEMO"."post" to "anon";

grant references on table "X_DEMO"."post" to "anon";

grant select on table "X_DEMO"."post" to "anon";

grant trigger on table "X_DEMO"."post" to "anon";

grant truncate on table "X_DEMO"."post" to "anon";

grant update on table "X_DEMO"."post" to "anon";

grant delete on table "X_DEMO"."post" to "authenticated";

grant insert on table "X_DEMO"."post" to "authenticated";

grant references on table "X_DEMO"."post" to "authenticated";

grant select on table "X_DEMO"."post" to "authenticated";

grant trigger on table "X_DEMO"."post" to "authenticated";

grant truncate on table "X_DEMO"."post" to "authenticated";

grant update on table "X_DEMO"."post" to "authenticated";

grant delete on table "X_DEMO"."post" to "service_role";

grant insert on table "X_DEMO"."post" to "service_role";

grant references on table "X_DEMO"."post" to "service_role";

grant select on table "X_DEMO"."post" to "service_role";

grant trigger on table "X_DEMO"."post" to "service_role";

grant truncate on table "X_DEMO"."post" to "service_role";

grant update on table "X_DEMO"."post" to "service_role";

grant delete on table "X_DEMO"."post_like" to "anon";

grant insert on table "X_DEMO"."post_like" to "anon";

grant references on table "X_DEMO"."post_like" to "anon";

grant select on table "X_DEMO"."post_like" to "anon";

grant trigger on table "X_DEMO"."post_like" to "anon";

grant truncate on table "X_DEMO"."post_like" to "anon";

grant update on table "X_DEMO"."post_like" to "anon";

grant delete on table "X_DEMO"."post_like" to "authenticated";

grant insert on table "X_DEMO"."post_like" to "authenticated";

grant references on table "X_DEMO"."post_like" to "authenticated";

grant select on table "X_DEMO"."post_like" to "authenticated";

grant trigger on table "X_DEMO"."post_like" to "authenticated";

grant truncate on table "X_DEMO"."post_like" to "authenticated";

grant update on table "X_DEMO"."post_like" to "authenticated";

grant delete on table "X_DEMO"."post_like" to "service_role";

grant insert on table "X_DEMO"."post_like" to "service_role";

grant references on table "X_DEMO"."post_like" to "service_role";

grant select on table "X_DEMO"."post_like" to "service_role";

grant trigger on table "X_DEMO"."post_like" to "service_role";

grant truncate on table "X_DEMO"."post_like" to "service_role";

grant update on table "X_DEMO"."post_like" to "service_role";

create policy "post_poster"
on "X_DEMO"."post"
as permissive
for insert
to authenticated, service_role
with check (true);


create policy "select_authenticated"
on "X_DEMO"."post"
as permissive
for select
to authenticated
using (true);


create policy "service_role_delete_post"
on "X_DEMO"."post"
as permissive
for delete
to service_role
using (true);




