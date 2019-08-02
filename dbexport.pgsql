--
-- PostgreSQL database dump
--

-- Dumped from database version 11.4
-- Dumped by pg_dump version 11.4

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

SET default_with_oids = false;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: shirleytan
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text
);


ALTER TABLE public.categories OWNER TO shirleytan;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: shirleytan
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO shirleytan;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shirleytan
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: channel_categories; Type: TABLE; Schema: public; Owner: shirleytan
--

CREATE TABLE public.channel_categories (
    id integer NOT NULL,
    channel_id integer,
    category_id integer
);


ALTER TABLE public.channel_categories OWNER TO shirleytan;

--
-- Name: channel_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: shirleytan
--

CREATE SEQUENCE public.channel_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.channel_categories_id_seq OWNER TO shirleytan;

--
-- Name: channel_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shirleytan
--

ALTER SEQUENCE public.channel_categories_id_seq OWNED BY public.channel_categories.id;


--
-- Name: channels; Type: TABLE; Schema: public; Owner: shirleytan
--

CREATE TABLE public.channels (
    id integer NOT NULL,
    name character varying(32),
    youtube_id character varying(32),
    thumbnail_url text,
    link text
);


ALTER TABLE public.channels OWNER TO shirleytan;

--
-- Name: channels_id_seq; Type: SEQUENCE; Schema: public; Owner: shirleytan
--

CREATE SEQUENCE public.channels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.channels_id_seq OWNER TO shirleytan;

--
-- Name: channels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shirleytan
--

ALTER SEQUENCE public.channels_id_seq OWNED BY public.channels.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: shirleytan
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    content text,
    date_created timestamp without time zone DEFAULT now(),
    date_edited timestamp without time zone DEFAULT now(),
    user_id integer,
    channel_id integer
);


ALTER TABLE public.reviews OWNER TO shirleytan;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: shirleytan
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO shirleytan;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shirleytan
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: shirleytan
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(32),
    password text
);


ALTER TABLE public.users OWNER TO shirleytan;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: shirleytan
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO shirleytan;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: shirleytan
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: shirleytan
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: channel_categories id; Type: DEFAULT; Schema: public; Owner: shirleytan
--

ALTER TABLE ONLY public.channel_categories ALTER COLUMN id SET DEFAULT nextval('public.channel_categories_id_seq'::regclass);


--
-- Name: channels id; Type: DEFAULT; Schema: public; Owner: shirleytan
--

