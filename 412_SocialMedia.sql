--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: app_user; Type: TABLE; Schema: public; Owner: thomassanmartin
--

CREATE TABLE public.app_user (
    u_id integer NOT NULL,
    u_name character varying(255) NOT NULL,
    u_birthdate date
);


ALTER TABLE public.app_user OWNER TO thomassanmartin;

--
-- Name: app_user_u_id_seq; Type: SEQUENCE; Schema: public; Owner: thomassanmartin
--

CREATE SEQUENCE public.app_user_u_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.app_user_u_id_seq OWNER TO thomassanmartin;

--
-- Name: app_user_u_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomassanmartin
--

ALTER SEQUENCE public.app_user_u_id_seq OWNED BY public.app_user.u_id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: thomassanmartin
--

CREATE TABLE public.comments (
    c_id integer NOT NULL,
    c_poster integer,
    c_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    p_content text,
    post_id integer
);


ALTER TABLE public.comments OWNER TO thomassanmartin;

--
-- Name: comments_c_id_seq; Type: SEQUENCE; Schema: public; Owner: thomassanmartin
--

CREATE SEQUENCE public.comments_c_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_c_id_seq OWNER TO thomassanmartin;

--
-- Name: comments_c_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomassanmartin
--

ALTER SEQUENCE public.comments_c_id_seq OWNED BY public.comments.c_id;


--
-- Name: group_members; Type: TABLE; Schema: public; Owner: thomassanmartin
--

CREATE TABLE public.group_members (
    g_id integer NOT NULL,
    p_id integer NOT NULL,
    joined_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.group_members OWNER TO thomassanmartin;

--
-- Name: groups; Type: TABLE; Schema: public; Owner: thomassanmartin
--

CREATE TABLE public.groups (
    g_id integer NOT NULL,
    g_name character varying(255) NOT NULL,
    g_members integer,
    g_creator integer
);


ALTER TABLE public.groups OWNER TO thomassanmartin;

--
-- Name: groups_g_id_seq; Type: SEQUENCE; Schema: public; Owner: thomassanmartin
--

CREATE SEQUENCE public.groups_g_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.groups_g_id_seq OWNER TO thomassanmartin;

--
-- Name: groups_g_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomassanmartin
--

ALTER SEQUENCE public.groups_g_id_seq OWNED BY public.groups.g_id;


--
-- Name: post; Type: TABLE; Schema: public; Owner: thomassanmartin
--

CREATE TABLE public.post (
    p_id integer NOT NULL,
    p_poster integer,
    p_text character varying(255),
    p_content text,
    p_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.post OWNER TO thomassanmartin;

--
-- Name: post_p_id_seq; Type: SEQUENCE; Schema: public; Owner: thomassanmartin
--

CREATE SEQUENCE public.post_p_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_p_id_seq OWNER TO thomassanmartin;

--
-- Name: post_p_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomassanmartin
--

ALTER SEQUENCE public.post_p_id_seq OWNED BY public.post.p_id;


--
-- Name: profile; Type: TABLE; Schema: public; Owner: thomassanmartin
--

CREATE TABLE public.profile (
    p_id integer NOT NULL,
    p_datemade date NOT NULL,
    p_name character varying(255),
    p_email character varying(255),
    p_username character varying(255),
    p_password character varying(255),
    u_id integer
);


ALTER TABLE public.profile OWNER TO thomassanmartin;

--
-- Name: profile_p_id_seq; Type: SEQUENCE; Schema: public; Owner: thomassanmartin
--

CREATE SEQUENCE public.profile_p_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profile_p_id_seq OWNER TO thomassanmartin;

--
-- Name: profile_p_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: thomassanmartin
--

ALTER SEQUENCE public.profile_p_id_seq OWNED BY public.profile.p_id;


--
-- Name: app_user u_id; Type: DEFAULT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.app_user ALTER COLUMN u_id SET DEFAULT nextval('public.app_user_u_id_seq'::regclass);


--
-- Name: comments c_id; Type: DEFAULT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.comments ALTER COLUMN c_id SET DEFAULT nextval('public.comments_c_id_seq'::regclass);


--
-- Name: groups g_id; Type: DEFAULT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.groups ALTER COLUMN g_id SET DEFAULT nextval('public.groups_g_id_seq'::regclass);


--
-- Name: post p_id; Type: DEFAULT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.post ALTER COLUMN p_id SET DEFAULT nextval('public.post_p_id_seq'::regclass);


--
-- Name: profile p_id; Type: DEFAULT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.profile ALTER COLUMN p_id SET DEFAULT nextval('public.profile_p_id_seq'::regclass);


--
-- Data for Name: app_user; Type: TABLE DATA; Schema: public; Owner: thomassanmartin
--

COPY public.app_user (u_id, u_name, u_birthdate) FROM stdin;
1	John Doe	1990-01-01
2	Jane Smith	1995-06-15
3	Alice Johnson	1988-09-23
4	Bob Brown	1985-03-05
5	Charlie Davis	1993-11-12
6	Diana Evans	1998-08-19
7	Eve Fisher	2000-02-28
8	Franklin Gates	1992-07-22
9	Grace Harris	1997-12-17
10	Henry Ivanov	1983-04-30
11	Samuel Jackson	1990-08-21
12	Sam Smith	1990-08-13
13	Dave Ricardo	1978-08-21
14	Thomas San Martin	1998-10-04
15	Jesslyn	2024-12-04
16	David Smith	2019-10-16
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: thomassanmartin
--

COPY public.comments (c_id, c_poster, c_date, p_content, post_id) FROM stdin;
9	10	2024-10-09 18:08:16.179779	This discussion is great!	\N
3	4	2024-10-09 18:08:16.179779	Can't wait to see the movie!	4
4	5	2024-10-09 18:08:16.179779	Thanks for the book recommendation!	5
5	6	2024-10-09 18:08:16.179779	That destination looks amazing!	6
10	1	2024-10-09 18:08:16.179779	Looking forward to the next post!	7
6	7	2024-10-09 18:08:16.179779	I just started a new workout routine!	8
7	8	2024-10-09 18:08:16.179779	I'm a huge foodie!	9
8	9	2024-10-09 18:08:16.179779	Thanks for the photography tips!	10
11	\N	2024-12-03 18:56:16.071518	Testing comment	6
12	\N	2024-12-03 19:31:05.693202	John should be commenting 	2
13	1	2024-12-03 19:59:17.638909	John should be commentor once again	2
14	1	2024-12-04 12:23:43.095179	John once again!	2
15	11	2024-12-04 12:44:28.34205	Samuel is commenting	8
16	11	2024-12-04 12:44:52.651074	Samuel is commenting on franks posts	8
17	9	2024-12-04 16:14:54.154481	I have high expectations for your game	7
18	3	2024-12-04 16:56:26.38876	I love football	3
19	5	2024-12-04 17:52:04.851068	Test	16
20	2	2024-12-04 17:52:39.262278	I'll say it again! Spaghetti!	19
21	1	2024-12-04 17:52:58.427609	Wow you really like spaghetti	19
22	2	2024-12-04 18:00:36.712237	What book? Lol	5
23	15	2024-12-04 18:04:24.154744	Yo, amazing game	7
24	3	2024-12-04 18:05:43.527685	I have to comment on my own post so its real	20
25	10	2024-12-04 18:10:56.441006	I didn't even give you a tip Grace!	10
26	16	2024-12-04 18:13:46.984268	Even though I said it, I'll say it again. Pets are the best!	14
27	18	2024-12-04 18:29:12.226389	Just kidding, I love C++	21
28	1	2024-12-04 18:41:39.734202	Wow what a nerd	21
29	20	2024-12-04 20:43:29.753229	Hi, this is David!	21
30	2	2024-12-04 20:52:45.771189	Coding really is great	21
\.


--
-- Data for Name: group_members; Type: TABLE DATA; Schema: public; Owner: thomassanmartin
--

COPY public.group_members (g_id, p_id, joined_date) FROM stdin;
2	2	2024-12-03 19:12:34.496592
3	3	2024-12-03 19:12:34.496592
4	4	2024-12-03 19:12:34.496592
5	5	2024-12-03 19:12:34.496592
6	6	2024-12-03 19:12:34.496592
7	7	2024-12-03 19:12:34.496592
8	8	2024-12-03 19:12:34.496592
9	9	2024-12-03 19:12:34.496592
10	10	2024-12-03 19:12:34.496592
1	1	2024-12-03 19:29:45.363165
1	2	2024-12-03 19:30:41.606006
2	1	2024-12-04 11:03:59.345825
5	1	2024-12-04 12:35:06.769414
5	2	2024-12-04 12:36:24.400026
8	11	2024-12-04 12:44:03.122993
10	3	2024-12-04 16:05:40.286642
7	9	2024-12-04 16:14:33.693824
9	17	2024-12-04 17:28:25.44107
2	8	2024-12-04 17:40:03.240812
8	5	2024-12-04 17:51:29.811434
7	15	2024-12-04 18:03:50.350547
1	18	2024-12-04 18:28:43.108284
6	19	2024-12-04 18:39:36.058795
7	4	2024-12-04 18:43:55.752346
1	20	2024-12-04 20:42:40.436771
4	20	2024-12-04 20:44:07.324626
\.


--
-- Data for Name: groups; Type: TABLE DATA; Schema: public; Owner: thomassanmartin
--

COPY public.groups (g_id, g_name, g_members, g_creator) FROM stdin;
2	Music Lovers	8	2
3	Sports Fans	15	3
4	Movie Buffs	12	4
5	Book Club	6	5
6	Travel Gurus	9	6
7	Gaming Addicts	13	7
8	Fitness Freaks	11	8
9	Foodies	7	9
10	Photography Fans	14	10
1	Tech Enthusiasts	12	1
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: thomassanmartin
--

COPY public.post (p_id, p_poster, p_text, p_content, p_date) FROM stdin;
1	1	Hello World	This is John's first post!	2024-10-09 18:08:10.870095
2	2	Music Enthusiast	I love listening to all kinds of music	2024-10-09 18:08:10.870095
3	3	Sports Talk	Let's talk about football!	2024-10-09 18:08:10.870095
4	4	Movie Night	What's your favorite movie?	2024-10-09 18:08:10.870095
5	5	Book Recommendation	I recommend reading this book	2024-10-09 18:08:10.870095
6	6	Travel Destinations	Where should I travel next?	2024-10-09 18:08:10.870095
7	7	Gaming Review	I just finished a new game!	2024-10-09 18:08:10.870095
8	8	Fitness Tips	Here are my fitness tips	2024-10-09 18:08:10.870095
9	9	Food Lover	What's your favorite dish?	2024-10-09 18:08:10.870095
10	10	Photography Tips	Best camera for beginners?	2024-10-09 18:08:10.870095
11	1	John Profile Page Test Post	Testing..	2024-12-04 10:18:59.27272
12	1	John should still be posting	Testing..	2024-12-04 10:20:45.415361
13	1	Test John	Testing	2024-12-04 10:27:30.319866
14	16	Pets	Pets are the best!	2024-12-04 10:37:04.725115
15	3	I'm hungry	Hungry for tacos	2024-12-04 12:24:06.003816
16	5	My first post	What a great day to code	2024-12-04 12:40:02.718429
17	10	Time to eat	Subway or chipotle? Idk	2024-12-04 12:45:29.737926
18	17	Tacos RULE	We eat tacos 24/7	2024-12-04 17:28:53.639669
19	2	Favorite Food	Spaghetti	2024-12-04 17:42:38.981706
20	3	Star Wars is the best	Everybody knows this	2024-12-04 18:05:20.597402
21	18	I love coding	Unless its C++	2024-12-04 18:28:54.376757
22	19	OMG joined first group!	Sooo sick.	2024-12-04 18:39:52.54521
23	20	Yay First Post	Such a great day	2024-12-04 20:42:18.11124
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: thomassanmartin
--

COPY public.profile (p_id, p_datemade, p_name, p_email, p_username, p_password, u_id) FROM stdin;
1	2024-10-09	John Profile	john@example.com	john_doe	password123	1
2	2024-10-09	Jane Profile	jane@example.com	jane_smith	password456	2
3	2024-10-09	Alice Profile	alice@example.com	alice_j	alicepwd	3
4	2024-10-09	Bob Profile	bob@example.com	bobb	bobpwd	4
5	2024-10-09	Charlie Profile	charlie@example.com	charlie_d	chpwd	5
6	2024-10-09	Diana Profile	diana@example.com	diana_e	dpwd	6
7	2024-10-09	Eve Profile	eve@example.com	eve_f	evpwd	7
8	2024-10-09	Frank Profile	frank@example.com	frank_g	fgpwd	8
9	2024-10-09	Grace Profile	grace@example.com	grace_h	ghpwd	9
10	2024-10-09	Henry Profile	henry@example.com	henry_i	hipwd	10
11	2024-10-09	Samuel Profile	samuel@example.com	samuel_j	sampwd	11
13	2024-10-20	Dave Profile	dave@example.com	dave_j	davepwd	12
14	2024-11-26	John Extra Profile	john.extra@example.com	john_extra	extrapwd	1
15	2024-11-26	Jane Smith Extra	janesmith@asu.edu	jsmith1	123	2
16	2024-12-04	Ricardo Pet Supplies	rpetsupplies@gmail.com	r_petsupplies	123	13
17	2024-12-04	Taco Spot	tacospot@gmail.com	tacospot	123	3
18	2024-12-04	Thomas	thomas@gmail.com	tsanmart	123	14
19	2024-12-04	Jess	j@gmail.com	jess	123	15
20	2024-12-04	David	dsmith@gmail.com	David1	123	16
\.


--
-- Name: app_user_u_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomassanmartin
--

SELECT pg_catalog.setval('public.app_user_u_id_seq', 16, true);


--
-- Name: comments_c_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomassanmartin
--

SELECT pg_catalog.setval('public.comments_c_id_seq', 30, true);


--
-- Name: groups_g_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomassanmartin
--

SELECT pg_catalog.setval('public.groups_g_id_seq', 10, true);


--
-- Name: post_p_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomassanmartin
--

SELECT pg_catalog.setval('public.post_p_id_seq', 23, true);


--
-- Name: profile_p_id_seq; Type: SEQUENCE SET; Schema: public; Owner: thomassanmartin
--

SELECT pg_catalog.setval('public.profile_p_id_seq', 20, true);


--
-- Name: app_user app_user_pkey; Type: CONSTRAINT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.app_user
    ADD CONSTRAINT app_user_pkey PRIMARY KEY (u_id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (c_id);


--
-- Name: group_members group_members_pkey; Type: CONSTRAINT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_pkey PRIMARY KEY (g_id, p_id);


--
-- Name: groups groups_pkey; Type: CONSTRAINT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (g_id);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (p_id);


--
-- Name: profile profile_p_username_key; Type: CONSTRAINT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_p_username_key UNIQUE (p_username);


--
-- Name: profile profile_pkey; Type: CONSTRAINT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_pkey PRIMARY KEY (p_id);


--
-- Name: comments comments_c_poster_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_c_poster_fkey FOREIGN KEY (c_poster) REFERENCES public.profile(p_id);


--
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.post(p_id);


--
-- Name: group_members group_members_g_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_g_id_fkey FOREIGN KEY (g_id) REFERENCES public.groups(g_id) ON DELETE CASCADE;


--
-- Name: group_members group_members_p_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_p_id_fkey FOREIGN KEY (p_id) REFERENCES public.profile(p_id) ON DELETE CASCADE;


--
-- Name: groups groups_g_creator_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_g_creator_fkey FOREIGN KEY (g_creator) REFERENCES public.profile(p_id);


--
-- Name: post post_p_poster_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_p_poster_fkey FOREIGN KEY (p_poster) REFERENCES public.profile(p_id);


--
-- Name: profile profile_u_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: thomassanmartin
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT profile_u_id_fkey FOREIGN KEY (u_id) REFERENCES public.app_user(u_id);


--
-- PostgreSQL database dump complete
--