ALTER TABLE ONLY public.channels ALTER COLUMN id SET DEFAULT nextval('public.channels_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: shirleytan
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: shirleytan
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: shirleytan
--

COPY public.categories (id, name) FROM stdin;
14	Film
16	Lifestyle_(sociology)
15	Entertainment
17	Music
18	Food
19	Television_program
20	Health
21	Role-playing_video_game
22	Video_game_culture
23	Society
\.


--
-- Data for Name: channel_categories; Type: TABLE DATA; Schema: public; Owner: shirleytan
--

COPY public.channel_categories (id, channel_id, category_id) FROM stdin;
25	18	14
26	18	16
27	18	15
28	19	17
29	20	15
30	20	16
31	20	18
32	20	19
33	21	15
34	21	16
35	22	15
36	22	14
37	23	16
38	23	18
39	23	15
40	23	20
41	24	16
42	24	19
43	24	18
44	24	15
45	25	21
46	25	17
47	25	15
48	25	22
49	26	16
50	26	15
51	26	14
52	27	17
53	28	15
54	28	16
55	28	23
\.


--
-- Data for Name: channels; Type: TABLE DATA; Schema: public; Owner: shirleytan
--

COPY public.channels (id, name, youtube_id, thumbnail_url, link) FROM stdin;
18	TheOdd1sOut	UCo8bcnLyZH8tBIH9V1mLgqQ	https://yt3.ggpht.com/a/AGF-l78sEvF98PZ5X4jYVGmBcdmv_fwNi73akc9rAg=s240-c-k-c0xffffffff-no-rj-mo	https://www.youtube.com/c/theodd1soutcomic
19	Rush Garcia	UCm2GrZjyqP5pF-wTa95r_AA	https://yt3.ggpht.com/a/AGF-l7_KawgmFARMTGgA9s2Lsf9H-0-9j9UkwcVM8w=s240-c-k-c0xffffffff-no-rj-mo	https://www.youtube.com/c/ToaRush1325
20	Ryan Sylvia	UC8az0OO4wXXu2k0ifJjxxBg	https://yt3.ggpht.com/a/AGF-l79gYDlPUO90jhabs4v_sHXLqK_U_wmlExaYOA=s240-c-k-c0xffffffff-no-rj-mo	https://www.youtube.com/c/Alozerk
21	TheSmartLocal	UCdfhBqMbNjuMNkMNxLrehWA	https://yt3.ggpht.com/a/AGF-l79o4HgjrdBwpjkEoUg8RbzFI_orKtkilxl7Lw=s240-c-k-c0xffffffff-no-rj-mo	https://www.youtube.com/c/TheSmartLocal
22	Domics	UCn1XB-jvmd9fXMzhiA6IR0w	https://yt3.ggpht.com/a/AGF-l7-HEi7AOIwV16OQb-Xk2m7JYlAL4vLziPPjqw=s240-c-k-c0xffffffff-no-rj-mo	https://www.youtube.com/c/D0MICS
23	Mark Rober	UCY1kMZp36IQSyNx_9h4mpCg	https://yt3.ggpht.com/a/AGF-l78UJeLKYQm13M-67Np8jvoI7g1aNpkAJxc5iA=s240-c-k-c0xffffffff-no-rj-mo	https://www.youtube.com/c/onemeeeliondollars
24	Good Mythical Morning	UC4PooiX37Pld1T8J5SYT-SQ	https://yt3.ggpht.com/a/AGF-l782T3dHUkrxs8-sPYLch5oQ3gXvfhwkI4JCHg=s240-c-k-c0xffffffff-no-rj-mo	https://www.youtube.com/c/rhettandlink2
25	Jaryl Chng	UCZN74rwxndmtrmM8TJbB9-g	https://yt3.ggpht.com/a/AGF-l7_cJNSWK9EpRaxbe-PJ60OxrgVc2vLI2RNnig=s240-c-k-c0xffffffff-no-rj-mo	https://www.youtube.com/c/jarylchng
26	Kurzgesagt – In a Nutshell	UCsXVk37bltHxD1rDPwtNM8Q	https://yt3.ggpht.com/a/AGF-l79_o6QngIpSSvxjU7AnZu86z3_7OzCy-wn2Bw=s240-c-k-c0xffffffff-no-rj-mo	https://www.youtube.com/c/inanutshell
27	HDSounDI	UC26zQlW7dTNcyp9zKHVmv4Q	https://yt3.ggpht.com/a/AGF-l7-qNkVfyrnQY55qpX7HLtSqpSZ_4gCZ6xbIbA=s240-c-k-c0xffffffff-no-rj-mo	https://www.youtube.com/c/MarK1Ira
28	The Straits Times	UC4p_I9eiRewn2KoU-nawrDg	https://yt3.ggpht.com/a/AGF-l79q2t5ai2ioydKLwnv58IDvbiDKdKzdQ1M8Wg=s240-c-k-c0xffffffff-no-rj-mo	https://www.youtube.com/c/StraitsTimesOnline
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: shirleytan
--

COPY public.reviews (id, content, date_created, date_edited, user_id, channel_id) FROM stdin;
3	Funney content	2019-08-01 22:12:42.088285	2019-08-01 22:12:42.088285	3	18
4	Great orchestra music!	2019-08-01 22:15:33.987936	2019-08-01 22:15:33.987936	3	19
5	Funny singaporean videos	2019-08-01 22:30:16.206669	2019-08-01 22:30:16.206669	3	20
6	Exaggerating but funny	2019-08-01 22:32:10.135739	2019-08-01 22:32:10.135739	3	21
7	hi	2019-08-01 22:34:56.533158	2019-08-01 22:34:56.533158	11	21
8	Fun and relatable videos!	2019-08-01 22:48:53.768867	2019-08-01 22:48:53.768867	11	22
9	Cool videos	2019-08-01 22:49:54.195386	2019-08-01 22:49:54.195386	11	23
10	Interesting daily podcasts.	2019-08-02 00:49:11.997342	2019-08-02 00:49:11.997342	12	24
11	INTERESTING CONTENT!	2019-08-02 00:51:15.795279	2019-08-02 00:51:15.795279	12	25
12	Science in a nutshell	2019-08-02 00:52:55.007502	2019-08-02 00:52:55.007502	12	26
13	Music when you need them!	2019-08-02 00:56:06.798497	2019-08-02 00:56:06.798497	12	27
14	Great news	2019-08-02 11:07:27.32519	2019-08-02 11:07:27.32519	3	28
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: shirleytan
--

COPY public.users (id, username, password) FROM stdin;
1	Pineapple	applepen
2	Banana	monkeys
3	Shirley	0a4d364d90e49d22b91fec1c8985255497eeb2de324a11373d8aeb0025bcad4d
5	test	5486c19f415ba18ced4df61c03024c74bde814ae58538a387df3d39e58f80ced
10	testtest	e5b4160e038a37466a1d7057d738774d1f6da2c11c06495592f728fa839a67bb
11	pen	4d3b6ceecee6e6c7448f743cf60fcb9edb15006fa924da25d78c7ffe04e5e6f6
12	Jelly	de6488c24b3edf832bd12e333bb651ee6125cf3d307606ec51cbc646ac3f19cd
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shirleytan
--

SELECT pg_catalog.setval('public.categories_id_seq', 23, true);


--
-- Name: channel_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shirleytan
--

SELECT pg_catalog.setval('public.channel_categories_id_seq', 55, true);


--
-- Name: channels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shirleytan
--

SELECT pg_catalog.setval('public.channels_id_seq', 28, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shirleytan
--

SELECT pg_catalog.setval('public.reviews_id_seq', 14, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: shirleytan
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: shirleytan
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: channel_categories channel_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: shirleytan
--

ALTER TABLE ONLY public.channel_categories
    ADD CONSTRAINT channel_categories_pkey PRIMARY KEY (id);


--
-- Name: channels channels_pkey; Type: CONSTRAINT; Schema: public; Owner: shirleytan
--

ALTER TABLE ONLY public.channels
    ADD CONSTRAINT channels_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: shirleytan
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: shirleytan
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: channel_categories channel_categories_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shirleytan
--

ALTER TABLE ONLY public.channel_categories
    ADD CONSTRAINT channel_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: channel_categories channel_categories_channel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shirleytan
--

ALTER TABLE ONLY public.channel_categories
    ADD CONSTRAINT channel_categories_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.channels(id);


--
-- Name: reviews reviews_channel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shirleytan
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_channel_id_fkey FOREIGN KEY (channel_id) REFERENCES public.channels(id);


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: shirleytan
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

